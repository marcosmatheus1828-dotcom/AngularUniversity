# 🎓 Angular University

> Catálogo mundial de universidades com Angular — consulte universidades de qualquer país do mundo através de uma API REST pública.

![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📷 Capturas de tela

> infelizmente não consegui colocar imagem 
---

## 🎯 Objetivo do projeto

O **Angular University** é uma aplicação web responsiva desenvolvida em **Angular** e **TypeScript**, capaz de consultar e exibir informações sobre universidades de diversos países através de uma API REST pública (sem autenticação).

O projeto foi desenvolvido como atividade acadêmica da disciplina de Desenvolvimento Web com Angular, com o objetivo de aplicar na prática:

- Componentes standalone
- Serviços (`@Injectable`)
- Interfaces e tipagem estática em TypeScript
- Roteamento (`RouterModule` / `provideRouter`)
- Formulários (template-driven com `ngModel`)
- Consumo de API REST com `HttpClient`
- Data binding (interpolação, property binding, event binding e two-way binding)
- Diretivas estruturais (`@if` / `@for`, equivalentes a `*ngIf` / `*ngFor`)
- Armazenamento local (`localStorage`)

---

## 🛠️ Tecnologias utilizadas

| Categoria | Tecnologia |
|---|---|
| Framework | Angular 17 (Standalone Components) |
| Linguagem | TypeScript |
| Estilização | Angular Material |
| Gráficos | Chart.js + ng2-charts |
| Consumo REST | `HttpClient` |
| Armazenamento | Local Storage |
| API de dados | [Universities API (Hipolabs)](http://universities.hipolabs.com) |

---

## ⚙️ Instruções de instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- [Angular CLI](https://angular.dev/tools/cli) 17 (`npm install -g @angular/cli`)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/AngularUniversity.git

# 2. Acesse a pasta do projeto
cd AngularUniversity

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
ng serve
# ou: npm start

# 5. Acesse no navegador
# http://localhost:4200
```

### ⚠️ Troubleshooting: erro de "Mixed Content" ao buscar universidades

A Universities API (`http://universities.hipolabs.com`) é servida apenas via **HTTP**, sem TLS. Se você hospedar este projeto em um domínio **HTTPS** (GitHub Pages, Vercel, Netlify, etc.), o navegador pode **bloquear a requisição** por segurança (mixed content).

**Soluções:**
- Rode o projeto localmente com `ng serve` (em `http://localhost`, o bloqueio não ocorre).
- Ou utilize um proxy/CORS gateway HTTPS para intermediar as chamadas em produção.

---

## 🏗️ Estrutura do sistema

```
AngularUniversity/
├── src/
│   ├── app/
│   │   ├── core/                      # Lógica central da aplicação
│   │   │   ├── models/                # Interfaces TypeScript (University, SearchHistoryItem...)
│   │   │   └── services/              # UniversityService, FavoritesService, ThemeService...
│   │   │
│   │   ├── features/                  # Telas (rotas) da aplicação
│   │   │   ├── home/                  # Tela inicial: pesquisa por país
│   │   │   ├── results/               # Tela de resultados: lista, filtro, ordenação,
│   │   │   │                          #   paginação, dashboard e gráfico
│   │   │   ├── favorites/             # Tela de favoritos
│   │   │   └── about/                 # Tela sobre o projeto
│   │   │
│   │   ├── shared/                    # Componentes e pipes reutilizáveis
│   │   │   ├── components/
│   │   │   │   ├── navbar/            # Barra de navegação + alternância de tema
│   │   │   │   ├── search-bar/        # Campo de busca por país (reutilizável)
│   │   │   │   └── university-card/   # Card de universidade (reutilizável)
│   │   │   └── pipes/
│   │   │       └── au-date.pipe.ts    # Formatação de datas em pt-BR
│   │   │
│   │   ├── app.component.ts           # Componente raiz (shell)
│   │   ├── app.config.ts              # Providers globais (router, http, charts...)
│   │   └── app.routes.ts              # Definição das rotas
│   │
│   ├── environments/                  # URLs da API por ambiente
│   ├── index.html
│   ├── main.ts                        # Bootstrap da aplicação standalone
│   └── styles.scss                    # Estilos globais + variáveis de tema (dark/light)
│
├── angular.json
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

---

## ✨ Funcionalidades

- 🔍 **Pesquisa por país** — busca universidades reais via API REST pública
- 📋 **Listagem responsiva** — nome, país, domínio institucional e site oficial
- 🔗 **Abertura do site oficial** em nova aba ao clicar em uma universidade
- 🧹 **Filtro local** — filtra os resultados já carregados sem nova chamada à API
- 🕘 **Histórico de pesquisas** — últimos países pesquisados, salvos localmente
- ⭐ **Favoritos** — marque universidades e acesse-as na tela dedicada
- 📊 **Dashboard estatístico** — total de universidades, domínios únicos e favoritas
- ↕️ **Ordenação** — A-Z e Z-A por nome
- 📱 **Interface responsiva** — desktop, tablet e smartphone

### 🎁 Funcionalidades bônus implementadas

- ✅ **Paginação de resultados** (com seleção de itens por página)
- ✅ **Seletor de tema** (Dark Mode / Light Mode), persistido em Local Storage
- ✅ **Gráfico com Chart.js** mostrando a quantidade de universidades retornadas por país pesquisado

---

## 📡 API utilizada

[Universities API](http://universities.hipolabs.com) — gratuita, sem autenticação, sem token, sem cadastro. Retorna JSON.

```
http://universities.hipolabs.com/search?country=Brazil
http://universities.hipolabs.com/search?country=Canada
http://universities.hipolabs.com/search?country=United States
```

---

## 📄 Licença

Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Desenvolvedor

Projeto desenvolvido por Marcos matheus Gomes Nerys como atividade complementar da disciplina de Desenvolvimento Web com Angular.
