import React from 'react';
import { PageType } from '../types';
import { LayoutDashboard, PlusCircle, Bot, Code2, Settings, Home } from 'lucide-react';

interface BottomNavProps {
  activePage: PageType;
  onNavigate: (page: PageType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'landing' as PageType, label: 'Home', icon: Home },
    { id: 'dashboard' as PageType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-project' as PageType, label: 'New AI', icon: PlusCircle },
    { id: 'project-details' as PageType, label: 'Workspace', icon: Code2 },
    { id: 'agents' as PageType, label: 'Agents', icon: Bot },
    { id: 'settings' as PageType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121317]/95 border-t border-white/10 backdrop-blur-lg px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activePage === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
              isActive
                ? 'text-[#45a1ff] bg-[#45a1ff]/15 font-semibold scale-105'
                : 'text-[#8a919d] hover:text-[#e3e2e8]'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-mono leading-tight">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
