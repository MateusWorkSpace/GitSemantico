import { GitHubCommit, GitHubRepo, GitHubUser } from "../types";

const GITHUB_API_BASE = 'https://api.github.com';

const makeRequest = async <T>(endpoint: string, token: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        },
    });

    if (!response.ok) {
        const errorBody = await response.json();
        console.error('GitHub API Error:', errorBody);
        throw new Error(`GitHub API request failed: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
};

export const getUser = (token: string): Promise<GitHubUser> => {
    return makeRequest<GitHubUser>('/user', token);
};

export const getRepos = (token: string): Promise<GitHubRepo[]> => {
    return makeRequest<GitHubRepo[]>('/user/repos?sort=updated&per_page=100', token);
};

export const getCommits = (token: string, repoFullName: string): Promise<GitHubCommit[]> => {
    return makeRequest<GitHubCommit[]>(`/repos/${repoFullName}/commits`, token);
};
