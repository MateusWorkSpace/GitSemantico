import React from 'react';
import { Commit } from '../types';
import { COMMIT_TYPE_DETAILS } from '../constants';

// Um avatar de fallback simples
const DefaultAvatar: React.FC<{ name: string }> = ({ name }) => (
    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-300">
        {name.charAt(0).toUpperCase()}
    </div>
);

const CommitItem: React.FC<{ commit: Commit }> = ({ commit }) => {
  const typeDetails = COMMIT_TYPE_DETAILS[commit.type];

  return (
    <li className="flex items-start space-x-4 p-4 hover:bg-white/5 rounded-lg transition-colors">
      <div className="flex-shrink-0 mt-1">
        {commit.authorAvatarUrl ? (
            <img src={commit.authorAvatarUrl} alt={commit.author} className="w-8 h-8 rounded-full" />
        ) : (
            <DefaultAvatar name={commit.author} />
        )}
      </div>
      <div className="flex-grow">
        <div className="flex flex-wrap items-baseline gap-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeDetails.color}`}>
              {commit.type}
            </span>
            {commit.scope && (
              <span className="text-purple-400 font-semibold">({commit.scope})</span>
            )}
            <span className="text-gray-100">{commit.message}</span>
            {commit.breaking && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/20 text-red-300">
                BREAKING CHANGE
              </span>
            )}
        </div>
        <div className="text-sm text-gray-400 mt-1">
          <span className="font-semibold text-gray-300">{commit.author}</span> commitou <span className="font-mono text-gray-200">{commit.sha.substring(0, 7)}</span> - {commit.timestamp}
        </div>
      </div>
    </li>
  );
};

// FIX: Define CommitListProps interface for the component's props.
interface CommitListProps {
  commits: Commit[];
}

const CommitList: React.FC<CommitListProps> = ({ commits }) => {
  if (commits.length === 0) {
    return <div className="text-center py-10 text-gray-400">Nenhum commit encontrado para os filtros selecionados.</div>
  }

  return (
    <ul className="divide-y divide-white/10">
      {commits.map((commit) => (
        <CommitItem key={commit.sha} commit={commit} />
      ))}
    </ul>
  );
};

export default CommitList;