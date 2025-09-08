# Integração de Transações com Supabase

## ✅ Integração Completa Implementada

### 📋 **Schema da Tabela no Supabase**
```sql
create table public.transactions (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  category_id uuid not null,
  amount numeric(12, 2) not null,
  description text not null,
  type text not null,
  transaction_date date not null default CURRENT_DATE,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint transactions_pkey primary key (id),
  constraint transactions_category_id_fkey foreign KEY (category_id) references categories (id) on delete CASCADE,
  constraint transactions_type_check check (
    (
      type = any (array['income'::text, 'expense'::text])
    )
  )
) TABLESPACE pg_default;

create trigger update_transactions_updated_at BEFORE
update on transactions for EACH row
execute FUNCTION update_updated_at_column ();
```

### 🏗️ **Arquitetura Implementada**

#### **1. Tipos TypeScript (`/src/types/transactions.ts`)**
- `Transaction`: Interface principal da transação
- `CreateTransactionData`: Para inserção de novas transações
- `UpdateTransactionData`: Para atualização de transações
- `TransactionForm`: Para formulários client-side

#### **2. Funções de API (`/src/lib/transactions.ts`)**
- `createTransaction()`: Criar nova transação
- `getTransactions()`: Buscar todas as transações do usuário
- `getTransactionsByType()`: Buscar por tipo específico (income/expense)
- `getTransactionsByDateRange()`: Buscar por período
- `updateTransaction()`: Atualizar transação existente
- `deleteTransaction()`: Deletar transação

#### **3. Server Actions (`/src/app/(app)/dashboard/_actions/transactions.ts`)**
- `addTransactionAction()`: Action para criar transação via formulário
- `updateTransactionAction()`: Action para atualizar transação existente
- `deleteTransactionAction()`: Action para deletar transação
- Validação server-side com Zod
- Tratamento de valores monetários
- Tratamento de erros robusto

#### **4. Componentes de UI**

##### **ModalAddIncomeTransaction.tsx** 💰
Modal especializado para receitas:

**Funcionalidades:**
- ✅ **Formulário otimizado**: Campos específicos para receitas
- ✅ **Formatação monetária**: Input com máscara de moeda brasileira
- ✅ **Categorias filtradas**: Apenas categorias de receita
- ✅ **Validação**: Zod schema para validação client-side
- ✅ **Feedback**: Toast notifications para sucesso/erro
- ✅ **Loading**: Estados de carregamento durante operações

**Uso:**
```tsx
<ModalAddIncomeTransaction />
```

##### **ModalAddExpenseTransaction.tsx** 💸
Modal especializado para despesas:

**Funcionalidades:**
- ✅ **Formulário otimizado**: Campos específicos para despesas
- ✅ **Formatação monetária**: Input com máscara de moeda brasileira
- ✅ **Categorias filtradas**: Apenas categorias de despesa
- ✅ **Validação**: Zod schema para validação client-side
- ✅ **Feedback**: Toast notifications para sucesso/erro
- ✅ **Loading**: Estados de carregamento durante operações

**Uso:**
```tsx
<ModalAddExpenseTransaction />
```

##### **ModalAddTransaction.tsx** 🔄
Componente wrapper que permite usar ambos ou um tipo específico:

**Props:**
- `type`: "income" | "expense" | "both" (default: "both")

**Uso:**
```tsx
// Mostrar ambos os botões
<ModalAddTransaction />

// Apenas receitas
<ModalAddTransaction type="income" />

// Apenas despesas
<ModalAddTransaction type="expense" />
```

### 🔒 **Recursos de Segurança**

#### **RLS (Row Level Security)**
Para ativar a segurança a nível de linha no Supabase:

```sql
-- Habilitar RLS na tabela
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados verem apenas suas transações
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

-- Política para usuários autenticados criarem transações
CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para usuários autenticados atualizarem suas transações
CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para usuários autenticados deletarem suas transações
CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);
```

### 🚀 **Como Usar**

#### **1. Adicionar Transações**
```tsx
// Importar o componente wrapper
import ModalAddTransaction from './_components/ModalAddTransaction';

// Usar no JSX
<ModalAddTransaction />
// ou
<ModalAddTransaction type="income" />
<ModalAddTransaction type="expense" />
```

#### **2. Server Actions em Componentes**
```tsx
import { 
  addTransactionAction, 
  updateTransactionAction, 
  deleteTransactionAction 
} from './_actions/transactions';

// Adicionar transação
const handleAdd = async (formData: FormData) => {
  const result = await addTransactionAction(formData);
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.error);
  }
};

// Atualizar transação
const handleUpdate = async (formData: FormData) => {
  const result = await updateTransactionAction(formData);
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.error);
  }
};

// Deletar transação
const handleDelete = async (formData: FormData) => {
  const result = await deleteTransactionAction(formData);
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.error);
  }
};
```

#### **3. Buscar Transações**
```tsx
import { 
  getTransactions, 
  getTransactionsByType, 
  getTransactionsByDateRange 
} from "@/lib/transactions";

// Buscar todas as transações
const transactions = await getTransactions();

// Buscar apenas receitas
const incomeTransactions = await getTransactionsByType("income");

// Buscar apenas despesas
const expenseTransactions = await getTransactionsByType("expense");

// Buscar por período
const periodTransactions = await getTransactionsByDateRange(
  "2025-01-01", 
  "2025-12-31"
);
```

### 💱 **Formatação Monetária**

Os modais incluem formatação automática de valores:

```tsx
// Função de formatação incluída nos modais
const formatCurrency = (value: string) => {
  const numbers = value.replace(/\D/g, "");
  const amount = parseInt(numbers) / 100;
  
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};
```

### 📊 **Estrutura de Dados**

#### **Transaction Interface:**
```tsx
interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;           // Valor numérico em reais
  description: string;      // Descrição da transação
  type: 'income' | 'expense';
  transaction_date: string; // Data no formato ISO
  created_at: string;
  updated_at: string;
}
```

#### **FormData Structure:**
```tsx
// Dados enviados pelos formulários
FormData {
  amount: string;          // Ex: "R$ 1.250,00"
  description: string;     // Ex: "Salário setembro"
  category_id: string;     // UUID da categoria
  type: "income" | "expense";
  transaction_date: string; // Ex: "2025-09-05"
}
```

### 🔄 **Revalidação Automática**

As funções incluem revalidação automática:
- `revalidatePath("/dashboard")`: Atualiza o dashboard
- `revalidatePath("/transactions")`: Atualiza a página de transações

### 🧪 **Testando a Integração**

1. **Pré-requisitos:**
   - Variáveis de ambiente do Supabase configuradas
   - Tabela `transactions` criada no Supabase
   - Tabela `categories` criada e com dados
   - RLS policies configuradas (opcional mas recomendado)

2. **Teste básico:**
   - Navegue para a página que contém `<ModalAddTransaction />`
   - Clique em "Nova Receita" ou "Nova Despesa"
   - Preencha os dados do formulário
   - Verifique se a formatação monetária funciona
   - Salve e confirme se aparece toast de sucesso
   - Verifique no Supabase se foi salvo

### 🐛 **Troubleshooting**

#### **Erro de categorias não carregando:**
- Verifique se existem categorias do tipo correspondente
- Confirme se a função `getCategoriesByType()` está funcionando

#### **Erro de formatação monetária:**
- Verifique se os valores estão sendo convertidos corretamente
- Confirme se a validação Zod está aceitando os valores

#### **Erro de validação:**
- Verifique os schemas Zod client e server-side
- Confirme se os tipos estão consistentes

### ✅ **Status da Integração**

- ✅ **Tipos TypeScript** definidos
- ✅ **Funções de API** implementadas (CRUD completo)
- ✅ **Server Actions** configuradas (add, update, delete)
- ✅ **Modal de receitas** funcional
- ✅ **Modal de despesas** funcional
- ✅ **Componente wrapper** implementado
- ✅ **Formatação monetária** implementada
- ✅ **Validação** client e server-side
- ✅ **Tratamento de erros** robusto
- ✅ **Revalidação automática** implementada

**🚀 A integração de transações está completa e pronta para uso!**

### 🔮 **Próximos Passos Sugeridos**

1. **Lista de Transações**: Criar componente para exibir transações em tabela
2. **Edição de Transações**: Implementar modal de edição
3. **Filtros**: Adicionar filtros por categoria, data, valor
4. **Relatórios**: Gráficos e estatísticas das transações
5. **Import/Export**: Funcionalidade para importar/exportar dados
6. **Anexos**: Permitir anexar comprovantes às transações
7. **Recorrência**: Transações recorrentes automáticas
