import React, { useState, useCallback } from 'react';
import { CommitType, AIGeneratedCommit } from '../types';
import { COMMIT_TYPE_DETAILS } from '../constants';
import { suggestCommitDetails } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

interface CommandOutputProps {
    command: string;
    onClose: () => void;
}

const CommandOutput: React.FC<CommandOutputProps> = ({ command, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-[#666666]/30">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-semibold text-gray-300">Comando para seu terminal:</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-white">&times;</button>
            </div>
            <div className="relative bg-gray-800 rounded-md p-3 font-mono text-gray-200 text-sm break-words">
                <code>{command}</code>
                <button onClick={handleCopy} className="absolute top-2 right-2 text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20">
                    {copied ? 'Copiado!' : 'Copiar'}
                </button>
            </div>
        </div>
    );
};


const CommitForm: React.FC<{repoName: string}> = ({ repoName }) => {
  const [type, setType] = useState<CommitType>(CommitType.FEAT);
  const [scope, setScope] = useState('');
  const [message, setMessage] = useState('');
  const [breaking, setBreaking] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [error, setError] = useState('');
  const [generatedCommand, setGeneratedCommand] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('A mensagem do commit não pode estar vazia.');
      return;
    }
    setError('');

    const scopePart = scope.trim() ? `(${scope.trim()})` : '';
    const breakingPart = breaking ? '!' : '';
    const fullMessage = `${type}${scopePart}${breakingPart}: ${message.trim()}`;
    const command = `git commit -m "${fullMessage}"`;
    setGeneratedCommand(command);
  };

  const handleSuggestion = useCallback(async () => {
    if (!message.trim()) {
      setError('Escreva uma mensagem de commit antes de pedir uma sugestão.');
      return;
    }
    setIsSuggesting(true);
    setError('');
    setGeneratedCommand(null);
    try {
      const suggestion: AIGeneratedCommit = await suggestCommitDetails(message);
      if (suggestion.type && Object.values(CommitType).includes(suggestion.type)) {
          setType(suggestion.type);
      }
      setScope(suggestion.scope || '');
      setMessage(suggestion.message || message);
    } catch (e) {
      console.error(e);
      setError('Não foi possível obter a sugestão da IA. Tente novamente.');
    } finally {
      setIsSuggesting(false);
    }
  }, [message]);

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Criar Commit Semântico</h2>
      <p className="text-sm text-gray-400 mb-4">Use o formulário para gerar o comando de commit. Como esta é uma aplicação web, ela não pode executar comandos git diretamente. Copie o comando gerado e cole no seu terminal local, dentro da pasta do repositório <strong>{repoName}</strong>.</p>
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="commit-type" className="block text-sm font-medium text-gray-300 mb-1">--type</label>
            <select id="commit-type" value={type} onChange={e => setType(e.target.value as CommitType)} className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-[#666666] focus:border-[#666666]">
              {Object.values(CommitType).map(t => (
                <option key={t} value={t}>{COMMIT_TYPE_DETAILS[t].label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="commit-scope" className="block text-sm font-medium text-gray-300 mb-1">--scope <span className="text-gray-500">(opcional)</span></label>
            <input type="text" id="commit-scope" value={scope} onChange={e => setScope(e.target.value)} placeholder="ex: api, auth" className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-[#666666] focus:border-[#666666]"/>
          </div>
           <div className="md:col-span-1 flex items-end">
             <div className="flex items-center h-full pb-2">
                <input id="breaking-change" type="checkbox" checked={breaking} onChange={e => setBreaking(e.target.checked)} className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-[#666666] focus:ring-[#555555]" />
                <label htmlFor="breaking-change" className="ml-2 block text-sm font-medium text-gray-300">--breaking-change (!)</label>
             </div>
           </div>
        </div>
        <div>
          <label htmlFor="commit-message" className="block text-sm font-medium text-gray-300 mb-1">--message</label>
          <div className="relative">
            <textarea id="commit-message" value={message} onChange={e => {setMessage(e.target.value); setGeneratedCommand(null);}} rows={3} placeholder="Descreva suas mudanças..." className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-[#666666] focus:border-[#666666] resize-none"></textarea>
            <button
                type="button"
                onClick={handleSuggestion}
                disabled={isSuggesting || !message}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2 py-1 bg-[#666666]/20 text-gray-300 text-xs font-semibold rounded-md hover:bg-[#666666]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <SparklesIcon className={`w-4 h-4 ${isSuggesting ? 'animate-spin' : ''}`} />
              {isSuggesting ? 'Sugerindo...' : 'Sugerir com IA'}
            </button>
          </div>
        </div>
        <div className="text-right">
          <button type="submit" className="px-6 py-2 bg-[#666666] text-gray-100 font-bold rounded-md hover:bg-[#555555] transition-colors transform hover:scale-105">Gerar Comando</button>
        </div>
      </form>
      {generatedCommand && <CommandOutput command={generatedCommand} onClose={() => setGeneratedCommand(null)} />}
    </div>
  );
};

export default CommitForm;