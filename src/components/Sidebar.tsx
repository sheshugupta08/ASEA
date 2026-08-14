import React from 'react';
import { PageType } from '../types';
import { 
  LayoutDashboard, 
  PlusCircle, 
  FolderGit2, 
  Bot, 
  Settings, 
  Code2, 
  Home, 
  Layers,
  Activity,
  Lock
} from 'lucide-react';

interface SidebarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  activeProjectName?: string;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  activeProjectName = 'Hyperion-9',
  className = '',
}) => {
  const navItems = [
    { id: 'login' as PageType, label: 'Sign In / Auth', icon: Lock, badge: null },
    { id: 'landing' as PageType, label: 'Overview', icon: Home, badge: null },
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard, badge: 'Live' },
    { id: 'new-project' as PageType, label: 'New Project', icon: PlusCircle, badge: 'AI' },
    { id: 'existing-project' as PageType, label: 'Import & Fix', icon: FolderGit2, badge: null },
    { id: 'project-details' as PageType, label: 'IDE Workspace', icon: Code2, badge: 'Active' },
    { id: 'agents' as PageType, label: 'Agent Swarm', icon: Bot, badge: '12 Active' },
    { id: 'settings' as PageType, label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside
      className={`w-64 bg-black border-r border-white/10 flex flex-col justify-between select-none ${className}`}
    >
      <div className="flex flex-col h-full">
        {/* Platform Brand Header */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
          <div 
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-white flex items-center justify-center">
              <div className="w-3.5 h-3.5 bg-black rotate-45"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold tracking-widest text-white">ASEA</span>
                <span className="text-[9px] uppercase font-mono tracking-widest px-1.5 py-0.5 bg-white/10 text-zinc-300 border border-white/20">v2.4</span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold mt-0.5">Autonomous Agent</p>
            </div>
          </div>
        </div>

        {/* Active Workspace Selector Info */}
        <div 
          className="px-4 py-3 mx-4 my-4 border border-white/10 bg-zinc-950/80 flex items-center justify-between group hover:border-white/30 transition-colors cursor-pointer"
          onClick={() => onNavigate('project-details')}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] shrink-0" />
            <div className="min-w-0">
              <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-widest block leading-none mb-1">Project</span>
              <span className="text-xs font-semibold text-white truncate block italic font-serif tracking-tight">{activeProjectName}</span>
            </div>
          </div>
          <Layers className="w-3.5 h-3.5 text-zinc-500 shrink-0 group-hover:text-white transition-colors" />
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
          <div className="px-2 pb-2 pt-2 text-[10px] uppercase font-semibold tracking-[0.3em] text-zinc-500">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-white border-l-2 border-white pl-3 font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                  <span className="tracking-tight">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 border ${
                    item.badge === 'Live' || item.badge === 'Active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-white/5 text-zinc-400 border-white/10'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* System Health Footer */}
        <div className="p-4 border-t border-white/10 bg-black">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-2">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400" />
              Cluster
            </span>
            <span className="text-emerald-400">99.9%</span>
          </div>
          <div className="w-full bg-zinc-900 h-1 overflow-hidden">
            <div className="bg-white h-full w-[88%]" />
          </div>
          <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
            <span>12 Agents</span>
            <span>128 t/s</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

