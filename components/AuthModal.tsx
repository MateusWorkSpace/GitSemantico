import React, { useState } from 'react';

interface AuthModalProps {
  onLogin: (token: string) => Promise<void>;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onLogin, onClose }) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
        setError('Por favor, insira um token.');
        return;
    }
    setIsLoading(true);
    setError('');
    try {
        await onLogin(token);
        // Em caso de sucesso, o componente pai fechará o modal
    } catch (err) {
        setError('Token inválido ou ocorreu um erro. Verifique o token e as permissões.');
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div 
            className="bg-gray-800 border border-white/20 rounded-2xl shadow-2xl w-full max-w-md"
            onClick={e => e.stopPropagation()}
        >
            <header className="p-4 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Autenticação com GitHub</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
            </header>
            <main className="p-6">
                <p className="text-gray-300 mb-4">
                    Para acessar seus repositórios, por favor, gere um <a href="https://github.com/settings/tokens/new?scopes=repo" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:underline">Personal Access Token (Clássico)</a> com permissão de <strong>repo</strong>.
                </p>
                <p className="text-xs text-gray-500 mb-6">Este token será armazenado apenas no seu navegador para esta sessão e não será enviado para nenhum outro lugar além da API do GitHub.</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        placeholder="cole seu token aqui"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:ring-[#666666] focus:border-[#666666]"
                        aria-label="GitHub Personal Access Token"
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="mt-6 w-full bg-[#666666] text-gray-100 font-bold py-2.5 rounded-md hover:bg-[#555555] transition-colors disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isLoading ? 'Verificando...' : 'Entrar'}
                    </button>
                </form>
            </main>
        </div>
    </div>
  );
};

export default AuthModal;