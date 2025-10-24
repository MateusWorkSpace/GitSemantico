# Git Semântico: O Futuro do Controle de Versão

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

> Uma aplicação conceitual que demonstra como commits estruturados e semânticos poderiam ser integrados diretamente ao Git, desbloqueando um novo nível de automação, análise de histórico e geração de changelogs.

---

## O Problema: Um Histórico que Esquece

O `git log` tradicional é um fluxo de mensagens sem contexto, difícil de filtrar e quase impossível de usar para automação de forma confiável.

**Antes: O Caos**
```
commit 8a2b4e6f... (Update README.md)
commit 1c9d3f5a... (fix typo)
commit f7e5a1d0... (WIP)
commit 3b6c8a2e... (Merge branch 'dev')
commit 9e2d7b4c... (add login feature)
commit 5a1f8c3b... (oops)
```

## A Solução: Git Semântico

E se o seu histórico de commits não fosse apenas um registro, mas uma **base de dados estruturada**? Este projeto explora um conceito onde o Git entende a **intenção** por trás de cada mudança.

**Depois: A Clareza**
```bash
$ git log --type=fix --scope=auth

fix(auth): corrige fluxo de redirect
  (9e2d7b4c) - há 1 semana

fix(auth): previne falha de CSRF
  (1c9d3f5a) - há 2 semanas
```

## ✨ Funcionalidades do Conceito

Este aplicativo simula um ecossistema Git onde as seguintes funcionalidades são nativas:

-   **🤖 Commits com Superpoderes:** Vá além do texto. Cada commit carrega metadados ricos: `tipo`, `escopo` e o `impacto` da mudança.
-   **🔍 Histórico como Banco de Dados:** Execute consultas complexas para encontrar exatamente o que precisa, diretamente na linha de comando.
-   **📜 Changelogs Instantâneos:** Gere documentação de release impecável diretamente do seu histórico. Nunca mais escreva um changelog manualmente.
-   **🧠 Sugestões com IA:** Utilize o poder da Gemini API para analisar suas mudanças e sugerir mensagens de commit semânticas e bem estruturadas.
-   **🚀 Automação Confiável:** Crie gatilhos de CI/CD, métricas de projeto e outras automações robustas baseadas em dados estruturados.

## 🚀 Como Funciona

Esta é uma **aplicação de demonstração**. Ela funciona da seguinte maneira:

1.  **Autenticação:** Você se autentica com sua conta do GitHub.
2.  **Análise:** O app busca os commits de um repositório seu através da API do GitHub.
3.  **Simulação:** A interface analisa as mensagens de commit (usando regex para o padrão Conventional Commits) e as exibe como se fossem dados estruturados.
4.  **Interação:** Você pode filtrar, gerar changelogs e até usar a IA da Gemini para criar novos comandos de commit, simulando como um "Git Semântico" funcionaria.

> **Importante:** Nenhuma alteração real é feita no seu repositório. Todos os comandos `git commit` gerados devem ser copiados e executados no seu terminal local.

## 🛠️ Tecnologias Utilizadas

-   **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
-   **Inteligência Artificial:** [Google Gemini API]
-   **Dados:** [GitHub API](https://docs.github.com/en/rest)

## 👨‍💻 Desenvolvido por

Este projeto conceitual foi criado com ❤️ por **MateusDang**.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MateusWorkSpace)
