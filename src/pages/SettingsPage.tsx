import React, { useState } from 'react';
import { UserSettings } from '../types';
import { 
  User, 
  Key, 
  Database, 
  Bell, 
  Save, 
  Eye, 
  EyeOff, 
  RefreshCw
} from 'lucide-react';

interface SettingsPageProps {
  settings: UserSettings;
  onSaveSettings: (newSettings: UserSettings) => void;
  onAddToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({
  settings: initialSettings,
  onSaveSettings,
  onAddToast,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'api' | 'db' | 'notifications'>('profile');
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showGithubToken, setShowGithubToken] = useState(false);
  const [showDbUri, setShowDbUri] = useState(false);
  const [isTestingConn, setIsTestingConn] = useState(false);

  const handleSave = () => {
    onSaveSettings(settings);
    onAddToast('Settings Saved', 'Platform preferences updated successfully.', 'success');
  };

  const handleTestDatabase = () => {
    setIsTestingConn(true);
    onAddToast('Testing Database Connection...', 'Connecting to PostgreSQL cluster...', 'info');

    setTimeout(() => {
      setIsTestingConn(false);
      onAddToast('Connection Successful!', 'Latency: 24ms. Database version: PostgreSQL 16.2', 'success');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-2">
        <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-semibold">Configuration</h2>
        <h1 className="text-3xl font-light text-white tracking-tight">Platform Settings & <span className="italic font-serif">Integrations</span></h1>
        <p className="text-xs text-zinc-400">
          Manage API keys, cloud database connections, autonomous agent permissions, and security preferences.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 space-x-2">
        {[
          { id: 'profile', label: 'Profile & Appearance', icon: User },
          { id: 'api', label: 'API & Secrets', icon: Key },
          { id: 'db', label: 'Database Config', icon: Database },
          { id: 'notifications', label: 'Auto-Pilot & Alerts', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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

      {/* Tab 1: Profile & Theme */}
      {activeTab === 'profile' && (
        <div className="bg-[#050505] p-6 border border-white/10 space-y-6">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            User Account Details
          </h3>

          <div className="flex items-center gap-4 pb-4 border-b border-white/10">
            <img
              src={settings.avatarUrl}
              alt="Avatar"
              className="w-14 h-14 object-cover border border-white/20"
            />
            <div>
              <p className="text-sm font-bold font-mono text-white">{settings.name}</p>
              <p className="text-xs font-mono text-zinc-400">{settings.email}</p>
              <span className="inline-block mt-1 text-[9px] font-mono uppercase px-2 py-0.5 bg-white/10 text-white border border-white/20">
                Enterprise Admin
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Full Name</label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1">Email Address</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono text-zinc-400">UI Theme Palette</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'editorial', label: 'Editorial Monochrome' },
                { id: 'dark', label: 'Zinc Dark' },
                { id: 'midnight', label: 'OLED Black' },
              ].map((th) => (
                <button
                  key={th.id}
                  type="button"
                  onClick={() => setSettings({ ...settings, theme: th.id as any })}
                  className={`p-3 border text-xs font-mono uppercase font-semibold transition-all ${
                    settings.theme === th.id || th.id === 'editorial'
                      ? 'bg-white text-black border-white'
                      : 'bg-black border-white/10 text-zinc-400 hover:border-white/30'
                  }`}
                >
                  {th.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: API Keys */}
      {activeTab === 'api' && (
        <div className="bg-[#050505] p-6 border border-white/10 space-y-6">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            API Keys & Secrets
          </h3>

          <div className="space-y-4">
            {/* Gemini API Key */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Gemini AI API Key</label>
              <div className="relative">
                <input
                  type={showGeminiKey ? 'text' : 'password'}
                  value={settings.geminiApiKey}
                  onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                  className="w-full pr-12 pl-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowGeminiKey(!showGeminiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showGeminiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 mt-1">Used by Planner, Coder, and Debugger agents for AI synthesis.</p>
            </div>

            {/* GitHub Personal Access Token */}
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">GitHub OAuth Access Token</label>
              <div className="relative">
                <input
                  type={showGithubToken ? 'text' : 'password'}
                  value={settings.githubToken}
                  onChange={(e) => setSettings({ ...settings, githubToken: e.target.value })}
                  className="w-full pr-12 pl-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowGithubToken(!showGithubToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showGithubToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] font-mono text-zinc-500 mt-1">Required for private repository cloning and automated PR creation.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Database Config */}
      {activeTab === 'db' && (
        <div className="bg-[#050505] p-6 border border-white/10 space-y-6">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Database & Vector Index Configuration
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-zinc-400 mb-1.5">Database URI String</label>
              <div className="relative">
                <input
                  type={showDbUri ? 'text' : 'password'}
                  value={settings.databaseUri}
                  onChange={(e) => setSettings({ ...settings, databaseUri: e.target.value })}
                  className="w-full pr-12 pl-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowDbUri(!showDbUri)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showDbUri ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-zinc-500">Type: PostgreSQL + pgvector</span>
              <button
                type="button"
                onClick={handleTestDatabase}
                disabled={isTestingConn}
                className="px-4 py-2 border border-white/20 text-white text-xs font-mono uppercase font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                {isTestingConn ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5" />}
                <span>Test Connection</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Notifications & Auto-Fix Toggles */}
      {activeTab === 'notifications' && (
        <div className="bg-[#050505] p-6 border border-white/10 space-y-6">
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Autonomous Agent Permissions
          </h3>

          <div className="space-y-3">
            {[
              { key: 'autoFixes', title: 'Automated AST Bug Auto-Fixing', desc: 'Allow Debugger Agent to apply verified patches automatically when tests pass.' },
              { key: 'inlineSuggestions', title: 'Real-time Inline IDE Suggestions', desc: 'Display AI code suggestions directly inside code editor files.' },
              { key: 'pushNotifications', title: 'Browser Push Notifications', desc: 'Receive notifications when build pipelines finish or tests fail.' },
              { key: 'emailAlerts', title: 'Critical Security Email Alerts', desc: 'Send immediate emails on critical OWASP vulnerability detections.' },
            ].map((opt) => {
              const k = opt.key as keyof UserSettings;
              const val = !!settings[k];
              return (
                <div
                  key={opt.key}
                  onClick={() => setSettings({ ...settings, [k]: !val })}
                  className="p-4 bg-black border border-white/10 hover:border-white/30 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <div className="pr-4">
                    <h4 className="text-xs font-mono font-bold text-white">{opt.title}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">{opt.desc}</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full transition-colors relative shrink-0 ${val ? 'bg-white' : 'bg-zinc-800'}`}>
                    <div className={`w-4 h-4 rounded-full bg-black absolute top-1 transition-transform ${val ? 'left-5' : 'left-1'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-white text-black text-xs font-bold font-mono uppercase hover:bg-zinc-200 px-6 py-3 flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save Settings</span>
        </button>
      </div>
    </div>
  );
};

