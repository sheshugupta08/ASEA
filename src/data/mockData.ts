import { Project, Agent, FileNode, TestResult, BugIssue, ActivityItem, NotificationItem, UserSettings } from '../types';

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Nexus-Core-Service',
    description: 'High-throughput microservice handling streaming data pipelines and async auth validation.',
    type: 'imported',
    source: 'github',
    sourceUrl: 'https://github.com/enterprise/nexus-core-service',
    techStack: ['Python', 'TypeScript', 'FastAPI', 'Redis', 'Docker'],
    status: 'active',
    buildStatus: 'passing',
    testCoverage: 94,
    openIssuesCount: 2,
    lastCommitTime: '2m ago',
    lastCommitMessage: 'Refactored auth stream exception handler and added token validation tests.',
    environment: 'production',
    version: 'v2.4.1-alpha',
    uptime: '14d 2h 45m',
  },
  {
    id: 'proj-2',
    name: 'Project Alpha',
    description: 'Autonomous React & Express web platform with distributed state synchronization.',
    type: 'new',
    techStack: ['React', 'TypeScript', 'Node.js', 'TailwindCSS'],
    status: 'building',
    buildStatus: 'passing',
    testCoverage: 88,
    openIssuesCount: 1,
    lastCommitTime: '15m ago',
    lastCommitMessage: 'Core infrastructure migration v2 complete.',
    environment: 'staging',
    version: 'v1.0.8',
    uptime: '3d 11h',
  },
  {
    id: 'proj-3',
    name: 'Asea-ML-Scraper',
    description: 'Autonomous data scraper and embedding vectorizer with proxy rotation.',
    type: 'imported',
    source: 'zip',
    techStack: ['Python', 'Rust', 'PostgreSQL'],
    status: 'idle',
    buildStatus: 'failing',
    testCoverage: 76,
    openIssuesCount: 4,
    lastCommitTime: '2h ago',
    lastCommitMessage: 'Fix proxy socket timeout in worker node 4.',
    environment: 'development',
    version: 'v0.9.2',
    uptime: '0m',
  }
];

export const mockAgents: Agent[] = [
  {
    id: 'agent-1',
    name: 'Planner Agent',
    role: 'planner',
    status: 'active',
    currentTask: 'Analyzing feature request #402. Deconstructing authentication flow into micro-tasks.',
    cpuUsage: 42,
    ramUsage: '18K',
    ramMax: '32K',
    tasksCompleted: 14,
    tasksTotal: 18,
    lastActive: 'Just now',
    avatarIcon: 'architecture',
    logs: [
      '[11:02:45] Parsing high-level prompt: Add OAuth token refresh fallback mechanism.',
      '[11:02:47] Extracted 4 atomic sub-tasks for Architect and Coder agents.',
      '[11:02:50] Synthesizing execution DAG graph...'
    ]
  },
  {
    id: 'agent-2',
    name: 'Architect Agent',
    role: 'architect',
    status: 'reasoning',
    currentTask: 'Designing database schema migration for user roles & evaluating SQL vs Redis latency.',
    cpuUsage: 89,
    ramUsage: '28K',
    ramMax: '32K',
    tasksCompleted: 8,
    tasksTotal: 10,
    lastActive: '1m ago',
    avatarIcon: 'account_tree',
    logs: [
      '[11:03:01] Evaluating Redis cache invalidation strategy vs PostgreSQL triggers.',
      '[11:03:15] Recommending dual-write cache pattern with 300s TTL.',
      '[11:03:22] Generating API contract interfaces in TypeScript.'
    ]
  },
  {
    id: 'agent-3',
    name: 'Coder Agent Swarm',
    role: 'coder',
    status: 'generating',
    currentTask: 'Writing JWT validation logic & exception handling in src/data_processor.py.',
    cpuUsage: 65,
    ramUsage: '22K',
    ramMax: '32K',
    tokenRate: 128,
    tasksCompleted: 32,
    tasksTotal: 40,
    lastActive: 'Just now',
    avatarIcon: 'code',
    logs: [
      '[11:04:10] Generating AST for data_processor.py...',
      '[11:04:18] Refactored try-except block to catch specific CancelledError.',
      '[11:04:25] Stream pipeline transformation generated (128 tokens/sec).'
    ]
  },
  {
    id: 'agent-4',
    name: 'Tester Agent',
    role: 'tester',
    status: 'active',
    currentTask: 'Running parallel pytest suite and verifying boundary conditions for stream chunking.',
    cpuUsage: 35,
    ramUsage: '12K',
    ramMax: '32K',
    tasksCompleted: 45,
    tasksTotal: 48,
    lastActive: '2m ago',
    avatarIcon: 'fact_check',
    logs: [
      '[11:04:40] Executed 48 unit tests across auth and data modules.',
      '[11:04:52] 46 Passed, 2 Failed in edge-case stream timeout.',
      '[11:05:00] Generated coverage report: 94% coverage.'
    ]
  },
  {
    id: 'agent-5',
    name: 'Debugger Agent',
    role: 'debugger',
    status: 'reasoning',
    currentTask: 'Tracing stack trace for memory leak on chunk processing line 22.',
    cpuUsage: 78,
    ramUsage: '24K',
    ramMax: '32K',
    tasksCompleted: 19,
    tasksTotal: 22,
    lastActive: '3m ago',
    avatarIcon: 'bug_report',
    logs: [
      '[11:03:30] Detected unhandled Exception in async generator yield loop.',
      '[11:03:45] Isolated heap leak: unclosed connection socket on timeout.',
      '[11:04:00] Formulated automated patch PR #128.'
    ]
  },
  {
    id: 'agent-6',
    name: 'Reviewer Agent',
    role: 'reviewer',
    status: 'idle',
    currentTask: 'Awaiting pull request submission to perform automated security audit and linting.',
    cpuUsage: 0,
    ramUsage: '0K',
    ramMax: '32K',
    tasksCompleted: 60,
    tasksTotal: 60,
    lastActive: '10m ago',
    avatarIcon: 'verified_user',
    logs: [
      '[10:52:10] Approved PR #126 - Zero vulnerabilities detected.',
      '[10:52:15] Code style compliance: 100% (Black & ESLint).'
    ]
  }
];

export const mockFileTree: FileNode[] = [
  {
    id: 'f-src',
    name: 'src',
    type: 'folder',
    path: 'src',
    children: [
      {
        id: 'f-api-gw',
        name: 'api_gateway.py',
        type: 'file',
        path: 'src/api_gateway.py',
        language: 'python',
        content: `import asyncio
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

app = FastAPI(title="ASEA Gateway API", version="2.4.0")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "agent_engine": "online", "nodes": 12}

@app.post("/api/v1/process-stream")
async def process_stream_endpoint(payload: dict, token: str = Depends(oauth2_scheme)):
    if not token:
        raise HTTPException(status_code=401, detail="Invalid token")
    # Delegated to data_processor
    return {"status": "processing", "job_id": "job_99812"}
`
      },
      {
        id: 'f-auth-svc',
        name: 'auth_service.py',
        type: 'file',
        path: 'src/auth_service.py',
        language: 'python',
        content: `import time
import jwt

SECRET_KEY = "asea-production-secret-key-do-not-expose"
ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: int = 3600):
    to_encode = data.copy()
    expire = time.time() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None
`
      },
      {
        id: 'f-data-proc',
        name: 'data_processor.py',
        type: 'file',
        path: 'src/data_processor.py',
        language: 'python',
        hasBug: true,
        content: `import asyncio
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class DataProcessor:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.pipeline_state = "INITIALIZED"

    async def process_stream(self, data_stream):
        """
        Asynchronously processes incoming data streams.
        Applies transformations based on loaded config.
        """
        try:
            async for chunk in data_stream:
                processed_chunk = await self._apply_transforms(chunk)
                yield processed_chunk
        except Exception as e:
            # BUG DETECTED: Uncaught generic Exception suppresses async cancellation!
            logger.error(f"Stream processing failed: {e}")
            raise e

    async def _apply_transforms(self, data: Dict) -> Dict:
        # Apply complex mathematical transformations
        return {k: v * 2 for k, v in data.items()}
`
      }
    ]
  },
  {
    id: 'f-tests',
    name: 'tests',
    type: 'folder',
    path: 'tests',
    children: [
      {
        id: 'f-test-auth',
        name: 'test_auth.py',
        type: 'file',
        path: 'tests/test_auth.py',
        language: 'python',
        content: `import pytest
from src.auth_service import create_access_token, verify_token

def test_token_creation_and_verification():
    token = create_access_token({"sub": "user_123"})
    payload = verify_token(token)
    assert payload["sub"] == "user_123"

def test_token_expiry_timeout():
    # Boundary test for expired tokens
    token = create_access_token({"sub": "user_123"}, expires_delta=-10)
    payload = verify_token(token)
    assert payload is None
`
      }
    ]
  },
  {
    id: 'f-pkg',
    name: 'package.json',
    type: 'file',
    path: 'package.json',
    language: 'json',
    content: `{
  "name": "nexus-core-service",
  "version": "2.4.1",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run"
  }
}`
  }
];

export const mockTestResults: TestResult[] = [
  { id: 't-1', name: 'test_token_creation_and_verification', durationMs: 12, status: 'passed' },
  { id: 't-2', name: 'test_data_stream_transformation_chunking', durationMs: 45, status: 'passed' },
  { id: 't-3', name: 'test_auth_token_expiry_timeout', durationMs: 1800, status: 'failed', errorMessage: 'TimeoutError: Token refresh callback failed after 1500ms' },
  { id: 't-4', name: 'test_ui_rendering_pipeline', durationMs: 8, status: 'passed' },
  { id: 't-5', name: 'test_redis_cache_invalidation_trigger', durationMs: 24, status: 'passed' }
];

export const mockBugIssues: BugIssue[] = [
  {
    id: 'ISS-842',
    title: 'Unhandled Exception in Async Stream Processing',
    description: 'Catching generic Exception in data_processor.py line 20 catches asyncio.CancelledError, resulting in dangling memory leaks on stream disconnect.',
    severity: 'high',
    file: 'src/data_processor.py',
    line: 20,
    status: 'open',
    assignedTo: 'Debugger Agent',
    suggestedFix: 'Replace `except Exception as e:` with `except (ValueError, KeyError) as e:` and catch `asyncio.CancelledError` separately to close stream cleanly.'
  },
  {
    id: 'ISS-839',
    title: 'Auth Token Expiry Overlap Under High Concurrency',
    description: 'When 500+ requests hit verify_token simultaneously upon expiry, lock contention delays token refresh.',
    severity: 'medium',
    file: 'src/auth_service.py',
    line: 14,
    status: 'open',
    assignedTo: 'Architect Agent',
    suggestedFix: 'Introduce distributed Mutex via Redis SETNX for token refresh calls.'
  }
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Agent-Omega committed fix for PR #128',
    subtitle: 'Project: Nexus-Core-Service',
    type: 'commit',
    timestamp: '2m ago',
    agentName: 'Coder Agent',
    codeSnippet: '#a7b8c9d - Refactored exception handling in data_processor.py'
  },
  {
    id: 'act-2',
    title: 'Debugger Agent isolated memory anomaly',
    subtitle: 'Memory leak traced to dangling Redis socket connection in Node-44',
    type: 'bug',
    timestamp: '15m ago',
    agentName: 'Debugger Agent'
  },
  {
    id: 'act-3',
    title: 'Automated PyTest suite complete',
    subtitle: '46 Passed, 1 Failed, 1 Skipped across 3 test suites',
    type: 'build',
    timestamp: '28m ago',
    agentName: 'Tester Agent'
  },
  {
    id: 'act-4',
    title: 'Production Build v2.4.1 deployed to Cloud Run',
    subtitle: 'Service URL: https://nexus-core.internal.asea.dev',
    type: 'deploy',
    timestamp: '1h ago',
    agentName: 'Deployer Agent'
  },
  {
    id: 'act-5',
    title: 'Database schema vector index synchronized',
    subtitle: 'Indexed 14,023 code AST nodes in pgvector',
    type: 'sync',
    timestamp: '2h ago',
    agentName: 'Architect Agent'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Build Pipeline Succeeded',
    message: 'Nexus-Core-Service v2.4.1 was successfully compiled and verified.',
    time: '2m ago',
    read: false,
    type: 'success'
  },
  {
    id: 'n-2',
    title: 'High CPU Load Alert',
    message: 'Architect Agent CPU utilization reached 89% during vector indexing.',
    time: '15m ago',
    read: false,
    type: 'warning'
  },
  {
    id: 'n-3',
    title: '1 Test Failure Detected',
    message: 'test_auth_token_expiry_timeout failed in tests/test_auth.py.',
    time: '30m ago',
    read: true,
    type: 'error'
  }
];

export const initialUserSettings: UserSettings = {
  name: 'Alex Vance',
  email: 'alex.vance@asea.dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
  theme: 'dark',
  pushNotifications: true,
  emailAlerts: true,
  autoFixes: true,
  inlineSuggestions: true,
  telemetrySharing: false,
  geminiApiKey: '••••••••••••••••••••••••••••3a81',
  githubToken: 'ghp_••••••••••••••••••••••••••••8912',
  databaseUri: 'postgresql://asea_admin:••••••••@cluster.us-east-1.rds.amazonaws.com:5432/asea_db',
  dbType: 'postgresql'
};
