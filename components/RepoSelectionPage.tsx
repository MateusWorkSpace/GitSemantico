import React, { useState, useEffect } from 'react';
import GithubIcon from './icons/GithubIcon';
import { getRepos } from '../services/githubService';
import { GitHubRepo, GitHubUser } from '../types';

interface RepoSelectionPageProps {
  user: GitHubUser;
  token: string;
  onRepoSelect: (repoName: string) => void;
  onLogout: () => void;
}

const RepoCard: React.FC<{ repo: GitHubRepo; onSelect: () => void; }> = ({ repo, onSelect }) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-5 flex flex-col justify-between transition-transform hover:scale-105 hover:border-primary/50">
    <div>
      <div className="flex items-center mb-2">
        <span className="font-bold text-gray-300">{repo.name}</span>
        <span className="ml-3 border border-gray-600 text-gray-400 text-xs px-2 py-0.5 rounded-full">{repo.private ? 'Privado' : 'Público'}</span>
      </div>
      <p className="text-sm text-gray-400 h-10 overflow-hidden">{repo.description || 'Sem descrição.'}</p>
    </div>
    <button
      onClick={onSelect}
      className="mt-4 w-full bg-white/10 text-white font-semibold py-2 rounded-md hover:bg-primary/30 transition-colors"
    >
      Analisar
    </button>
  </div>
);

const RepoSelectionPage: React.FC<RepoSelectionPageProps> = ({ user, token, onRepoSelect, onLogout }) => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const userRepos = await getRepos(token);
        setRepos(userRepos);
      } catch (e) {
        setError('Falha ao carregar repositórios. Seu token pode ter expirado.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRepos();
  }, [token]);

  const filteredRepos = repos.filter(repo => repo.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <header className="max-w-4xl mx-auto flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
              <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full border-2 border-primary"/>
              <div>
                  <p className="text-gray-400 text-sm">Logado como</p>
                  <h1 className="text-xl font-bold text-white">{user.name || user.login}</h1>
              </div>
          </div>
          <button onClick={onLogout} className="text-gray-400 hover:text-white transition-colors text-sm font-semibold">
              Sair &rarr;
          </button>
      </header>

      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Selecione um Repositório</h2>
            <p className="text-gray-400 mt-2">Escolha um repositório para analisar e commitar.</p>
        </div>
        
        <div className="mb-6">
            <input 
                type="text"
                placeholder="Filtrar repositórios..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-4 py-2 text-white placeholder-gray-500 focus:ring-primary focus:border-primary"
            />
        </div>

        {isLoading && <div className="text-center py-10 text-gray-400">Carregando seus repositórios...</div>}
        {error && <div className="text-center py-10 text-red-400">{error}</div>}
        
        {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.length > 0 ? (
                    filteredRepos.map(repo => (
                        <RepoCard
                            key={repo.id}
                            repo={repo}
                            onSelect={() => onRepoSelect(repo.full_name)}
                        />
                    ))
                ) : (
                    <p className="md:col-span-2 lg:col-span-3 text-center py-10 text-gray-400">Nenhum repositório encontrado.</p>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default RepoSelectionPage;