import React, {
  useRef,
  useState,
} from 'react';

import {
  PageType,
  Project,
} from '../types';

import {
  Sparkles,
  Bot,
  Check,
  RefreshCw,
} from 'lucide-react';

import { createProject } from '../api/backend';


interface NewProjectPageProps {
  onNavigate: (page: PageType) => void;
  onAddNewProject: (project: Project) => void;
  onAddToast: (
    title: string,
    description?: string,
    type?: 'success' | 'info' | 'warning' | 'error',
  ) => void;
}


const stepsList = [
  {
    name: 'Planner Agent',
    detail:
      'Deconstructing user requirements into task DAGs...',
  },
  {
    name: 'Architect Agent',
    detail:
      'Designing database ERD & REST API contracts...',
  },
  {
    name: 'Coder Agent Swarm',
    detail:
      'Generating AST code files (128 tokens/sec)...',
  },
  {
    name: 'Tester Agent',
    detail:
      'Synthesizing PyTest test suites and verifying boundaries...',
  },
  {
    name: 'Deployer Agent',
    detail:
      'Building Cloud Run Docker container image...',
  },
];


export const NewProjectPage: React.FC<
  NewProjectPageProps
> = ({
  onNavigate,
  onAddNewProject,
  onAddToast,
}) => {
    const [projectName, setProjectName] =
      useState('Pulse-Analytics-SaaS');

    const [projectDescription, setProjectDescription] =
      useState(
        'Real-time data streaming dashboard with automated vector embeddings and auth management.',
      );

    const [selectedFrontend, setSelectedFrontend] =
      useState('React + Vite');

    const [selectedBackend, setSelectedBackend] =
      useState('FastAPI (Python)');

    const [selectedDatabase, setSelectedDatabase] =
      useState('PostgreSQL');

    const [features, setFeatures] = useState({
      auth: true,
      docker: true,
      pytest: true,
      websockets: true,
      vectorDb: false,
      geminiAi: true,
    });

    const [promptRequirements, setPromptRequirements] =
      useState(
        'Build a high-performance analytics platform with user authentication, real-time streaming telemetry, dark glassmorphism dashboard UI, and background worker threads for data aggregation.',
      );

    const [isGenerating, setIsGenerating] =
      useState(false);

    const [generationStep, setGenerationStep] =
      useState(0);

    const generationFinishedRef =
      useRef(false);


    const toggleFeature = (
      key: keyof typeof features,
    ) => {
      setFeatures((previous) => ({
        ...previous,
        [key]: !previous[key],
      }));
    };


    const handleStartGeneration = () => {
      if (!projectName.trim()) {
        onAddToast(
          'Missing Information',
          'Please enter a project name.',
          'warning',
        );

        return;
      }

      generationFinishedRef.current = false;

      setIsGenerating(true);
      setGenerationStep(0);

      const interval = window.setInterval(() => {
        setGenerationStep((previousStep) => {
          if (
            previousStep >= stepsList.length - 1
          ) {
            if (
              generationFinishedRef.current
            ) {
              return previousStep;
            }

            generationFinishedRef.current = true;
            window.clearInterval(interval);

            window.setTimeout(async () => {
              try {
                const createdProject =
                  await createProject(
                    projectName.trim(),
                    projectDescription.trim(),
                  );

                setIsGenerating(false);

                onAddNewProject(createdProject);

                onAddToast(
                  'Project Created Successfully!',
                  `${projectName.trim()} was saved to the ASEA backend.`,
                  'success',
                );

                onNavigate('project-details');
              } catch (error) {
                console.error(
                  'Failed to create project:',
                  error,
                );

                setIsGenerating(false);

                const errorMessage =
                  error instanceof Error
                    ? error.message
                    : 'The project could not be saved to the backend.';

                onAddToast(
                  'Project Creation Failed',
                  errorMessage,
                  'error',
                );
              }
            }, 800);

            return previousStep;
          }

          return previousStep + 1;
        });
      }, 1100);
    };


    return (
      <div className="max-w-5xl mx-auto space-y-8 pb-16">
        <div className="border-b border-white/10 pb-6 space-y-2">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-semibold">
            New Project Mode
          </h2>

          <h1 className="text-3xl font-light text-white tracking-tight">
            Generate{' '}
            <span className="italic font-serif">
              Software Project
            </span>
          </h1>

          <p className="text-xs text-zinc-400">
            Provide requirements and tech preferences.
            ASEA agents will synthesize full-stack
            source code, build schemas, and generate
            test suites.
          </p>
        </div>

        {!isGenerating ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section className="bg-[#050505] p-6 border border-white/10 space-y-4">
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  01. Basic Metadata
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Project Name
                    </label>

                    <input
                      type="text"
                      value={projectName}
                      onChange={(event) =>
                        setProjectName(event.target.value)
                      }
                      className="w-full px-4 py-2.5 bg-black border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-white/30"
                      placeholder="e.g. Acme-SaaS-Engine"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">
                      Description / Summary
                    </label>

                    <input
                      type="text"
                      value={projectDescription}
                      onChange={(event) =>
                        setProjectDescription(
                          event.target.value,
                        )
                      }
                      className="w-full px-4 py-2.5 bg-black border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                      placeholder="Brief objective of the application"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-[#050505] p-6 border border-white/10 space-y-4">
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  02. Architecture & Tech Stack
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1.5">
                      Frontend
                    </label>

                    <select
                      value={selectedFrontend}
                      onChange={(event) =>
                        setSelectedFrontend(
                          event.target.value,
                        )
                      }
                      className="w-full px-3 py-2 bg-black border border-white/10 text-xs font-mono text-white"
                    >
                      <option value="React + Vite">
                        React + Vite
                      </option>
                      <option value="Next.js (App Router)">
                        Next.js (App Router)
                      </option>
                      <option value="Vue 3 + Vite">
                        Vue 3 + Vite
                      </option>
                      <option value="SvelteKit">
                        SvelteKit
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1.5">
                      Backend API
                    </label>

                    <select
                      value={selectedBackend}
                      onChange={(event) =>
                        setSelectedBackend(
                          event.target.value,
                        )
                      }
                      className="w-full px-3 py-2 bg-black border border-white/10 text-xs font-mono text-white"
                    >
                      <option value="FastAPI (Python)">
                        FastAPI (Python)
                      </option>
                      <option value="Express (Node.js)">
                        Express (Node.js)
                      </option>
                      <option value="Go Fiber">
                        Go Fiber
                      </option>
                      <option value="Rust Axum">
                        Rust Axum
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-500 mb-1.5">
                      Database
                    </label>

                    <select
                      value={selectedDatabase}
                      onChange={(event) =>
                        setSelectedDatabase(
                          event.target.value,
                        )
                      }
                      className="w-full px-3 py-2 bg-black border border-white/10 text-xs font-mono text-white"
                    >
                      <option value="PostgreSQL">
                        PostgreSQL
                      </option>
                      <option value="Redis Cache">
                        Redis Cache
                      </option>
                      <option value="MongoDB">
                        MongoDB
                      </option>
                      <option value="SQLite">
                        SQLite
                      </option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="bg-[#050505] p-6 border border-white/10 space-y-4">
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  03. Module Capabilities
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    ['auth', 'OAuth & JWT Auth'],
                    ['docker', 'Docker & Compose'],
                    ['pytest', 'PyTest Suite'],
                    ['websockets', 'WebSockets'],
                    ['vectorDb', 'pgvector Index'],
                    ['geminiAi', 'Gemini AI API'],
                  ].map(([key, label]) => {
                    const featureKey =
                      key as keyof typeof features;

                    const isChecked =
                      features[featureKey];

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() =>
                          toggleFeature(featureKey)
                        }
                        className={`px-3 py-2.5 border text-xs font-mono text-left flex items-center justify-between ${isChecked
                          ? 'bg-white text-black font-bold border-white'
                          : 'bg-black border-white/10 text-zinc-400'
                          }`}
                      >
                        <span>{label}</span>

                        {isChecked && (
                          <Check className="w-3.5 h-3.5 text-black" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="bg-[#050505] p-6 border border-white/10 space-y-3">
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  04. Natural Language Requirements
                </h3>

                <textarea
                  value={promptRequirements}
                  onChange={(event) =>
                    setPromptRequirements(
                      event.target.value,
                    )
                  }
                  rows={5}
                  className="w-full p-4 bg-black border border-white/10 text-xs font-mono text-white leading-relaxed resize-none focus:outline-none"
                  placeholder="Detail business logic, API specs, database relationships, or special constraints..."
                />
              </section>
            </div>

            <div className="space-y-6">
              <section className="bg-[#050505] p-6 border border-white/10 space-y-4 sticky top-24">
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                  Generation Plan Summary
                </h3>

                <div className="space-y-3 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-zinc-500">
                      Project
                    </span>

                    <span className="text-white font-semibold">
                      {projectName}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-zinc-500">
                      Frontend
                    </span>

                    <span className="text-white">
                      {selectedFrontend}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-zinc-500">
                      Backend
                    </span>

                    <span className="text-white">
                      {selectedBackend}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-zinc-500">
                      Database
                    </span>

                    <span className="text-white">
                      {selectedDatabase}
                    </span>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-zinc-500">
                      Modules
                    </span>

                    <span className="text-white">
                      {
                        Object.values(features).filter(
                          Boolean,
                        ).length
                      }{' '}
                      Active
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-black border border-white/10 text-[11px] font-mono text-zinc-400 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold uppercase">
                    <Bot className="w-4 h-4 text-emerald-400" />

                    <span>
                      Swarm Execution Pipeline
                    </span>
                  </div>

                  <p className="leading-snug">
                    Planner, Architect, Coder, Tester,
                    and Deployer agents will run
                    concurrently to synthesize code.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleStartGeneration}
                  className="w-full bg-white text-black text-xs font-bold font-mono uppercase hover:bg-zinc-200 py-3.5 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Project</span>
                </button>
              </section>
            </div>
          </div>
        ) : (
          <section className="bg-[#050505] p-8 border border-white/10 space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />

                <span>
                  Synthesizing {projectName}...
                </span>
              </div>

              <h3 className="text-2xl font-light text-white">
                ASEA Agent Swarm Generating Code
              </h3>

              <p className="text-xs text-zinc-400 font-mono max-w-md mx-auto">
                Agents are building AST files, creating
                API schemas, and writing PyTest boundary
                test suites.
              </p>
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              {stepsList.map((step, index) => {
                const isDone =
                  index < generationStep;

                const isCurrent =
                  index === generationStep;

                return (
                  <div
                    key={step.name}
                    className={`p-4 border flex items-center justify-between gap-4 font-mono ${isCurrent
                      ? 'bg-zinc-950 border-white text-white'
                      : isDone
                        ? 'bg-black border-emerald-500/30 text-emerald-400'
                        : 'bg-black border-white/5 text-zinc-600'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 flex items-center justify-center text-xs border ${isDone
                          ? 'bg-emerald-500 text-black border-emerald-500 font-bold'
                          : isCurrent
                            ? 'bg-white text-black font-bold'
                            : 'border-white/10 text-zinc-600'
                          }`}
                      >
                        {isDone ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          index + 1
                        )}
                      </div>

                      <div>
                        <h4 className="text-xs font-bold uppercase">
                          {step.name}
                        </h4>

                        <p className="text-[11px] text-zinc-400">
                          {step.detail}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 border uppercase ${isDone
                        ? 'text-emerald-400 border-emerald-500/30'
                        : isCurrent
                          ? 'text-white border-white animate-pulse'
                          : 'text-zinc-600 border-white/5'
                        }`}
                    >
                      {isDone
                        ? 'COMPLETED'
                        : isCurrent
                          ? 'EXECUTING'
                          : 'QUEUED'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    );
  };