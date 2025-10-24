import React from 'react';
import GithubIcon from './icons/GithubIcon';

interface LandingPageProps {
  onLogin: () => void;
}

const FeatureCard: React.FC<{ title: string; description: string; command: string }> = ({ title, description, command }) => (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg h-full flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gray-500/50">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4 flex-grow">{description}</p>
        <code className="block bg-gray-900/50 text-gray-300 p-3 rounded-md text-sm font-mono whitespace-pre-wrap">
          {command}
        </code>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  return (
    <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black animate-background-pan -z-10" style={{backgroundSize: '200% 200%'}}></div>
        <div className="absolute -top-1/2 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl" aria-hidden="true">
            <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#80caff] to-[#4f46e5] opacity-20" style={{clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'}}></div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 sm:py-28">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                    O Futuro do Controle de Versão é Semântico.
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                    E se o seu histórico de commits não fosse apenas um registro, mas uma base de dados estruturada? Apresentamos um conceito onde o Git entende a <span className="font-semibold text-white">intenção</span> de cada mudança, desbloqueando um novo nível de automação e análise.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button
                        onClick={onLogin}
                        className="flex items-center gap-x-3 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-transform transform hover:scale-105"
                    >
                        <GithubIcon className="h-5 w-5" />
                        Explore o Conceito com seu GitHub
                    </button>
                </div>
            </div>

            <div className="mt-24 max-w-5xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Um histórico que esquece.</h2>
                    <p className="mt-4 text-lg text-gray-400">O `git log` tradicional é um fluxo de mensagens sem contexto, difícil de filtrar e quase impossível de usar para automação de forma confiável.</p>
                </div>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-white/10">
                        <h3 className="text-lg font-semibold text-center text-red-400 mb-2">Antes: O Caos</h3>
                        <pre className="bg-gray-900/50 rounded-lg p-4 text-xs text-gray-500 filter blur-[0.5px] opacity-80 select-none overflow-x-auto">
                            {`commit 8a2b4e6f... (Update README.md)
commit 1c9d3f5a... (fix typo)
commit f7e5a1d0... (WIP)
commit 3b6c8a2e... (Merge branch 'dev')
commit 9e2d7b4c... (add login feature)
commit 5a1f8c3b... (oops)`}
                        </pre>
                    </div>
                    <div className="bg-gray-800/30 p-4 rounded-xl border border-white/10">
                        <h3 className="text-lg font-semibold text-center text-green-400 mb-2">Depois: A Clareza</h3>
                         <pre className="bg-gray-900/50 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
                            <span className="text-cyan-400">$</span> git log --type=fix --scope=auth<br/><br/>
                            <span className="text-yellow-300">fix(auth):</span> corrige fluxo de redirect<br/>
                            <span className="text-gray-500">  (9e2d7b4c) - há 1 semana</span><br/><br/>
                            <span className="text-yellow-300">fix(auth):</span> previne falha de CSRF<br/>
                            <span className="text-gray-500">  (1c9d3f5a) - há 2 semanas</span>
                        </pre>
                    </div>
                </div>
            </div>

            <div className="mt-24 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Funcionalidades Nativas em um Mundo Semântico</h2>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">Quando commits são dados, as possibilidades se tornam funcionalidades nativas do Git.</p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <FeatureCard 
                    title="Commits com Superpoderes"
                    description="Vá além do texto. Cada commit agora carrega metadados ricos: tipo, escopo, e o impacto da mudança. Diga adeus à ambiguidade."
                    command={'git commit --type=feat --scope=api'}
                />
                <FeatureCard 
                    title="Histórico como Banco de Dados"
                    description="Seu histórico de commits se torna uma base de dados. Execute consultas complexas para encontrar exatamente o que precisa."
                    command={'git log --type=fix --scope=auth'}
                />
                <FeatureCard 
                    title="Changelogs Instantâneos"
                    description="Gere documentação de release impecável diretamente do seu histórico. Nunca mais escreva um changelog manualmente."
                    command={'git changelog v1.0..v2.0'}
                />
                 <FeatureCard 
                    title="Automação Confiável"
                    description="Gatilhos de CI/CD, métricas de projeto e outras automações se tornam robustas quando baseadas em dados estruturados."
                    command={'on: commit(type: perf, scope: db)'}
                />
            </div>

        
        </div>
    </div>
  );
};

export default LandingPage;