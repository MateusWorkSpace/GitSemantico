import React, { useState, useMemo, useEffect } from 'react';
import { Commit, CommitType, GitHubUser } from '../types';
import { COMMIT_TYPE_DETAILS } from '../constants';
import CommitList from './CommitList';
import CommitForm from './CommitForm';
import ChangelogModal from './ChangelogModal';
import Header from './Header';
import { getCommits } from '../services/githubService';
import { parseConventionalCommit } from '../utils/commitParser';

interface DashboardProps {
  repoName: string;
  token: string;
  user: GitHubUser;
  onBack: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ repoName, token, user, onBack }) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterScope, setFilterScope] = useState<string>('');
  const [isChangelogVisible, setChangelogVisible] = useState(false);

  useEffect(() => {
    const fetchCommits = async () => {
        setIsLoading(true);
        setError('');
        try {
            const apiCommits = await getCommits(token, repoName);
            const parsedCommits = apiCommits.map(c => {
                const parsed = parseConventionalCommit(c.commit.message);
                return {
                    sha: c.sha,
                    type: parsed.type,
                    scope: parsed.scope,
                    message: parsed.message,
                    breaking: parsed.breaking,
                    author: c.author?.login || c.commit.author.name,
                    authorAvatarUrl: c.author?.avatar_url,
                    timestamp: new Date(c.commit.author.date).toLocaleString(),
                };
            });
            setCommits(parsedCommits);
        } catch (e) {
            setError('Não foi possível carregar os commits. Verifique se o repositório não está vazio.');
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    fetchCommits();
  }, [repoName, token]);

  const filteredCommits = useMemo(() => {
    return commits.filter(commit => {
      const typeMatch = filterType === '' || filterType === 'all' || commit.type === filterType;
      const scopeMatch = filterScope === '' || filterScope === 'all' || (commit.scope && commit.scope.toLowerCase().includes(filterScope.toLowerCase()));
      return typeMatch && scopeMatch;
    }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [commits, filterType, filterScope]);
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <Header repoName={repoName} onBack={onBack} user={user} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <CommitForm repoName={repoName} />
        
        <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white">Histórico de Commits</h2>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <label htmlFor="type-filter" className="text-sm font-medium text-gray-400">Tipo:</label>
                <select id="type-filter" value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-gray-700/50 border border-gray-600 rounded-md px-2 py-1 text-sm text-white focus:ring-[#666666] focus:border-[#666666]">
                  <option value="all">todos</option>
                  {Object.values(CommitType).map(type => (
                    <option key={type} value={type}>{COMMIT_TYPE_DETAILS[type].label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="scope-filter" className="text-sm font-medium text-gray-400">Escopo:</label>
                <input
                  id="scope-filter"
                  type="text"
                  placeholder="ex: auth"
                  value={filterScope}
                  onChange={e => setFilterScope(e.target.value)}
                  className="bg-gray-700/50 border border-gray-600 rounded-md px-2 py-1 text-sm text-white focus:ring-[#666666] focus:border-[#666666] w-24"
                />
              </div>
              <button
                onClick={() => setChangelogVisible(true)}
                className="px-4 py-1.5 bg-[#666666]/20 text-gray-300 rounded-md text-sm font-semibold hover:bg-[#666666]/30 transition-colors"
              >
                Gerar Changelog
              </button>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 mb-4 font-mono">
            <span className="text-green-400">$</span> git log --type={filterType || '*'} --scope={filterScope || '*'}
          </p>

          {isLoading ? (
            <p className="text-center py-10 text-gray-400">Carregando commits...</p>
          ) : error ? (
            <p className="text-center py-10 text-red-400">{error}</p>
          ) : (
            <CommitList commits={filteredCommits} />
          )}
        </div>
      </main>
      
      {isChangelogVisible && (
        <ChangelogModal commits={filteredCommits} onClose={() => setChangelogVisible(false)} />
      )}
    </div>
  );
};

export default Dashboard;