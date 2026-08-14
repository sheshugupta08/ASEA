import React, { useState } from 'react';
import { PageType, NotificationItem, Project } from '../types';
import { 
  Search, 
  Bell, 
  Menu, 
  Plus, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  FolderGit2,
  User,
  Settings,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  projects: Project[];
  activeProject: Project;
  onSelectProject: (proj: Project) => void;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  notifications,
  onMarkNotificationRead,
  projects,
  activeProject,
  onSelectProject,
  onOpenMobileMenu,
  searchQuery,
  setSearchQuery,
  onAddToast
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const pageTitles: Record<PageType, string> = {
    login: 'User Authentication',
    signup: 'Create ASEA Account',
    'forgot-password': 'Account Password Recovery',
    landing: 'Autonomous Engineering Platform',
    dashboard: 'System Overview & Telemetry',
    'new-project': 'Generate AI Project Wizard',
    'existing-project': 'Import Repo & Auto-Fix',
    'project-details': 'IDE Workspace & Testing',
    agents: 'Agent Swarm Operations',
    settings: 'Configuration & API Keys'
  };

  return (
    <header className="h-16 bg-[#050505]/95 border-b border-white/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Brand logo for mobile view */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex md:hidden items-center gap-2 cursor-pointer"
        >
          <div className="w-6 h-6 bg-white flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-black rotate-45"></div>
          </div>
          <span className="font-mono text-xs font-bold text-white tracking-widest">ASEA</span>
        </div>

        {/* Page title for desktop */}
        <div className="hidden md:flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-semibold">ASEA</span>
          <span className="text-zinc-600 text-xs font-mono">&mdash;</span>
          <h1 className="text-xs font-medium text-zinc-200 uppercase tracking-widest font-mono">{pageTitles[activePage]}</h1>
        </div>

        {/* Project Switcher Dropdown */}
        <div className="relative hidden lg:block ml-4">
          <button
            onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-white/10 hover:border-white/30 transition-all text-xs font-mono text-zinc-200"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="max-w-[140px] truncate italic font-serif">{activeProject.name}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
          </button>

          {showProjectDropdown && (
            <div 
              className="absolute top-full left-0 mt-2 w-64 bg-[#050505] border border-white/15 p-2 z-50 animate-in fade-in"
              onClick={() => setShowProjectDropdown(false)}
            >
              <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                Select Workspace
              </div>
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    onAddToast('Project Switched', `Switched workspace to ${proj.name}`, 'info');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    proj.id === activeProject.id
                      ? 'bg-white/10 text-white font-semibold border-l-2 border-white'
                      : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="truncate font-mono">{proj.name}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{proj.description}</div>
                  </div>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${proj.status === 'active' ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
                </button>
              ))}
              <div className="pt-2 border-t border-white/10 mt-1">
                <button
                  onClick={() => onNavigate('new-project')}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-zinc-200 hover:bg-white/10 font-mono transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-white" />
                  <span>Create New Project</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Universal Search Bar */}
      <div className="flex-1 max-w-md mx-6 hidden sm:block">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, repos, issues, files... (Cmd + K)"
            className="w-full pl-9 pr-12 py-1.5 bg-black border border-white/10 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-white transition-all font-mono"
          />
          <kbd className="hidden lg:inline-block absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono px-1 py-0.5 bg-zinc-900 border border-white/10 text-zinc-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* Quick New Project Button */}
        <button
          onClick={() => onNavigate('new-project')}
          className="bg-white text-black text-xs font-bold tracking-tight hover:bg-zinc-200 px-4 py-1.5 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline uppercase text-[11px] font-mono tracking-wider">New Project</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 bg-black border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-black text-[9px] font-mono font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-[#050505] border border-white/15 p-4 z-50 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h4 className="font-mono text-[10px] uppercase tracking-[0.3em] font-semibold text-zinc-400">System Logs</h4>
                <span className="text-[9px] font-mono px-2 py-0.5 bg-white/10 text-zinc-300">
                  {notifications.length} Total
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto space-y-2 py-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => onMarkNotificationRead(n.id)}
                    className={`p-2.5 border transition-all cursor-pointer ${
                      n.read
                        ? 'bg-black border-white/5 opacity-60'
                        : 'bg-zinc-950 border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        {n.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                        <span className="text-xs font-medium text-white">{n.title}</span>
                      </div>
                      <span className="text-[9px] font-mono text-zinc-500 shrink-0">{n.time}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10 text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[10px] font-mono text-zinc-400 hover:text-white uppercase tracking-wider"
                >
                  Dismiss Logs
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 p-1 border border-white/15 hover:border-white transition-all bg-black"
          >
            <div className="w-6 h-6 bg-zinc-800 border border-white/20 flex items-center justify-center font-serif text-xs italic">
              AV
            </div>
          </button>

          {showUserDropdown && (
            <div 
              className="absolute top-full right-0 mt-2 w-56 bg-[#050505] border border-white/15 p-2 z-50 animate-in fade-in"
              onClick={() => setShowUserDropdown(false)}
            >
              <div className="px-3 py-2 border-b border-white/10">
                <p className="text-xs font-semibold text-white">Alex Vance</p>
                <p className="text-[10px] text-zinc-500 font-mono">alex.vance@asea.dev</p>
              </div>
              <div className="py-1 space-y-0.5">
                <button
                  onClick={() => onNavigate('settings')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <User className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Account Profile</span>
                </button>
                <button
                  onClick={() => onNavigate('settings')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Settings className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Platform Settings</span>
                </button>
              </div>
              <div className="pt-1 border-t border-white/10 space-y-0.5">
                <button
                  onClick={() => {
                    onNavigate('login');
                    onAddToast('Signed Out', 'You have been signed out of your account.', 'info');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

