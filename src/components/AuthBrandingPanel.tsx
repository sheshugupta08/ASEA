import React from 'react';
import { Bot, Cpu, ShieldCheck, Sparkles, Code2, Bug, CheckCircle2, Terminal, Zap } from 'lucide-react';

interface AuthBrandingPanelProps {
  mode: 'login' | 'signup' | 'forgot-password';
}

export const AuthBrandingPanel: React.FC<AuthBrandingPanelProps> = ({ mode }) => {
  return (
    <div className="hidden lg:flex flex-col justify-between relative bg-black border-l border-white/10 p-12 overflow-hidden select-none">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-40" />

      {/* Top Header Branding */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 bg-white flex items-center justify-center">
            <div className="w-4 h-4 bg-black rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold tracking-widest text-white">ASEA</span>
              <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 bg-white/10 text-zinc-300 border border-white/20">
                Swarm v2.4
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-semibold">
              Autonomous Software Engineering Agent
            </p>
          </div>
        </div>
      </div>

      {/* Middle Interactive AI Swarm Illustration Card */}
      <div className="relative z-10 my-auto space-y-6 max-w-lg">
        {mode === 'login' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Autonomous Code Synthesis Engine
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight leading-tight">
                Self-healing software <br />
                <span className="italic font-serif font-normal text-zinc-300">orchestrated by AI agents.</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Deploy 6 specialized micro-agents to scan AST trees, resolve race conditions, and synthesize PyTest boundary suites in real-time.
              </p>
            </div>

            {/* Simulated Live Code Box */}
            <div className="bg-[#050505] border border-white/15 p-4 space-y-2 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  asea_kernel_v2.py
                </span>
                <span className="text-emerald-400 uppercase">AST Patched &bull; 12ms</span>
              </div>
              <pre className="text-zinc-300 text-[11px] leading-relaxed overflow-x-auto">
                <span className="text-purple-400">@asea.swarm</span>(roles=[<span className="text-emerald-300">'coder'</span>, <span className="text-emerald-300">'debugger'</span>]){"\n"}
                <span className="text-blue-400">async def</span> <span className="text-yellow-200">resolve_leak</span>(ast_node):{"\n"}
                {"    "}<span className="text-zinc-500"># Intercept unhandled exception generator</span>{"\n"}
                {"    "}<span className="text-purple-400">async with</span> ast_node.<span className="text-blue-300">patch_scope</span>():{"\n"}
                {"        "}<span className="text-purple-400">return</span> <span className="text-purple-400">await</span> swarm.<span className="text-blue-300">apply_hotfix</span>()
              </pre>
            </div>

            {/* Stat Pill Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-zinc-950 border border-white/10 p-3 text-center">
                <div className="text-lg font-mono font-bold text-white">99.8%</div>
                <div className="text-[9px] font-mono uppercase text-zinc-500 mt-0.5">Fix Accuracy</div>
              </div>
              <div className="bg-zinc-950 border border-white/10 p-3 text-center">
                <div className="text-lg font-mono font-bold text-emerald-400">128 t/s</div>
                <div className="text-[9px] font-mono uppercase text-zinc-500 mt-0.5">Throughput</div>
              </div>
              <div className="bg-zinc-950 border border-white/10 p-3 text-center">
                <div className="text-lg font-mono font-bold text-white">&lt; 100ms</div>
                <div className="text-[9px] font-mono uppercase text-zinc-500 mt-0.5">AST Latency</div>
              </div>
            </div>
          </div>
        )}

        {mode === 'signup' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Next-Gen Developer Workspace
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight leading-tight">
                Join 10,000+ engineers <br />
                <span className="italic font-serif font-normal text-zinc-300">building with AI agent swarms.</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Instant access to automated bug isolation, GitHub repo syncing, full-stack container deployments, and zero-latency AST scans.
              </p>
            </div>

            {/* Feature Checklist Box */}
            <div className="bg-[#050505] border border-white/15 p-5 space-y-3 font-mono text-xs">
              <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold pb-2 border-b border-white/10">
                Included in Free Developer Plan
              </div>
              {[
                'Unlimited AST codebase analysis & bug detection',
                '6 autonomous micro-agents (Coder, Debugger, Tester, etc.)',
                'Automatic PyTest / Vitest unit test suite generation',
                'One-click Cloud Run container deployments',
                'GitHub OAuth integration & automated Pull Requests',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-zinc-300 text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'forgot-password' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Enterprise Security Guard
              </span>
              <h2 className="text-3xl font-light text-white tracking-tight leading-tight">
                Zero-Trust Encryption <br />
                <span className="italic font-serif font-normal text-zinc-300">&amp; Secure Auth Recovery.</span>
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Your workspace credentials and API keys are protected using AES-256 encryption with SOC-2 compliance standards.
              </p>
            </div>

            <div className="bg-[#050505] border border-white/15 p-5 space-y-3 font-mono text-xs">
              <div className="flex items-center gap-3 text-white">
                <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold uppercase text-xs">Encrypted Key Store</h4>
                  <p className="text-[10px] text-zinc-500">256-bit AES RSA Session Tokens</p>
                </div>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed pt-2 border-t border-white/10">
                Passwords are never stored in plaintext. Reset links are cryptographically signed and expire after 15 minutes.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Quote */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Cluster Status: Operational</span>
        </div>
        <span>ASEA &copy; 2026</span>
      </div>
    </div>
  );
};
