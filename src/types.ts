export type PageType =
  | 'login'
  | 'signup'
  | 'forgot-password'
  | 'landing'
  | 'dashboard'
  | 'new-project'
  | 'existing-project'
  | 'project-details'
  | 'agents'
  | 'settings';

export type AgentRole = 'planner' | 'architect' | 'coder' | 'tester' | 'debugger' | 'reviewer';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status:
  | 'active'
  | 'building'
  | 'deploying'
  | 'completed'
  | 'failed'
  | 'idle';
  currentTask: string;
  cpuUsage: number;
  ramUsage: string;
  ramMax: string;
  tokenRate?: number;
  tasksCompleted: number;
  tasksTotal: number;
  lastActive: string;
  avatarIcon: string;
  logs: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'new' | 'imported';
  source?: 'github' | 'zip' | 'localhost';
  sourceUrl?: string;
  techStack: string[];
  status:
  | 'active'
  | 'building'
  | 'deploying'
  | 'completed'
  | 'failed'
  | 'idle';
  buildStatus: 'passing' | 'failing' | 'running';
  testCoverage: number;
  openIssuesCount: number;
  lastCommitTime: string;
  lastCommitMessage: string;
  environment: 'production' | 'staging' | 'development';
  version: string;
  uptime: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
  language?: string;
  hasBug?: boolean;
}

export interface TestResult {
  id: string;
  name: string;
  durationMs: number;
  status: 'passed' | 'failed' | 'skipped' | 'running';
  errorMessage?: string;
}

export interface BugIssue {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  file: string;
  line?: number;
  status: 'open' | 'fixing' | 'resolved';
  assignedTo: string;
  suggestedFix?: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'commit' | 'bug' | 'build' | 'deploy' | 'sync' | 'alert';
  timestamp: string;
  agentName?: string;
  codeSnippet?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface UserSettings {
  name: string;
  email: string;
  avatarUrl: string;
  theme: 'dark' | 'midnight' | 'cyberpunk';
  pushNotifications: boolean;
  emailAlerts: boolean;
  autoFixes: boolean;
  inlineSuggestions: boolean;
  telemetrySharing: boolean;
  geminiApiKey: string;
  githubToken: string;
  databaseUri: string;
  dbType: 'postgresql' | 'mongodb' | 'redis';
}
