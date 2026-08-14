import React, {
  useEffect,
  useState,
} from 'react';

import {
  PageType,
  Project,
  Agent,
  NotificationItem,
  ToastMessage,
  UserSettings,
} from './types';

import {
  mockProjects,
  mockAgents,
  mockActivities,
  mockNotifications,
  initialUserSettings,
} from './data/mockData';

import { getProjects } from './api/backend';

import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ToastContainer } from './components/Toast';

import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewProjectPage } from './pages/NewProjectPage';
import { ExistingProjectPage } from './pages/ExistingProjectPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { AgentsMonitoringPage } from './pages/AgentsMonitoringPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

import { X } from 'lucide-react';


function removeDuplicateProjects(
  projectList: Project[],
): Project[] {
  const uniqueProjects = new Map<string, Project>();

  projectList.forEach((project) => {
    const key = project.name
      .trim()
      .toLowerCase();

    if (!uniqueProjects.has(key)) {
      uniqueProjects.set(key, project);
    }
  });

  return Array.from(
    uniqueProjects.values(),
  );
}


export function App() {
  const [activePage, setActivePage] =
    useState<PageType>('login');

  const [projects, setProjects] =
    useState<Project[]>(mockProjects);

  const [activeProject, setActiveProject] =
    useState<Project>(
      mockProjects[0],
    );

  const [agents, setAgents] =
    useState<Agent[]>(mockAgents);

  const [activities] =
    useState(mockActivities);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(
      mockNotifications,
    );

  const [settings, setSettings] =
    useState<UserSettings>(
      initialUserSettings,
    );

  const [toasts, setToasts] =
    useState<ToastMessage[]>([]);

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');


  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      try {
        const backendProjects =
          await getProjects();

        const uniqueProjects =
          removeDuplicateProjects(
            backendProjects,
          );

        if (
          !cancelled &&
          uniqueProjects.length > 0
        ) {
          setProjects(uniqueProjects);
          setActiveProject(
            uniqueProjects[0],
          );
        }
      } catch (error) {
        console.error(
          'Failed to load projects from ASEA backend:',
          error,
        );
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, []);


  const handleAddToast = (
    title: string,
    description?: string,
    type:
      | 'success'
      | 'info'
      | 'warning'
      | 'error' = 'info',
  ) => {
    const id =
      `toast-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 5)}`;

    const newToast: ToastMessage = {
      id,
      title,
      description,
      type,
    };

    setToasts((previous) => [
      ...previous,
      newToast,
    ]);

    setTimeout(() => {
      setToasts((previous) =>
        previous.filter(
          (toast) => toast.id !== id,
        ),
      );
    }, 4000);
  };


  const handleDismissToast = (id: string) => {
    setToasts((previous) =>
      previous.filter(
        (toast) => toast.id !== id,
      ),
    );
  };


  const handleNavigate = (page: PageType) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  const handleSelectProject = (
    project: Project,
  ) => {
    setActiveProject(project);
  };


  const handleOpenProject = (
    project: Project,
  ) => {
    setActiveProject(project);
    handleNavigate('project-details');
  };


  const handleAddNewProject = (
    newProject: Project,
  ) => {
    setProjects((previous) => {
      const combinedProjects = [
        newProject,
        ...previous,
      ];

      return removeDuplicateProjects(
        combinedProjects,
      );
    });

    setActiveProject(newProject);
  };


  const handleAddImportedProject = (
    importedProject: Project,
  ) => {
    setProjects((previous) => {
      const combinedProjects = [
        importedProject,
        ...previous,
      ];

      return removeDuplicateProjects(
        combinedProjects,
      );
    });

    setActiveProject(importedProject);
  };


  const handleToggleAgentPause = (
    agentId: string,
  ) => {
    setAgents((previous) =>
      previous.map((agent) =>
        agent.id === agentId
          ? {
            ...agent,
            status:
              agent.status === 'paused'
                ? 'active'
                : 'paused',
          }
          : agent,
      ),
    );
  };


  const handleMarkNotificationRead = (
    id: string,
  ) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
            ...notification,
            read: true,
          }
          : notification,
      ),
    );
  };


  if (
    [
      'login',
      'signup',
      'forgot-password',
    ].includes(activePage)
  ) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#e3e2e8] flex flex-col font-sans">
        <header className="h-14 bg-[#050505] border-b border-white/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
          <div
            onClick={() =>
              handleNavigate('landing')
            }
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-6 h-6 bg-white flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rotate-45" />
            </div>

            <div>
              <span className="font-mono text-sm font-bold tracking-widest text-white">
                ASEA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                handleNavigate('landing')
              }
              className="text-xs font-mono text-zinc-400 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
            >
              Overview
            </button>

            <button
              type="button"
              onClick={() =>
                handleNavigate('dashboard')
              }
              className="text-xs font-mono bg-white/10 border border-white/20 text-white hover:bg-white/20 px-3 py-1.5 uppercase font-bold transition-colors cursor-pointer"
            >
              Skip to Dashboard
            </button>
          </div>
        </header>

        <main className="flex-1 w-full flex flex-col">
          {activePage === 'login' && (
            <LoginPage
              onNavigate={handleNavigate}
              onAddToast={handleAddToast}
            />
          )}

          {activePage === 'signup' && (
            <SignupPage
              onNavigate={handleNavigate}
              onAddToast={handleAddToast}
            />
          )}

          {activePage === 'forgot-password' && (
            <ForgotPasswordPage
              onNavigate={handleNavigate}
              onAddToast={handleAddToast}
            />
          )}
        </main>

        <ToastContainer
          toasts={toasts}
          onDismiss={handleDismissToast}
        />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#0B0C10] text-[#e3e2e8] flex flex-col font-sans">
      <div className="flex-1 flex w-full">
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigate}
          activeProjectName={activeProject.name}
          className="hidden md:flex shrink-0 sticky top-0 h-screen"
        />

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-72 max-w-[80vw] h-full">
              <Sidebar
                activePage={activePage}
                onNavigate={handleNavigate}
                activeProjectName={activeProject.name}
                className="w-full h-full"
              />

              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="absolute top-4 right-[-44px] p-2 rounded-xl bg-[#191a21] border border-white/10 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              className="flex-1"
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
            />
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar
            activePage={activePage}
            onNavigate={handleNavigate}
            notifications={notifications}
            onMarkNotificationRead={
              handleMarkNotificationRead
            }
            projects={projects}
            activeProject={activeProject}
            onSelectProject={
              handleSelectProject
            }
            onOpenMobileMenu={() =>
              setIsMobileMenuOpen(true)
            }
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onAddToast={handleAddToast}
          />

          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full">
            {activePage === 'landing' && (
              <LandingPage
                onNavigate={handleNavigate}
              />
            )}

            {activePage === 'dashboard' && (
              <DashboardPage
                onNavigate={handleNavigate}
                projects={projects}
                activeProject={activeProject}
                onSelectProject={
                  handleSelectProject
                }
                onOpenProject={
                  handleOpenProject
                }
                agents={agents}
                activities={activities}
                onAddToast={handleAddToast}
              />
            )}

            {activePage === 'new-project' && (
              <NewProjectPage
                onNavigate={handleNavigate}
                onAddNewProject={
                  handleAddNewProject
                }
                onAddToast={handleAddToast}
              />
            )}

            {activePage === 'existing-project' && (
              <ExistingProjectPage
                onNavigate={handleNavigate}
                onAddImportedProject={
                  handleAddImportedProject
                }
                onAddToast={handleAddToast}
              />
            )}

            {activePage === 'project-details' && (
              <ProjectDetailsPage
                projectId={activeProject.id}
                onNavigate={handleNavigate}
              />
            )}

            {activePage === 'agents' && (
              <AgentsMonitoringPage
                agents={agents}
                onToggleAgentPause={
                  handleToggleAgentPause
                }
                onAddToast={handleAddToast}
              />
            )}

            {activePage === 'settings' && (
              <SettingsPage
                settings={settings}
                onSaveSettings={setSettings}
                onAddToast={handleAddToast}
              />
            )}
          </main>
        </div>
      </div>

      <BottomNav
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      <ToastContainer
        toasts={toasts}
        onDismiss={handleDismissToast}
      />
    </div>
  );
}


export default App;