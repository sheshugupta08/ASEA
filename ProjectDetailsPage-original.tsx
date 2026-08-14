import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, Bug, CheckCircle2, Clock3, FileCode2, Folder, Loader2,
  Pencil, Plus, Save, ScrollText, Server, TestTube2, Trash2, X, XCircle,
} from 'lucide-react';
import {
  createProjectFile, deleteProjectFile, generateProject, getProject,
  getProjectBugs, getProjectFiles, ProjectBug, ProjectFile,
  ProjectTestResponse, runProjectDiagnostics, runProjectTests,
  updateProjectFile,
} from '../api/backend';
import { PageType, Project } from '../types';

interface ProjectDetailsPageProps {
  projectId: string;
  onNavigate: (page: PageType) => void;
}

type DetailsTab = 'overview' | 'files' | 'tests' | 'bugs' | 'logs';

const tabs = [
  ['overview', 'Overview', Server], ['files', 'Files', FileCode2],
  ['tests', 'Tests', TestTube2], ['bugs', 'Bugs', Bug],
  ['logs', 'Logs', ScrollText],
] as const;

export const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  projectId,
  onNavigate,
}) => {
  const [project, setProject] = useState<Project | null>(null);
  const [files, setFiles] = useState<ProjectFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<ProjectFile | null>(null);
  const [bugs, setBugs] = useState<ProjectBug[]>([]);
  const [testResult, setTestResult] = useState<ProjectTestResponse | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [testError, setTestError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<ProjectTestResponse | null>(null);
  const [diagnosticsHasRun, setDiagnosticsHasRun] = useState(false);
  const [activeTab, setActiveTab] = useState<DetailsTab>('overview');
  const [loading, setLoading] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);
  const [isRunningDiagnostics, setIsRunningDiagnostics] = useState(false);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [diagnosticsError, setDiagnosticsError] = useState<string | null>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [path, setPath] = useState('');
  const [language, setLanguage] = useState('python');
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const loadFiles = async () => {
    try {
      setFilesLoading(true); setFileError(null);
      const result = await getProjectFiles(projectId);
      setFiles(result);
      setSelectedFile((current) => current
        ? result.find((file) => file.id === current.id) || result[0] || null
        : result[0] || null);
    } catch (e) {
      setFileError(e instanceof Error ? e.message : 'Failed to load files.');
    } finally { setFilesLoading(false); }
  };

  useEffect(() => {
    let mounted = true;
    Promise.all([getProject(projectId), getProjectBugs(projectId)])
      .then(([loadedProject, loadedBugs]) => {
        if (!mounted) return;
        setProject({ ...loadedProject, openIssuesCount: loadedBugs.length });
        setBugs(loadedBugs); setDiagnosticsHasRun(true);
      })
      .catch((e) => mounted && setError(e instanceof Error ? e.message : 'Failed to load project.'))
      .finally(() => mounted && setLoading(false));
    loadFiles();
    return () => { mounted = false; };
  }, [projectId]);

  const handleRunDiagnostics = async () => {
    try {
      setIsRunningDiagnostics(true); setDiagnosticsError(null);
      const result = await runProjectDiagnostics(projectId);
      setBugs(result); setDiagnosticsHasRun(true);
      setProject((current) => current ? { ...current, openIssuesCount: result.length } : current);
      setActiveTab('bugs');
    } catch (e) {
      setDiagnosticsError(e instanceof Error ? e.message : 'Diagnostics failed.');
    } finally { setIsRunningDiagnostics(false); }
  };

  const handleRunTests = async () => {
    try {
      setIsRunningTests(true); setTestError(null);
      const result = await runProjectTests(projectId);
      setTestResult(result); setActiveTab('tests');
    } catch (e) {
      setTestError(e instanceof Error ? e.message : 'Tests failed.');
    } finally { setIsRunningTests(false); }
  };

  const handleGenerateProject = async () => {
    try {
      setIsGenerating(true); setGenerationError(null);
      await generateProject(projectId);
      setProject(await getProject(projectId));
      await loadFiles(); setActiveTab('files');
    } catch (e) {
      setGenerationError(e instanceof Error ? e.message : 'Project generation failed.');
    } finally { setIsGenerating(false); }
  };

  const openCreateForm = () => {
    setFileError(null); setEditing(false); setPath(''); setLanguage('python');
    setContent(''); setShowCreateForm(true);
  };

  const openEditForm = () => {
    if (!selectedFile) return;
    setFileError(null); setEditing(true); setShowCreateForm(true);
    setPath(selectedFile.path); setLanguage(selectedFile.language || '');
    setContent(selectedFile.content);
  };

  const closeFileForm = () => { setShowCreateForm(false); setEditing(false); setFileError(null); };

  const saveFile = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!path.trim()) return setFileError('File path is required.');
    if (!content.trim()) return setFileError('File content is required.');
    try {
      setSaving(true); setFileError(null);
      if (editing && selectedFile) await updateProjectFile(projectId, selectedFile.id, { path: path.trim(), content, language: language.trim() });
      else await createProjectFile(projectId, path.trim(), content, language.trim());
      closeFileForm(); await loadFiles();
    } catch (e) { setFileError(e instanceof Error ? e.message : 'Failed to save file.'); }
    finally { setSaving(false); }
  };

  const deleteFile = async () => {
    if (!selectedFile || !window.confirm(`Delete ${selectedFile.path}?`)) return;
    try { setFileError(null); await deleteProjectFile(projectId, selectedFile.id); setSelectedFile(null); await loadFiles(); }
    catch (e) { setFileError(e instanceof Error ? e.message : 'Failed to delete file.'); }
  };

  const statusIcon = () => {
    if (project?.status === 'failed') return <XCircle className="w-4 h-4 text-red-400" />;
    if (['active', 'building', 'completed'].includes(project?.status || '')) return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    return <Clock3 className="w-4 h-4 text-yellow-400" />;
  };

  const renderFiles = () => <div className="space-y-4">
    <div className="border border-white/10 bg-[#050505]">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div><h2 className="text-xs font-mono uppercase text-white font-bold">Project Files</h2><p className="text-[11px] font-mono text-zinc-500 mt-1">{files.length} file{files.length === 1 ? '' : 's'}</p></div>
        <button type="button" onClick={openCreateForm} className="flex items-center gap-2 bg-white text-black px-3 py-2 text-[10px] font-bold font-mono uppercase"><Plus className="w-3.5 h-3.5" />New File</button>
      </div>
      {showCreateForm && <form onSubmit={saveFile} className="p-5 border-b border-white/10 bg-black space-y-3">
        <div className="flex justify-between"><h3 className="text-xs font-mono uppercase text-white">{editing ? 'Edit File' : 'Create File'}</h3><button type="button" onClick={closeFileForm}><X className="w-4 h-4" /></button></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><input value={path} onChange={(e) => setPath(e.target.value)} placeholder="src/utils.py" className="bg-[#050505] border border-white/10 p-2 text-xs font-mono text-white" /><input value={language} onChange={(e) => setLanguage(e.target.value)} placeholder="python" className="bg-[#050505] border border-white/10 p-2 text-xs font-mono text-white" /></div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} placeholder="File content..." className="w-full bg-[#050505] border border-white/10 p-3 text-xs font-mono text-white resize-y" />
        {fileError && <div className="text-xs font-mono text-red-400">{fileError}</div>}
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-white text-black px-4 py-2 text-xs font-bold font-mono uppercase disabled:opacity-50">{editing ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}{saving ? 'Saving...' : editing ? 'Save Changes' : 'Create File'}</button>
      </form>}
      {filesLoading && <div className="p-6 text-xs font-mono text-zinc-400 flex gap-2 items-center"><Loader2 className="w-4 h-4 animate-spin" />Loading files...</div>}
      {!filesLoading && files.map((file) => <button key={file.id} type="button" onClick={() => setSelectedFile(file)} className={`w-full flex items-center gap-3 p-4 border-b border-white/5 text-left text-xs font-mono ${selectedFile?.id === file.id ? 'bg-white text-black' : 'text-zinc-300 hover:bg-white/5'}`}>{file.path.includes('/') ? <Folder className="w-4 h-4 text-yellow-400" /> : <FileCode2 className="w-4 h-4" />}<span>{file.path}</span><span className="ml-auto text-[10px] uppercase opacity-60">{file.language || 'text'}</span></button>)}
    </div>
    {fileError && !showCreateForm && <div className="text-xs font-mono text-red-400">{fileError}</div>}
    {selectedFile && <div className="border border-white/10 bg-[#050505]"><div className="p-4 border-b border-white/10 flex justify-between items-center"><span className="text-xs font-mono text-white">{selectedFile.path}</span><div className="flex gap-2"><button type="button" onClick={openEditForm} className="flex items-center gap-1 bg-white text-black px-3 py-1.5 text-[10px] font-bold font-mono uppercase"><Pencil className="w-3 h-3" />Edit</button><button type="button" onClick={deleteFile} className="flex items-center gap-1 border border-red-500/30 text-red-400 px-3 py-1.5 text-[10px] font-bold font-mono uppercase"><Trash2 className="w-3 h-3" />Delete</button></div></div><pre className="p-5 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed font-mono text-zinc-300">{selectedFile.content || '// Empty file'}</pre></div>}
  </div>;

  const renderTests = () => <div className="border border-white/10 bg-[#050505] p-6"><div className="flex items-center justify-between mb-5"><div><div className="flex items-center gap-2 text-white"><TestTube2 className="w-5 h-5 text-emerald-400" /><h2 className="text-xs font-mono uppercase font-bold">Project Tests</h2></div><p className="text-[11px] font-mono text-zinc-500 mt-2">Run the generated project test suite.</p></div><button type="button" onClick={handleRunTests} disabled={isRunningTests} className="flex items-center gap-2 bg-white text-black px-3 py-2 text-[10px] font-bold font-mono uppercase disabled:opacity-50">{isRunningTests ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <TestTube2 className="w-3.5 h-3.5" />}{isRunningTests ? 'Running...' : 'Run Tests'}</button></div>{testError && <div className="text-xs font-mono text-red-400 mb-4">{testError}</div>}{!testError && !testResult && <div className="text-sm font-mono text-zinc-400">No test results are available yet.</div>}{testResult && <div className="space-y-5"><div className={testResult.status === 'passed' ? 'text-sm font-mono text-emerald-400' : 'text-sm font-mono text-red-400'}>Test status: {testResult.status}</div><div className="grid grid-cols-3 gap-3 text-xs font-mono"><div className="border border-white/10 p-4"><div className="text-zinc-500 uppercase">Passed</div><div className="text-emerald-400 text-2xl mt-2">{testResult.passed}</div></div><div className="border border-white/10 p-4"><div className="text-zinc-500 uppercase">Failed</div><div className="text-red-400 text-2xl mt-2">{testResult.failed}</div></div><div className="border border-white/10 p-4"><div className="text-zinc-500 uppercase">Skipped</div><div className="text-yellow-400 text-2xl mt-2">{testResult.skipped}</div></div></div><pre className="border border-white/10 bg-black p-4 overflow-x-auto whitespace-pre-wrap text-xs leading-relaxed font-mono text-zinc-300">{testResult.output}</pre></div>}</div>;

  if (loading) return <div className="p-12 text-xs font-mono text-zinc-400">Loading project...</div>;
  if (error || !project) return <div className="space-y-5"><button type="button" onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 text-xs font-mono text-zinc-400"><ArrowLeft className="w-4 h-4" />Back to Dashboard</button><div className="text-xs font-mono text-red-400">{error || 'Project not found.'}</div></div>;

  return <div className="max-w-5xl mx-auto space-y-7 pb-16"><button type="button" onClick={() => onNavigate('dashboard')} className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white"><ArrowLeft className="w-4 h-4" />Back to Dashboard</button><header className="border-b border-white/10 pb-6"><div className="flex justify-between gap-5"><div><span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Project Details</span><h1 className="text-3xl font-light text-white mt-3">{project.name}</h1><p className="text-sm text-zinc-400 mt-2">{project.description}</p></div><div className="flex flex-col items-end gap-3 h-fit"><div className="flex items-center gap-2 border border-white/10 px-3 py-2 text-xs font-mono uppercase text-white">{statusIcon()}{project.status === 'completed' ? 'Completed' : project.status}</div><div className="flex flex-wrap justify-end gap-2"><button type="button" onClick={handleGenerateProject} disabled={isGenerating} className="flex items-center gap-2 border border-white/20 text-white px-3 py-2 text-[10px] font-bold font-mono uppercase disabled:opacity-50">{isGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}{isGenerating ? 'Generating...' : 'Generate Project'}</button><button type="button" onClick={handleRunDiagnostics} disabled={isRunningDiagnostics} className="flex items-center gap-2 bg-white text-black px-3 py-2 text-[10px] font-bold font-mono uppercase disabled:opacity-50">{isRunningDiagnostics ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bug className="w-3.5 h-3.5" />}{isRunningDiagnostics ? 'Scanning...' : 'Run Diagnostics'}</button></div></div></div>{generationError && <div className="mt-4 text-xs font-mono text-red-400">{generationError}</div>}</header><nav className="flex flex-wrap gap-1 border-b border-white/10">{tabs.map(([id, label, Icon]) => <button key={id} type="button" onClick={() => setActiveTab(id as DetailsTab)} className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase ${activeTab === id ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}><Icon className="w-3.5 h-3.5" />{label}</button>)}</nav>{activeTab === 'overview' && <div className="border border-white/10 bg-[#050505] p-6 text-sm text-zinc-400"><div className="flex items-center gap-2 text-white mb-4"><Server className="w-4 h-4" />Project Overview</div><p>{project.description}</p><div className="mt-5 grid grid-cols-2 gap-4 text-xs font-mono"><span>Status: {project.status === 'completed' ? 'Completed' : project.status}</span><span>Version: {project.version}</span><span>Coverage: {project.testCoverage}%</span><span>Issues: {project.openIssuesCount}</span></div></div>}{activeTab === 'files' && renderFiles()}{activeTab === 'tests' && renderTests()}{activeTab === 'bugs' && <div className="border border-white/10 bg-[#050505] p-6 text-xs font-mono text-zinc-400">{diagnosticsError && <div className="text-red-400">{diagnosticsError}</div>}{!diagnosticsError && diagnosticsHasRun && bugs.length === 0 && <div className="text-emerald-400">No issues detected.</div>}{!diagnosticsHasRun && bugs.length === 0 && <div>No diagnostics have been run yet.</div>}{bugs.map((bug) => <div key={bug.id} className="p-4 border-b border-white/5"><div className="text-red-400">{bug.title}</div><div className="mt-2">{bug.message}</div><div className="mt-2 text-zinc-500">{bug.file_path}:{bug.line}</div></div>)}</div>}{activeTab === 'logs' && <div className="border border-white/10 bg-[#050505] p-6 text-xs font-mono text-zinc-400"><ScrollText className="w-5 h-5 text-blue-400 mb-3" />Project logs are ready for agent execution.</div>}</div>;
};