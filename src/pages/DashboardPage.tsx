import React from 'react';

import {
  PageType,
  Project,
  Agent,
  ActivityItem,
} from '../types';

import {
  FolderGit2,
  Bot,
  Code2,
  Bug,
  Activity,
  Terminal,
  Zap,
  Plus,
  Cpu,
  HardDrive,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';


interface DashboardPageProps {
  onNavigate: (page: PageType) => void;
  projects: Project[];
  activeProject: Project;
  onSelectProject: (project: Project) => void;
  onOpenProject: (project: Project) => void;
  agents: Agent[];
  activities: ActivityItem[];
  onAddToast: (
    title: string,
    description?: string,
    type?: 'success' | 'info' | 'warning' | 'error',
  ) => void;
}


export const DashboardPage: React.FC<
  DashboardPageProps
> = ({
  onNavigate,
  projects,
  activeProject,
  onSelectProject,
  onOpenProject,
  agents,
  activities,
  onAddToast,
}) => {
    return (
      <div className="space-y-8 pb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-semibold mb-1">
              Telemetry
            </h2>

            <h1 className="text-3xl font-light text-white tracking-tight">
              System Overview &{' '}
              <span className="italic font-serif">
                Projects
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                onAddToast(
                  'Diagnostics Triggered',
                  'Scanning active project AST nodes...',
                  'info',
                )
              }
              className="px-4 py-2 bg-black border border-white/20 text-xs font-mono text-white hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />

              <span className="uppercase text-[11px] tracking-wider font-semibold">
                Run Diagnostics
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                onNavigate('new-project')
              }
              className="bg-white text-black text-xs font-bold tracking-tight hover:bg-zinc-200 px-5 py-2 flex items-center gap-2 transition-all uppercase font-mono"
            >
              <Plus className="w-4 h-4" />

              <span>New AI Project</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
          <div className="bg-[#050505] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Active Repos
              </span>

              <FolderGit2 className="w-4 h-4 text-white" />
            </div>

            <div className="text-3xl font-light text-white font-mono">
              {projects.length}
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400">
              <span>1 Building</span>
              <span className="text-zinc-500">
                2 Passing
              </span>
            </div>
          </div>

          <div className="bg-[#050505] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Active Swarm
              </span>

              <Bot className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="text-3xl font-light text-white font-mono flex items-center gap-2">
              <span>{agents.length}</span>

              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>128 t/s Generation</span>

              <span className="text-emerald-400">
                100% Health
              </span>
            </div>
          </div>

          <div className="bg-[#050505] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Avg Test Coverage
              </span>

              <ShieldCheck className="w-4 h-4 text-white" />
            </div>

            <div className="text-3xl font-light text-white font-mono">
              {activeProject.testCoverage}%
            </div>

            <div className="mt-2 w-full bg-zinc-900 h-1 overflow-hidden">
              <div
                className="bg-white h-full"
                style={{
                  width: `${activeProject.testCoverage}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-[#050505] p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Open Issues
              </span>

              <Bug className="w-4 h-4 text-amber-500" />
            </div>

            <div className="text-3xl font-light text-amber-500 font-mono">
              {activeProject.openIssuesCount}
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-amber-500">
              <span>1 Critical AST</span>

              <span className="text-zinc-500">
                1 Medium
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden">
          <div className="lg:col-span-2 bg-[#050505] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-light text-white tracking-tight">
                  Active Workspaces
                </h3>

                <p className="text-xs text-zinc-500 font-mono">
                  Managed repositories and AI generated applications
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate('existing-project')
                }
                className="text-xs font-mono text-white hover:underline uppercase tracking-wider flex items-center gap-1"
              >
                <span>Import Repo</span>

                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project);
                    onOpenProject(project);
                  }}
                  className={`p-4 border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${project.id === activeProject.id
                    ? 'bg-zinc-950 border-white/40 border-l-4 border-l-white'
                    : 'bg-black border-white/10 hover:border-white/20'
                    }`}
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-semibold text-white font-mono italic font-serif">
                        {project.name}
                      </span>

                      <span
                        className={`text-[9px] font-mono uppercase px-2 py-0.5 border ${project.buildStatus === 'passing'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                          }`}
                      >
                        {project.buildStatus}
                      </span>

                      <span className="text-[9px] font-mono text-zinc-500 px-1.5 py-0.5 bg-zinc-900 border border-white/10">
                        {project.version}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {project.techStack.map(
                        (tech, index) => (
                          <span
                            key={`${project.id}-${tech}-${index}`}
                            className="text-[9px] font-mono px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-white/10"
                          >
                            {tech}
                          </span>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                    <div className="text-right font-mono text-[10px] hidden sm:block">
                      <span className="text-emerald-400 block">
                        {project.testCoverage}% Coverage
                      </span>

                      <span className="text-zinc-500 block">
                        {project.openIssuesCount} Issues
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectProject(project);
                        onOpenProject(project);
                      }}
                      className="px-3 py-1.5 bg-white text-black text-xs font-bold font-mono uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                    >
                      <Code2 className="w-3.5 h-3.5" />

                      <span>Open IDE</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#050505] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <h3 className="text-lg font-light text-white tracking-tight">
                  Agent Swarm
                </h3>

                <p className="text-xs text-zinc-500 font-mono">
                  Current operational status
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  onNavigate('agents')
                }
                className="text-xs font-mono text-white uppercase hover:underline"
              >
                View Swarm
              </button>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {agents.map((agent) => (
                <div
                  key={agent.id}
                  className="p-3 bg-zinc-950 border border-white/10"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${agent.status === 'active' ||
                          agent.status === 'generating'
                          ? 'bg-emerald-400'
                          : 'bg-zinc-600'
                          }`}
                      />

                      <span className="text-xs font-mono font-semibold text-white">
                        {agent.name}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono text-zinc-400 uppercase px-1.5 py-0.5 border border-white/10">
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed mb-2 font-mono">
                    {agent.currentTask}
                  </p>

                  <div className="flex items-center justify-between text-[9px] font-mono text-zinc-500 bg-black px-2 py-1 border border-white/5">
                    <span className="flex items-center gap-1">
                      <Cpu className="w-3 h-3 text-white" />

                      {agent.cpuUsage}% CPU
                    </span>

                    <span className="flex items-center gap-1">
                      <HardDrive className="w-3 h-3 text-emerald-400" />

                      {agent.ramUsage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#050505] border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <h3 className="text-lg font-light text-white tracking-tight">
                Live Execution Activity
              </h3>

              <p className="text-xs text-zinc-500 font-mono">
                Automated commits, bug fixes, unit tests, and deployments
              </p>
            </div>

            <span className="text-[9px] font-mono text-emerald-400 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 uppercase">
              Realtime Stream
            </span>
          </div>

          <div className="space-y-3">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="p-3.5 bg-zinc-950 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 border flex items-center justify-center shrink-0 mt-0.5 ${activity.type === 'commit'
                      ? 'bg-white/10 border-white/30 text-white'
                      : activity.type === 'bug'
                        ? 'bg-red-500/10 border-red-500/30 text-red-400'
                        : activity.type === 'deploy'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                          : 'bg-zinc-800 border-white/10 text-zinc-300'
                      }`}
                  >
                    {activity.type === 'commit' && (
                      <Code2 className="w-4 h-4" />
                    )}

                    {activity.type === 'bug' && (
                      <Bug className="w-4 h-4" />
                    )}

                    {activity.type === 'deploy' && (
                      <Zap className="w-4 h-4" />
                    )}

                    {activity.type === 'build' && (
                      <Terminal className="w-4 h-4" />
                    )}

                    {activity.type === 'sync' && (
                      <Activity className="w-4 h-4" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-white">
                      {activity.title}
                    </h4>

                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {activity.subtitle}
                    </p>

                    {activity.codeSnippet && (
                      <span className="inline-block mt-1 text-[10px] font-mono bg-black px-2 py-0.5 text-zinc-300 border border-white/10">
                        {activity.codeSnippet}
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono text-zinc-500 shrink-0 self-end sm:self-center">
                  <span>{activity.timestamp}</span>

                  {activity.agentName && (
                    <span className="block text-white uppercase">
                      {activity.agentName}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };