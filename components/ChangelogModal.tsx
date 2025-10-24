import React, { useMemo } from 'react';
import { Commit, CommitType } from '../types';

interface ChangelogModalProps {
  commits: Commit[];
  onClose: () => void;
}

const ChangelogSection: React.FC<{ title: string, commits: Commit[] }> = ({ title, commits }) => {
  if (commits.length === 0) return null;
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-300 border-b border-white/10 pb-2 mb-3">{title}</h3>
      <ul className="list-disc pl-5 space-y-2">
        {commits.map(commit => (
          <li key={commit.sha} className="text-gray-300">
            {commit.scope && <span className="font-bold text-purple-400">{commit.scope}: </span>}
            {commit.message} 
            <span className="text-gray-500 ml-2 font-mono">({commit.sha.substring(0, 7)})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChangelogModal: React.FC<ChangelogModalProps> = ({ commits, onClose }) => {
  
  const groupedCommits = useMemo(() => {
    const groups: { [key in CommitType]?: Commit[] } & { breaking?: Commit[] } = {};

    commits.forEach(commit => {
      if (commit.breaking) {
        if (!groups.breaking) groups.breaking = [];
        groups.breaking.push(commit);
      }
      
      if (!groups[commit.type]) {
        groups[commit.type] = [];
      }
      groups[commit.type]?.push(commit);
    });

    return groups;
  }, [commits]);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-gray-900 border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="p-4 border-b border-white/10 flex justify-between items-center flex-shrink-0">
          <h2 className="text-2xl font-bold text-white">Changelog Gerado</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </header>
        <main className="p-6 overflow-y-auto space-y-6">
            {groupedCommits.breaking && groupedCommits.breaking.length > 0 && (
                <div>
                     <h3 className="text-2xl font-bold text-red-400 border-b border-white/10 pb-2 mb-3">🚨 BREAKING CHANGES</h3>
                     <ul className="list-disc pl-5 space-y-2">
                        {groupedCommits.breaking.map(commit => (
                          <li key={commit.sha} className="text-gray-300">
                            {commit.scope && <span className="font-bold text-purple-400">{commit.scope}: </span>}
                            {commit.message} 
                            <span className="text-gray-500 ml-2 font-mono">({commit.sha.substring(0, 7)})</span>
                          </li>
                        ))}
                    </ul>
                </div>
            )}
            <ChangelogSection title="✨ Features" commits={groupedCommits.feat || []} />
            <ChangelogSection title="🐛 Bug Fixes" commits={groupedCommits.fix || []} />
            <ChangelogSection title="🚀 Performance Improvements" commits={groupedCommits.perf || []} />
            <ChangelogSection title="📝 Documentation" commits={groupedCommits.docs || []} />
            <ChangelogSection title="🔨 Refactors" commits={groupedCommits.refactor || []} />
            <ChangelogSection title="🔧 Chores" commits={groupedCommits.chore || []} />
            <ChangelogSection title="✅ Tests" commits={groupedCommits.test || []} />

        </main>
      </div>
    </div>
  );
};

export default ChangelogModal;