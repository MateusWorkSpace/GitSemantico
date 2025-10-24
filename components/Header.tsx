import React from 'react';
import GitCommitIcon from './icons/GitCommitIcon';
import { GitHubUser } from '../types';

interface HeaderProps {
    repoName: string;
    onBack: () => void;
    user: GitHubUser;
}

const Header: React.FC<HeaderProps> = ({ repoName, onBack, user }) => {
  return (
    <header className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <button onClick={onBack} className="mr-4 text-gray-400 hover:text-white transition-colors" aria-label="Voltar para seleção de repositório">
                &larr; Seleção de Repositório
             </button>
            <GitCommitIcon className="h-8 w-8 text-gray-200" />
            <span className="ml-3 text-2xl font-bold text-white hidden sm:inline">
              Git <span className="text-gray-200">Semântico</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300 font-mono bg-gray-700/50 px-3 py-1.5 rounded-md"><span className="font-bold text-white">{repoName}</span></span>
            <img src={user.avatar_url} alt={user.login} className="w-8 h-8 rounded-full border border-gray-600"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;