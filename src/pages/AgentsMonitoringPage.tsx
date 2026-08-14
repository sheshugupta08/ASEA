import React, { useState } from 'react';
import { Agent } from '../types';
import { 
  Bot, 
  Cpu, 
  HardDrive, 
  Terminal, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Code2, 
  Bug, 
  ShieldCheck,
  Sliders
} from 'lucide-react';

interface AgentsMonitoringPageProps {
  agents: Agent[];
  onToggleAgentPause: (agentId: string) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const AgentsMonitoringPage: React.FC<AgentsMonitoringPageProps> = ({
  agents,
  onToggleAgentPause,
  onAddToast,
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || 'agent-1');

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];

  const getAgentIcon = (role: string) => {
    switch (role) {
      case 'planner': return Sliders;
      case 'architect': return Layers;
      case 'coder': return Code2;
      case 'tester': return ShieldCheck;
      case 'debugger': return Bug;
      case 'reviewer': return CheckCircle2;
      default: return Bot;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-semibold mb-1">Operations</h2>
          <h1 className="text-3xl font-light text-white tracking-tight">Swarm Fleet <span className="italic font-serif">Monitoring</span></h1>
          <p className="text-xs text-zinc-400 mt-1">
            Inspect micro-agent reasoning tasks, CPU/RAM resource usage, token generation throughput, and execution logs.
          </p>
        </div>

        <button
          onClick={() => onAddToast('Swarm Re-synchronized', 'All 6 micro-agents pinged and healthy.', 'success')}
          className="bg-white text-black text-xs font-bold font-mono uppercase hover:bg-zinc-200 px-5 py-2.5 flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Re-sync Swarm Fleet</span>
        </button>
      </div>

      {/* Agents Swarm Grid (Editorial 1px Gap Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 overflow-hidden">
        {agents.map((agent) => {
          const Icon = getAgentIcon(agent.role);
          const isPaused = agent.status === 'paused';
          const isSelected = agent.id === selectedAgentId;

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`bg-[#050505] p-6 transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-zinc-950 border-l-4 border-l-white'
                  : 'hover:bg-zinc-950/60'
              }`}
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-zinc-900 border border-white/10 flex items-center justify-center text-white">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div>
                      <h3 className="text-sm font-mono font-bold text-white">{agent.name}</h3>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{agent.role}</span>
                    </div>
                  </div>

                  <span className={`text-[9px] font-mono px-2 py-0.5 uppercase border ${
                    isPaused ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    agent.status === 'active' || agent.status === 'generating' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    'bg-white/10 text-white border-white/20'
                  }`}>
                    {agent.status}
                  </span>
                </div>

                {/* Current Micro-task Statement */}
                <div className="p-3 bg-black border border-white/10 space-y-1 mb-4 font-mono">
                  <span className="text-[10px] text-zinc-500 uppercase block">Current Task:</span>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">{agent.currentTask}</p>
                </div>

                {/* Resource Metrics Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1 uppercase">
                      <Cpu className="w-3 h-3 text-white" /> CPU Load
                    </span>
                    <span className="text-white">{agent.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-zinc-900 h-1 overflow-hidden">
                    <div className="bg-white h-full" style={{ width: `${agent.cpuUsage}%` }} />
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 pt-1">
                    <span className="flex items-center gap-1 uppercase">
                      <HardDrive className="w-3 h-3 text-emerald-400" /> RAM Allocation
                    </span>
                    <span className="text-white">{agent.ramUsage} / {agent.ramMax}</span>
                  </div>
                </div>
              </div>

              {/* Footer Controls */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 text-[10px] uppercase">
                  Queue: {agent.tasksCompleted}/{agent.tasksTotal}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleAgentPause(agent.id);
                    onAddToast('Agent Toggled', `${agent.name} is now ${isPaused ? 'Active' : 'Paused'}`, 'info');
                  }}
                  className={`px-3 py-1.5 border text-xs font-mono uppercase font-semibold flex items-center gap-1.5 transition-colors ${
                    isPaused
                      ? 'bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-400'
                      : 'bg-black border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Agent Detailed Logs & Execution Terminal */}
      <div className="bg-[#050505] p-6 border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-white" />
            <div>
              <h3 className="text-base font-bold text-white font-mono uppercase">{selectedAgent.name} - Operational Logs</h3>
              <p className="text-xs text-zinc-500 font-mono">Reasoning trace and AST token output stream</p>
            </div>
          </div>

          <span className="text-xs font-mono text-emerald-400 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 uppercase">
            {selectedAgent.tokenRate ? `${selectedAgent.tokenRate} Tokens/sec` : 'Live Stream'}
          </span>
        </div>

        <div className="bg-black border border-white/10 p-4 font-mono text-xs text-emerald-400 space-y-2 max-h-[250px] overflow-y-auto">
          {selectedAgent.logs.map((log, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-zinc-500 shrink-0">&gt;</span>
              <p className="leading-relaxed">{log}</p>
            </div>
          ))}
          <p className="text-white animate-pulse">&gt; Processing next instruction block...</p>
        </div>
      </div>
    </div>
  );
};

