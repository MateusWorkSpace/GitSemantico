import React, { useState, useCallback } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import RepoSelectionPage from './components/RepoSelectionPage';
import AuthModal from './components/AuthModal';
import { getUser } from './services/githubService';
import { GitHubUser } from './types';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleLogin = useCallback(async (newToken: string) => {
    const githubUser = await getUser(newToken);
    setUser(githubUser);
    setToken(newToken);
    setAuthModalOpen(false);
  }, []);
  
  const handleLogout = () => {
      setToken(null);
      setUser(null);
      setSelectedRepo('');
  };

  const handleRepoSelect = (repoName: string) => {
    setSelectedRepo(repoName);
  };
  
  const handleBackToRepoSelection = () => {
    setSelectedRepo('');
  };

  const renderView = () => {
    if (!token || !user) {
        return (
            <>
                <LandingPage onLogin={() => setAuthModalOpen(true)} />
                {isAuthModalOpen && <AuthModal onLogin={handleLogin} onClose={() => setAuthModalOpen(false)} />}
            </>
        );
    }

    if (!selectedRepo) {
        return <RepoSelectionPage user={user} token={token} onRepoSelect={handleRepoSelect} onLogout={handleLogout} />;
    }

    return <Dashboard repoName={selectedRepo} token={token} onBack={handleBackToRepoSelection} user={user} />;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-900 to-slate-800 font-sans flex flex-col">
      <main className="flex-grow">
        {renderView()}
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        desenvolvido por Mateus Dang
      </footer>
    </div>
  );
};

export default App;