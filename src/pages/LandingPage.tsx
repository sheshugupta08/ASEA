import React from 'react';
import { PageType } from '../types';
import { 
  ArrowRight, 
  PlusCircle, 
  FolderGit2, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Sliders,
  Layers,
  Code2
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: PageType) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Header Section (Editorial Hierarchy) */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
        <div className="space-y-2">
          <h2 className="text-[11px] uppercase tracking-[0.4em] text-zinc-500 font-semibold">
            Autonomous Software Engineering Agent
          </h2>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tighter leading-none text-white">
            Project <span className="italic font-serif">Hyperion-9</span>
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] uppercase text-zinc-500 tracking-widest mb-1 font-mono">Current Phase</p>
            <div className="flex items-center gap-2 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              <p className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">ARCHITECTURAL_ANALYSIS</p>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('new-project')}
            className="px-8 py-3 bg-white text-black text-xs font-bold tracking-tight hover:bg-zinc-200 transition-colors uppercase font-mono"
          >
            Deploy Staging
          </button>
        </div>
      </header>

      {/* Metric Grid (Editorial Grid with 1px border gap) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden">
        <div className="bg-[#050505] p-6">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-mono">Agents Active</p>
          <p className="text-4xl font-light tracking-tighter text-white">12<span className="text-xl text-zinc-600 font-mono">/16</span></p>
        </div>
        <div className="bg-[#050505] p-6">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-mono">Detected Issues</p>
          <p className="text-4xl font-light tracking-tighter text-amber-500">04</p>
        </div>
        <div className="bg-[#050505] p-6">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-mono">Code Coverage</p>
          <p className="text-4xl font-light tracking-tighter text-white">98.4%</p>
        </div>
        <div className="bg-[#050505] p-6">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2 font-mono">Build Health</p>
          <p className="text-4xl font-light tracking-tighter text-emerald-400">STABLE</p>
        </div>
      </section>

      {/* Mode Selector Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden">
        {/* New Project Mode Card */}
        <div className="bg-[#050505] p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 block">Mode 01</span>
            <h3 className="text-2xl font-light text-white tracking-tight">New Project <span className="italic font-serif">Generator</span></h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Generate complete production-ready full-stack applications from simple natural language prompts. ASEA handles frontend, backend, database migrations, and API routes.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-zinc-400 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white shrink-0" />
                <span>Tech Stack: React, FastAPI, Node.js, Python, PostgreSQL</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-white shrink-0" />
                <span>Real-time agent planning and architecture design</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('new-project')}
            className="w-full py-3 px-4 bg-white text-black text-xs font-bold tracking-tight hover:bg-zinc-200 transition-colors uppercase font-mono flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Launch Generator Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Existing Project Mode Card */}
        <div className="bg-[#050505] p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 block">Mode 02</span>
            <h3 className="text-2xl font-light text-white tracking-tight">Repository <span className="italic font-serif">Diagnostic & Repair</span></h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Import codebases via GitHub URL or ZIP archive. ASEA scans AST nodes, identifies memory leaks or async bugs, synthesizes fixes, and executes unit test suites.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-zinc-400 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0" />
                <span>GitHub Public & Private Repositories support</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 shrink-0" />
                <span>Automated bug detection and patch PR generation</span>
              </li>
            </ul>
          </div>
          <button
            onClick={() => onNavigate('existing-project')}
            className="w-full py-3 px-4 border border-white/20 text-white text-xs font-bold tracking-tight hover:bg-white/10 transition-colors uppercase font-mono flex items-center justify-center gap-2"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Import & Analyze Repository</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Dynamic Split Layout (Live Agent Trace & Context) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-px bg-white/10 border border-white/10 overflow-hidden">
        {/* Left Column: Agent Console */}
        <div className="lg:col-span-8 flex flex-col bg-zinc-950/80 p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <span className="text-[10px] uppercase font-mono text-zinc-400 tracking-wider">Live Agent Trace &mdash; ase@hyperion:~$</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
              <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
            </div>
          </div>
          <div className="font-mono text-xs leading-relaxed text-zinc-300 space-y-2">
            <p><span className="text-emerald-400 uppercase">[planner]</span> Identified dependency bottleneck in <span className="underline">core/engine.go</span></p>
            <p><span class="text-emerald-400 uppercase">[architect]</span> Generating refactor strategy for high-load clusters...</p>
            <p><span className="text-blue-400 uppercase">[coder]</span> Injecting concurrent pattern to WorkerPool struct</p>
            <p><span className="text-blue-400 uppercase">[coder]</span> <span className="bg-white/10 px-1">Writing tests for sync.Waitgroup stability</span></p>
            <p><span className="text-purple-400 uppercase">[tester]</span> Executing IntegrationSuite_V2 &mdash; 142 passed, 0 failed</p>
            <p><span className="text-emerald-400 uppercase">[reviewer]</span> Code quality score: 9.8/10. Approval granted.</p>
            <p className="animate-pulse text-zinc-500">_</p>
          </div>
        </div>

        {/* Right Column: Context & Insights */}
        <div className="lg:col-span-4 bg-[#050505] p-6 flex flex-col justify-between relative overflow-hidden space-y-6">
          <div className="space-y-4">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 italic">Insights</h3>
            <div className="space-y-4">
              <div className="border-l-2 border-emerald-500 pl-4 py-1">
                <p className="text-xs text-zinc-400">Performance Gain</p>
                <p className="text-base font-semibold tracking-tight text-white">+340ms Optimization</p>
              </div>
              <div className="border-l-2 border-amber-500 pl-4 py-1">
                <p className="text-xs text-zinc-400">Vulnerability Fix</p>
                <p className="text-base font-semibold tracking-tight text-white">CVE-2024-912 Resolved</p>
              </div>
            </div>
          </div>
          {/* Editorial Graphic Decor */}
          <div className="pointer-events-none select-none text-right opacity-10">
            <p className="text-8xl font-serif italic text-white">AI</p>
          </div>
        </div>
      </div>

      {/* Autonomous Agent Swarm Architecture */}
      <section className="space-y-6">
        <div className="border-b border-white/10 pb-4">
          <h2 className="text-xs uppercase font-mono tracking-[0.3em] text-zinc-500">Architecture</h2>
          <h3 className="text-2xl font-light text-white tracking-tight mt-1">Autonomous Agent Swarm</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden">
          {[
            {
              title: 'Planner Agent',
              role: 'Requirements & Task DAG',
              desc: 'Deconstructs user prompt into sequential task DAGs and validates project scope.',
              icon: Sliders
            },
            {
              title: 'Architect Agent',
              role: 'System Design & Schema',
              desc: 'Selects optimal frameworks, builds database ERDs, and designs REST/GraphQL interfaces.',
              icon: Layers
            },
            {
              title: 'Coder Agent Swarm',
              role: 'Code Synthesis & AST',
              desc: 'Executes concurrent code synthesis across multiple modules with 128+ tokens/sec.',
              icon: Code2
            },
            {
              title: 'Tester Agent',
              role: 'Test Suite Generation',
              desc: 'Synthesizes unit, integration, and edge-case boundary tests with coverage reports.',
              icon: ShieldCheck
            },
            {
              title: 'Debugger Agent',
              role: 'Stack Trace Isolation',
              desc: 'Analyzes runtime errors, unhandled async exceptions, and memory leaks automatically.',
              icon: Zap
            },
            {
              title: 'Reviewer Agent',
              role: 'Security & Quality Audit',
              desc: 'Audits code for OWASP vulnerabilities, secret leaks, and architectural compliance.',
              icon: CheckCircle2
            }
          ].map((agent, i) => {
            const Icon = agent.icon;
            return (
              <div key={i} className="bg-[#050505] p-6 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-zinc-900 border border-white/10 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{agent.title}</h4>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{agent.role}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{agent.desc}</p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500 uppercase">
                  <span>Status: Operational</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Access CTA Footer Banner */}
      <section className="bg-[#050505] border border-white/10 p-8 text-center space-y-4">
        <h3 className="text-2xl font-light text-white tracking-tight">Ready to automate your engineering workflow?</h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          Start generating new software projects or analyze your existing GitHub repositories in seconds with ASEA.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-white text-black text-xs font-bold tracking-tight hover:bg-zinc-200 px-8 py-3 uppercase font-mono transition-colors"
          >
            Go to Platform Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

