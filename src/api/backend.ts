import { Project } from '../types';

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL ||
    'http://127.0.0.1:8000';

const API_KEY =
    import.meta.env.VITE_ASEA_API_KEY ||
    'local-development-key';

interface BackendProject {
    id: string;
    name: string;
    description: string;
    status: string;
    created_at: string;
}

interface BackendProjectListResponse {
    projects: BackendProject[];
    count: number;
}

export interface ProjectFile {
    id: string;
    project_id: string;
    path: string;
    name: string;
    content: string;
    language?: string | null;
    created_at: string;
    updated_at: string;
}

interface ProjectFileListResponse {
    files: ProjectFile[];
    count: number;
}

export interface ProjectBug {
    id: string;
    project_id: string;
    file_id: string;
    file_path: string;
    title: string;
    message: string;
    severity: string;
    line?: number | null;
    column?: number | null;
    status: string;
    created_at: string;
    updated_at: string;
}

interface ProjectBugListResponse {
    bugs: ProjectBug[];
    count: number;
}

type DiagnosticsResponse =
    | ProjectBug[]
    | ProjectBugListResponse;

export interface ProjectGenerationResponse {
    project_id: string;
    status: string;
    files_created: number;
    message: string;
}

export interface ProjectTestResponse {
    project_id: string;
    status: 'passed' | 'failed';
    passed: number;
    failed: number;
    skipped: number;
    output: string;
}

export interface ProjectTestHistory {
    id: string;
    project_id: string;
    status: 'passed' | 'failed';
    passed: number;
    failed: number;
    skipped: number;
    output: string;
    created_at: string;
}

export interface ProjectTestHistoryListResponse {
    history: ProjectTestHistory[];
    count: number;
}

function mapProjectStatus(
    status: string,
): Project['status'] {
    switch (status) {
        case 'created':
            return 'idle';

        case 'in_progress':
            return 'building';

        case 'completed':
            return 'completed';

        case 'failed':
            return 'failed';

        default:
            return 'idle';
    }
}

function mapBackendProject(
    project: BackendProject,
): Project {
    return {
        id: project.id,
        name: project.name,
        description: project.description,
        type: 'new',
        techStack: [],
        status: mapProjectStatus(project.status),
        buildStatus:
            project.status === 'completed'
                ? 'passing'
                : project.status === 'failed'
                    ? 'failing'
                    : 'running',
        testCoverage: 0,
        openIssuesCount: 0,
        lastCommitTime: project.created_at,
        lastCommitMessage: 'Project created',
        environment: 'development',
        version: '0.1.0',
        uptime: 'Not deployed',
    };
}

async function request<T>(
    path: string,
    options: RequestInit = {},
): Promise<T> {
    const response = await fetch(
        `${API_BASE_URL}${path}`,
        {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': API_KEY,
                ...(options.headers || {}),
            },
        },
    );

    if (!response.ok) {
        const errorText = await response.text();

        let errorMessage =
            `Backend request failed with status ${response.status}`;

        try {
            const errorData = JSON.parse(errorText);

            if (errorData.detail) {
                errorMessage = errorData.detail;
            } else if (errorData.message) {
                errorMessage = errorData.message;
            }
        } catch {
            if (errorText) {
                errorMessage = errorText;
            }
        }

        throw new Error(errorMessage);
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

export async function getProjects(): Promise<Project[]> {
    const response =
        await request<BackendProjectListResponse>(
            '/projects/',
        );

    return response.projects.map(
        mapBackendProject,
    );
}

export async function getProject(
    projectId: string,
): Promise<Project> {
    const response =
        await request<BackendProject>(
            `/projects/${projectId}`,
        );

    return mapBackendProject(response);
}

export async function createProject(
    name: string,
    description: string,
): Promise<Project> {
    const response =
        await request<BackendProject>(
            '/projects/',
            {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    description,
                }),
            },
        );

    return mapBackendProject(response);
}

export async function deleteProject(
    projectId: string,
): Promise<void> {
    await request<void>(
        `/projects/${projectId}`,
        {
            method: 'DELETE',
        },
    );
}

export async function generateProject(
    projectId: string,
): Promise<ProjectGenerationResponse> {
    return request<ProjectGenerationResponse>(
        `/projects/${projectId}/generate`,
        {
            method: 'POST',
        },
    );
}

export async function runProjectTests(
    projectId: string,
): Promise<ProjectTestResponse> {
    return request<ProjectTestResponse>(
        `/projects/${projectId}/tests`,
        {
            method: 'POST',
        },
    );
}

export async function getProjectTestHistory(
    projectId: string,
): Promise<ProjectTestHistory[]> {
    const response =
        await request<ProjectTestHistoryListResponse>(
            `/projects/${projectId}/test-history`,
        );

    return response.history;
}

export async function getProjectFiles(
    projectId: string,
): Promise<ProjectFile[]> {
    const response =
        await request<ProjectFileListResponse>(
            `/projects/${projectId}/files`,
        );

    return response.files;
}

export async function createProjectFile(
    projectId: string,
    path: string,
    content: string,
    language?: string,
): Promise<ProjectFile> {
    return request<ProjectFile>(
        `/projects/${projectId}/files`,
        {
            method: 'POST',
            body: JSON.stringify({
                path,
                content,
                language,
            }),
        },
    );
}

export async function updateProjectFile(
    projectId: string,
    fileId: string,
    updates: {
        path?: string;
        content?: string;
        language?: string;
    },
): Promise<ProjectFile> {
    return request<ProjectFile>(
        `/projects/${projectId}/files/${fileId}`,
        {
            method: 'PUT',
            body: JSON.stringify(updates),
        },
    );
}

export async function deleteProjectFile(
    projectId: string,
    fileId: string,
): Promise<void> {
    await request<void>(
        `/projects/${projectId}/files/${fileId}`,
        {
            method: 'DELETE',
        },
    );
}

export async function runProjectDiagnostics(
    projectId: string,
): Promise<ProjectBug[]> {
    const response =
        await request<DiagnosticsResponse>(
            `/projects/${projectId}/diagnostics`,
            {
                method: 'POST',
            },
        );

    if (Array.isArray(response)) {
        return response;
    }

    return response.bugs;
}

export async function getProjectBugs(
    projectId: string,
): Promise<ProjectBug[]> {
    const response =
        await request<ProjectBugListResponse>(
            `/projects/${projectId}/bugs`,
        );

    return response.bugs;
}