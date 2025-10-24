export enum CommitType {
  FEAT = 'feat',
  FIX = 'fix',
  CHORE = 'chore',
  DOCS = 'docs',
  STYLE = 'style',
  REFACTOR = 'refactor',
  PERF = 'perf',
  TEST = 'test',
  BUILD = 'build',
  CI = 'ci',
}

// Nossa representação interna de um commit, pós-análise
export interface Commit {
  sha: string;
  type: CommitType;
  scope?: string;
  message: string;
  breaking: boolean;
  author: string;
  authorAvatarUrl?: string;
  timestamp: string;
}

export interface AIGeneratedCommit {
    type: CommitType;
    scope: string;
    message: string;
}

// Tipos para as respostas brutas da API do GitHub

export interface GitHubUser {
    login: string;
    avatar_url: string;
    name: string;
}

export interface GitHubRepo {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    description: string | null;
}

export interface GitHubCommit {
    sha: string;
    commit: {
        author: {
            name: string;
            date: string;
        };
        message: string;
    };
    author: {
        login: string;
        avatar_url: string;
    } | null; // O autor pode ser nulo se não for um usuário do GitHub
}
