# 💰 Zenna - Controle Financeiro Pessoal

<div align="center">
  <img src="public/zenna.svg" alt="Zenna Logo" width="120" height="120">
  
  <h3>Tranquilidade com sua grana!</h3>
  
  <p>Sistema moderno de gestão financeira pessoal desenvolvido com Next.js, TypeScript e Supabase</p>

  ![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4)
  ![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E)
</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Uso](#-uso)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Componentes Principais](#-componentes-principais)
- [API e Integração](#-api-e-integração)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

O **Zenna** é uma aplicação web moderna de controle financeiro pessoal que permite aos usuários gerenciar suas finanças de forma simples e intuitiva. Com foco na experiência do usuário e segurança dos dados, o sistema oferece ferramentas completas para acompanhamento de receitas, despesas e patrimônio.

### 🚀 Objetivos

- Oferecer controle total sobre finanças pessoais
- Interface intuitiva e responsiva
- Visualização de dados através de gráficos e relatórios
- Segurança e privacidade dos dados financeiros
- Gestão de categorias personalizáveis
- Filtros de data flexíveis para análises

---

## ✨ Funcionalidades

### 🏠 **Dashboard Interativo**
- Cards informativos com totais de receitas, despesas e saldo
- Gráficos de pizza para visualização por categorias
- Gráficos de barras para análise temporal
- Filtros de data (hoje, semana, mês, ano, personalizado)

### 💳 **Gestão de Transações**
- Cadastro de receitas e despesas
- Edição e exclusão de transações
- Categorização automática
- Tabela de dados com paginação e busca
- Filtros avançados por período

### 🏷️ **Sistema de Categorias**
- Categorias pré-definidas para receitas e despesas
- Criação de categorias personalizadas
- Organização visual por tipo de transação

### 📊 **Relatórios e Análises**
- Resumos financeiros por período
- Análise de gastos por categoria
- Evolução do patrimônio
- Exportação de dados

### 🔐 **Autenticação e Segurança**
- Sistema de login seguro com Supabase Auth
- Cadastro de novos usuários
- Proteção de rotas autenticadas
- Criptografia de dados

### 📱 **Interface Responsiva**
- Design adaptável para desktop, tablet e mobile
- Tema claro/escuro (suporte futuro)
- Componentes acessíveis
- Experiência otimizada em todos os dispositivos

---

## 🛠️ Tecnologias

### **Frontend**
- **[Next.js 15.5.2](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Framework CSS utilitário
- **[shadcn/ui](https://ui.shadcn.com/)** - Biblioteca de componentes
- **[Radix UI](https://www.radix-ui.com/)** - Componentes primitivos acessíveis

### **Backend/Database**
- **[Supabase](https://supabase.com/)** - Backend as a Service
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Supabase Auth](https://supabase.com/auth)** - Sistema de autenticação

### **Visualização de Dados**
- **[Recharts](https://recharts.org/)** - Biblioteca de gráficos React
- **[Lucide React](https://lucide.dev/)** - Ícones

### **Formulários e Validação**
- **[React Hook Form](https://react-hook-form.com/)** - Gerenciamento de formulários
- **[Zod](https://zod.dev/)** - Validação de esquemas
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Integração validação

### **Ferramentas de Desenvolvimento**
- **[ESLint](https://eslint.org/)** - Linting de código
- **[PNPM](https://pnpm.io/)** - Gerenciador de pacotes
- **[Date-fns](https://date-fns.org/)** - Manipulação de datas

---

## 📋 Pré-requisitos

Antes de começar, verifique se você tem instalado:

- **Node.js** (versão 18.0 ou superior)
- **PNPM** (versão 8.0 ou superior)
- **Git**
- **Conta no Supabase** (para configuração do backend)

```bash
# Verificar versões
node --version
pnpm --version
git --version
```

---

## 🚀 Instalação

### 1. **Clone o repositório**
```bash
git clone https://github.com/AntDavi/zenna-app.git
cd zenna-app
```

### 2. **Instale as dependências**
```bash
pnpm install
```

### 3. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite com suas configurações do Supabase
nano .env.local
```

### 4. **Execute em modo de desenvolvimento**
```bash
pnpm dev
```

### 5. **Acesse a aplicação**
Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## ⚙️ Configuração

### **Variáveis de Ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_do_supabase

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### **Configuração do Supabase**

1. Crie uma conta no [Supabase](https://supabase.com/)
2. Crie um novo projeto
3. Configure as tabelas necessárias:
   - `users` (gerenciada pelo Supabase Auth)
   - `categories`
   - `transactions`
4. Configure as políticas de RLS (Row Level Security)
5. Obtenha as chaves de API no painel do Supabase

---

## 📱 Uso

### **Primeiro Acesso**

1. **Cadastro**: Acesse `/login` e crie uma nova conta
2. **Login**: Faça login com suas credenciais
3. **Dashboard**: Você será redirecionado para o dashboard principal

### **Adicionando Transações**

1. No dashboard, clique em "Adicionar Transação"
2. Selecione o tipo (Receita ou Despesa)
3. Preencha os campos obrigatórios
4. Escolha uma categoria
5. Salve a transação

### **Gerenciando Categorias**

1. Acesse a página "Categorias"
2. Visualize categorias existentes
3. Adicione novas categorias conforme necessário

### **Filtros de Data**

- Use o filtro global para análises por período
- Opções: Hoje, Semana, Mês, Ano, Personalizado
- Os filtros se aplicam a todos os componentes

---

## 📁 Estrutura do Projeto

```
zenna-app/
├── public/                          # Arquivos estáticos
│   └── zenna.svg                   # Logo da aplicação
├── src/
│   ├── app/                        # App Router (Next.js 13+)
│   │   ├── (app)/                  # Grupo de rotas autenticadas
│   │   │   ├── dashboard/          # Dashboard principal
│   │   │   ├── categories/         # Gestão de categorias
│   │   │   └── patrimony/          # Gestão de patrimônio
│   │   ├── (auth)/                 # Grupo de rotas de autenticação
│   │   │   ├── login/              # Página de login/cadastro
│   │   │   ├── confirm/            # Confirmação de email
│   │   │   └── signout/            # Logout
│   │   ├── globals.css             # Estilos globais
│   │   ├── layout.tsx              # Layout raiz
│   │   └── page.tsx                # Landing page
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── ui/                     # Componentes base (shadcn/ui)
│   │   ├── AppHeader.tsx           # Cabeçalho da aplicação
│   │   ├── DateFilter.tsx          # Filtro de datas global
│   │   └── TransactionsDataTable.tsx
│   ├── contexts/                   # Contextos React
│   │   └── DateFilterContext.tsx   # Contexto do filtro de datas
│   ├── lib/                        # Utilitários e helpers
│   │   ├── utils.ts                # Funções utilitárias
│   │   ├── formatters.ts           # Formatação de dados
│   │   └── *.ts                    # Outras bibliotecas
│   ├── types/                      # Definições de tipos TypeScript
│   │   ├── transactions.ts         # Tipos de transações
│   │   ├── categories.ts           # Tipos de categorias
│   │   └── *.ts                    # Outros tipos
│   └── actions/                    # Server Actions
│       ├── dashboard.ts            # Ações do dashboard
│       └── transactions.ts         # Ações de transações
├── utils/
│   └── supabase/                   # Configuração Supabase
│       ├── client.ts               # Cliente browser
│       ├── server.ts               # Cliente servidor
│       └── middleware.ts           # Middleware auth
├── components.json                 # Configuração shadcn/ui
├── middleware.ts                   # Middleware Next.js
├── next.config.ts                  # Configuração Next.js
├── tailwind.config.js              # Configuração Tailwind
├── tsconfig.json                   # Configuração TypeScript
└── package.json                    # Dependências e scripts
```

---

## 🧩 Componentes Principais

### **Dashboard Components**
- `DashboardInfoCardsGlobal`: Cards com resumo financeiro
- `DashboardPieChart`: Gráfico de pizza por categorias
- `DashboardBarsChart`: Gráfico de barras temporal

### **Transaction Components**
- `TransactionsDataTableGlobal`: Tabela de transações
- `ModalAddTransaction`: Modal para adicionar transações
- `ModalEditTransaction`: Modal para editar transações
- `ModalDeleteTransaction`: Modal para confirmar exclusão

### **Category Components**
- `CategoriesList`: Lista de categorias
- `CategorieCard`: Card individual de categoria
- `ModalAddCategorie`: Modal para adicionar categorias

### **UI Components**
Baseados em shadcn/ui e Radix UI:
- `Button`, `Card`, `Dialog`, `Form`
- `Input`, `Select`, `Table`, `Pagination`
- `Calendar`, `Chart`, `Tooltip`

---

## 🔌 API e Integração

### **Supabase Integration**

#### **Autenticação**
```typescript
// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password'
});

// Cadastro
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password'
});
```

#### **Transações**
```typescript
// Buscar transações
const { data: transactions } = await supabase
  .from('transactions')
  .select('*')
  .eq('user_id', userId)
  .order('transaction_date', { ascending: false });

// Criar transação
const { data, error } = await supabase
  .from('transactions')
  .insert([transactionData]);
```

#### **Categorias**
```typescript
// Buscar categorias
const { data: categories } = await supabase
  .from('categories')
  .select('*')
  .eq('user_id', userId);
```

### **Server Actions**

O projeto utiliza Next.js Server Actions para operações server-side:

```typescript
// actions/transactions.ts
export async function createTransaction(formData: FormData) {
  // Lógica no servidor
}

export async function updateTransaction(id: string, formData: FormData) {
  // Lógica no servidor
}
```

---

## 📊 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev              # Inicia servidor de desenvolvimento

# Build
pnpm build            # Gera build de produção
pnpm start            # Inicia servidor de produção

# Linting
pnpm lint             # Executa verificação de código

# Instalação
pnpm install          # Instala dependências
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### **Diretrizes**

- Siga os padrões de código estabelecidos
- Escreva testes para novas funcionalidades
- Mantenha a documentação atualizada
- Use conventional commits

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autor

**Anthony David** - [@AntDavi](https://github.com/AntDavi)

---

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique as [Issues existentes](https://github.com/AntDavi/zenna-app/issues)
2. Crie uma nova issue com detalhes do problema
3. Para dúvidas gerais, use as [Discussions](https://github.com/AntDavi/zenna-app/discussions)

---

## 🎯 Roadmap

- [ ] **v1.1** - Tema escuro/claro
- [ ] **v1.2** - Exportação de relatórios (PDF/Excel)
- [ ] **v1.3** - Metas financeiras
- [ ] **v1.4** - Notificações e lembretes
- [ ] **v1.5** - Aplicativo mobile (React Native)
- [ ] **v2.0** - Múltiplas contas bancárias
- [ ] **v2.1** - Investimentos e portfólio
- [ ] **v2.2** - Integração bancária (Open Banking)

---

<div align="center">
  <p>Feito com ❤️ para ajudar você a ter tranquilidade com sua grana!</p>
  
  **Zenna** © 2025
</div>
