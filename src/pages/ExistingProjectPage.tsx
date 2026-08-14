import React, { useState } from 'react';
import { PageType, Project } from '../types';
import { 
  FolderGit2, 
  Github, 
  UploadCloud, 
  Terminal, 
  CheckCircle2, 
  Search, 
  Bug, 
  ShieldAlert, 
  Zap, 
  ArrowRight, 
  Sparkles, 
  HardDrive
} from 'lucide-react';

interface ExistingProjectPageProps {
  onNavigate: (page: PageType) => void;
  onAddImportedProject: (proj: Project) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const ExistingProjectPage: React.FC<ExistingProjectPageProps> = ({
  onNavigate,
  onAddImportedProject,
  onAddToast,
}) => {
  const [importMode, setImportMode] = useState<'github' | 'zip' | 'localhost'>('github');

  // Form states
  const [githubUrl, setGithubUrl] = useState('https://github.com/enterprise/nexus-core-service');
  const [branchName, setBranchName] = useState('main');
  const [zipFileName, setZipFileName] = useState<string | null>(null);
  const [localhostPath, setLocalhostPath] = useState('/Users/developer/projects/nexus-core-service');

  // Options
  const [runBugScan, setRunBugScan] = useState(true);
  const [generateTests, setGenerateTests] = useState(true);
  const [securityAudit, setSecurityAudit] = useState(true);

  const [isScanning, setIsScanning] = useState(false);

  const handleStartAnalysis = () => {
    let sourceName = 'Imported Project';
    if (importMode === 'github') {
      const parts = githubUrl.split('/');
      sourceName = parts[parts.length - 1] || 'github-repo';
    } else if (importMode === 'zip') {
      sourceName = zipFileName ? zipFileName.replace('.zip', '') : 'zip-codebase';
    } else {
      const parts = localhostPath.split('/');
      sourceName = parts[parts.length - 1] || 'local-repo';
    }

    setIsScanning(true);
    onAddToast('Repo Pre-Scan Started', 'Parsing AST structure and dependencies...', 'info');

    setTimeout(() => {
      setIsScanning(false);
      const newProj: Project = {
        id: `proj-imported-${Date.now()}`,
        name: sourceName,
        description: `Imported codebase from ${importMode.toUpperCase()} source. AST bug diagnostics attached.`,
        type: 'imported',
        source: importMode,
        sourceUrl: importMode === 'github' ? githubUrl : localhostPath,
        techStack: ['Python', 'TypeScript', 'FastAPI', 'PyTest'],
        status: 'active',
        buildStatus: 'failing',
        testCoverage: 78,
        openIssuesCount: 2,
        lastCommitTime: 'Just now',
        lastCommitMessage: 'Imported by ASEA for automated bug repair.',
        environment: 'development',
        version: 'v1.0.0',
        uptime: '0m',
      };

      onAddImportedProject(newProj);
      onAddToast('Codebase Analyzed!', 'Found 2 bugs and 1 memory leak candidate.', 'warning');
      onNavigate('project-details');
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-2">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-semibold">Existing Project Mode</h2>
        <h1 className="text-3xl font-light text-white tracking-tight">Import & Analyze <span className="italic font-serif">Codebase</span></h1>
        <p className="text-xs text-zinc-400">
          Connect your repository to detect AST bugs, unhandled async exceptions, memory leaks, and generate PyTest / Vitest suites.
        </p>
      </div>

      {/* Main Tabs Selector */}
      <div className="flex border-b border-white/10 space-x-2">
        {[
          { id: 'github', label: 'GitHub Repository', icon: Github },
          { id: 'zip', label: 'ZIP File Upload', icon: UploadCloud },
          { id: 'localhost', label: 'Localhost Path', icon: Terminal },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = importMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setImportMode(tab.id as any)}
              className={`px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
                isActive
                  ? 'border-white text-white font-bold bg-white/5'
                  : 'border-transparent text-zinc-500 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="bg-[#050505] p-6 border border-white/10 space-y-6">
        {importMode === 'github' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">GitHub Repository URL</label>
              <div className="relative">
                <Github className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/organization/repository"
                  className="w-full pl-9 pr-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Branch Name</label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none"
                  placeholder="main"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1.5">Access Scope</label>
                <span className="w-full px-3 py-2 bg-black border border-white/10 text-xs font-mono block text-emerald-400">
                  Public / OAuth Authorized
                </span>
              </div>
            </div>
          </div>
        )}

        {importMode === 'zip' && (
          <div className="space-y-4">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  setZipFileName(e.dataTransfer.files[0].name);
                  onAddToast('ZIP Attached', `Attached ${e.dataTransfer.files[0].name}`, 'success');
                }
              }}
              className="border-2 border-dashed border-white/15 p-8 text-center bg-black hover:border-white transition-colors cursor-pointer group"
            >
              <UploadCloud className="w-10 h-10 text-white mx-auto mb-3" />
              <p className="text-xs font-mono text-white mb-1">
                {zipFileName ? `Attached: ${zipFileName}` : 'Drag & drop .zip archive file here'}
              </p>
              <p className="text-[11px] font-mono text-zinc-500">Max file size: 250MB. Includes package.json / requirements.txt</p>
              <label className="mt-4 inline-block px-4 py-2 bg-zinc-900 border border-white/20 text-xs font-mono text-white hover:bg-zinc-800 transition-colors cursor-pointer uppercase font-semibold">
                <span>Browse Local Files</span>
                <input
                  type="file"
                  accept=".zip"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setZipFileName(e.target.files[0].name);
                      onAddToast('ZIP File Attached', e.target.files[0].name, 'success');
                    }
                  }}
                />
              </label>
            </div>
          </div>
        )}

        {importMode === 'localhost' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Absolute Local Directory Path</label>
              <div className="relative">
                <HardDrive className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={localhostPath}
                  onChange={(e) => setLocalhostPath(e.target.value)}
                  placeholder="/Users/username/workspace/project-folder"
                  className="w-full pl-9 pr-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Scan Scope Toggles */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold tracking-wider">Analysis Scope & Actions</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setRunBugScan(!runBugScan)}
              className={`p-3 border text-xs font-mono text-left flex items-center justify-between ${
                runBugScan ? 'bg-white text-black font-bold border-white' : 'bg-black border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Bug className="w-4 h-4" />
                <span>AST Bug Scan</span>
              </div>
              <CheckCircle2 className={`w-3.5 h-3.5 ${runBugScan ? 'text-black' : 'opacity-20'}`} />
            </button>

            <button
              type="button"
              onClick={() => setGenerateTests(!generateTests)}
              className={`p-3 border text-xs font-mono text-left flex items-center justify-between ${
                generateTests ? 'bg-white text-black font-bold border-white' : 'bg-black border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Test Synthesis</span>
              </div>
              <CheckCircle2 className={`w-3.5 h-3.5 ${generateTests ? 'text-black' : 'opacity-20'}`} />
            </button>

            <button
              type="button"
              onClick={() => setSecurityAudit(!securityAudit)}
              className={`p-3 border text-xs font-mono text-left flex items-center justify-between ${
                securityAudit ? 'bg-white text-black font-bold border-white' : 'bg-black border-white/10 text-zinc-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" />
                <span>Security Audit</span>
              </div>
              <CheckCircle2 className={`w-3.5 h-3.5 ${securityAudit ? 'text-black' : 'opacity-20'}`} />
            </button>
          </div>
        </div>

        {/* Action Trigger Button */}
        <div className="pt-2">
          <button
            onClick={handleStartAnalysis}
            disabled={isScanning}
            className="w-full bg-white text-black text-xs font-bold font-mono uppercase hover:bg-zinc-200 py-3.5 flex items-center justify-center gap-2 transition-colors"
          >
            {isScanning ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>Scanning Repo AST Nodes...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Analyze Codebase & Run Diagnostics</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

