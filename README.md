<div align="center">

# John Galt

**Frontend de uma plataforma para compra de Bitcoin, onboarding, KYC, checkout Pix e acompanhamento de pagamentos.**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

## Sobre o projeto

O **John Galt** é o frontend de uma aplicação financeira voltada à compra de Bitcoin. A interface cobre a jornada do usuário desde cadastro e autenticação até simulação, checkout, identificação, pagamento e consulta de status.

O projeto também possui áreas administrativas para análise de cadastros e KYC, suporte a múltiplos idiomas, tour de onboarding e integração com serviços externos por API.

## Funcionalidades

### Jornada do usuário

- cadastro e autenticação;
- simulação e consulta de taxas;
- formulário de dados para operação;
- checkout de compra de Bitcoin;
- pagamento via Pix;
- acompanhamento dos estados de sucesso, falha e revisão;
- área de suporte;
- conteúdo educativo sobre Bitcoin;
- termos de uso;
- fluxo de KYC protegido por autenticação.

### Administração

- login administrativo;
- dashboard de operações e cadastros;
- consulta detalhada de KYC;
- rotas protegidas por perfil;
- análise de dados enviados pelos usuários.

### Experiência e produto

- interface responsiva;
- tema claro e escuro;
- onboarding guiado na primeira visita;
- internacionalização com i18next;
- carregamento preguiçoso de rotas;
- feedbacks e notificações para o usuário;
- validação de formulários e schemas.

## Arquitetura

O projeto separa domínio, visualização, contexto e navegação:

```text
src/
├── domain/
│   └── locales/           idiomas e traduções
├── view/
│   ├── components/        componentes compartilhados
│   ├── context/           autenticação e tema
│   ├── layout/            estrutura das páginas
│   ├── routes/            rotas públicas e protegidas
│   └── screens/           checkout, KYC, admin e status
├── main.tsx
└── view/styles/
```

A navegação usa rotas públicas, rotas protegidas para usuários autenticados e uma área administrativa independente.

## Stack

- **Frontend:** React 18 e TypeScript;
- **Build:** Vite 6;
- **Estilização:** Tailwind CSS;
- **Rotas:** React Router;
- **Formulários:** React Hook Form e Zod;
- **Internacionalização:** i18next e react-i18next;
- **Animações:** Framer Motion;
- **Integrações:** Axios;
- **Onboarding:** Reactour;
- **Observabilidade:** Vercel Analytics e Speed Insights;
- **Qualidade:** ESLint, Prettier, Husky, lint-staged e Conventional Commits.

## Executando localmente

### Requisitos

- Node.js 18 ou superior;
- npm;
- acesso aos serviços de backend configurados nas variáveis de ambiente.

```bash
git clone https://github.com/Lucasqc04/john-galt.git
cd john-galt
npm install
npm run dev
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | inicia o Vite em modo de desenvolvimento |
| `npm run build` | valida TypeScript e gera o build |
| `npm run lint` | executa o ESLint |
| `npm run preview` | visualiza o build localmente |

## Convenções de desenvolvimento

O projeto utiliza Husky, lint-staged, Commitlint e Commitizen para manter padronização antes dos commits.

```bash
npm run lint
npm run build
```

## Observação

Este repositório representa a camada de frontend. Algumas funcionalidades dependem de APIs e serviços externos que não fazem parte deste código público.

## Autor

Desenvolvido por **[Lucas Quinteiro Campos](https://github.com/Lucasqc04)** em colaboração com outros desenvolvedores.

[LinkedIn](https://www.linkedin.com/in/lucas-quinteiro-2071022a4/) · [GitHub](https://github.com/Lucasqc04)
