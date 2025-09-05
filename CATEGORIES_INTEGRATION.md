# Integração de Categorias com Supabase

## ✅ Integração Completa Implementada

### 📋 **Schema da Tabela no Supabase**
```sql
create table public.categories (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  name text not null,
  type text not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint categories_pkey primary key (id),
  constraint categories_type_check check (
    (type = any (array['income'::text, 'expense'::text]))
  )
);
```

### 🏗️ **Arquitetura Implementada**

#### **1. Tipos TypeScript (`/src/types/category.ts`)**
- `Category`: Interface principal da categoria
- `CategoryInsert`: Para inserção de novas categorias
- `CategoryUpdate`: Para atualização de categorias
- `CategoryType`: Enum dos tipos (income/expense)

#### **2. Funções de API (`/src/lib/categories.ts`)**
- `createCategory()`: Criar nova categoria
- `getCategories()`: Buscar todas as categorias do usuário
- `getCategoriesByType()`: Buscar por tipo específico
- `updateCategory()`: Atualizar categoria existente
- `deleteCategory()`: Deletar categoria

#### **3. Server Actions (`/src/app/(app)/categories/_actions/categories.ts`)**
- `addCategoryAction()`: Action para criar categoria via formulário
- `updateCategoryAction()`: Action para atualizar categoria existente
- `deleteCategoryAction()`: Action para deletar categoria
- Validação server-side com Zod
- Tratamento de erros robusto

#### **4. Componentes de UI**

##### **ModalAddCategorie.tsx**
- Formulário com React Hook Form + Zod
- Integração com Server Actions
- Toast notifications
- Estados de loading
- Reset automático após sucesso

##### **CategorieCard.tsx** ⭐
Componente principal para gerenciar categorias com funcionalidades completas:

**Props:**
- `id`: ID da categoria (string)
- `title`: Nome da categoria (string)
- `type`: Tipo da categoria ("income" | "expense")

**Funcionalidades:**
- ✅ **Exibição**: Mostra nome e tipo da categoria com badge colorido
- ✅ **Edição**: Dialog com formulário para editar nome e tipo
- ✅ **Exclusão**: AlertDialog de confirmação para deletar
- ✅ **Feedback**: Toast notifications para todas as ações
- ✅ **Loading**: Estados de carregamento durante operações
- ✅ **Validação**: Zod schema para validação de dados

**Uso:**
```tsx
<CategorieCard
  id="uuid-da-categoria"
  title="Nome da Categoria"
  type="income"
/>
```

#### **5. Página de Categorias (`page.tsx`)**
- Listagem de categorias usando CategorieCard
- Organização por tipo (receitas/despesas)
- Loading states com Skeleton
- Tratamento de erros
- Interface responsiva

### 🔒 **Recursos de Segurança**

#### **RLS (Row Level Security)**
Para ativar a segurança a nível de linha no Supabase:

```sql
-- Habilitar RLS na tabela
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Política para usuários autenticados verem apenas suas categorias
CREATE POLICY "Users can view own categories" ON categories
  FOR SELECT USING (auth.uid() = user_id);

-- Política para usuários autenticados criarem categorias
CREATE POLICY "Users can insert own categories" ON categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para usuários autenticados atualizarem suas categorias
CREATE POLICY "Users can update own categories" ON categories
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para usuários autenticados deletarem suas categorias
CREATE POLICY "Users can delete own categories" ON categories
  FOR DELETE USING (auth.uid() = user_id);
```

### 🚀 **Como Usar**

#### **1. Gerenciar Categorias na Página Principal**
```tsx
// Navegue para /categories
// Use o CategorieCard para cada categoria:

// ➕ ADICIONAR: Clique em "Adicionar Categoria"
// ✏️ EDITAR: Clique no ícone de edição no CategorieCard
// 🗑️ DELETAR: Clique no ícone de lixeira no CategorieCard
```

#### **2. Server Actions em Componentes**
```tsx
import { 
  addCategoryAction, 
  updateCategoryAction, 
  deleteCategoryAction 
} from './_actions/categories';

// Adicionar categoria
const handleAdd = async (data: { name: string; type: string }) => {
  const result = await addCategoryAction(data);
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.message);
  }
};

// Atualizar categoria
const handleUpdate = async (id: string, data: { name: string; type: string }) => {
  const result = await updateCategoryAction(id, data);
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.message);
  }
};

// Deletar categoria
const handleDelete = async (id: string) => {
  const result = await deleteCategoryAction(id);
  if (result.success) {
    toast.success(result.message);
  } else {
    toast.error(result.message);
  }
};
```

#### **3. Buscar Categorias em Outros Componentes**
```tsx
import { getCategories, getCategoriesByType } from "@/lib/categories";

// Buscar todas as categorias
const categories = await getCategories();

// Buscar apenas receitas
const incomeCategories = await getCategoriesByType("income");

// Buscar apenas despesas
const expenseCategories = await getCategoriesByType("expense");
```

#### **4. Usar em Formulários de Transações**
```tsx
import { getCategoriesByType } from "@/lib/categories";

function TransactionForm() {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    getCategoriesByType("income").then(setCategories);
  }, []);

  return (
    <Select>
      {categories.map(cat => (
        <SelectItem key={cat.id} value={cat.id}>
          {cat.name}
        </SelectItem>
      ))}
    </Select>
  );
}
```

### 📝 **Configuração dos Toasts**

O arquivo `layout.tsx` já foi configurado com o Toaster:
```tsx
import { Toaster } from "@/components/ui/sonner";

// No JSX do layout
<Toaster />
```

### 🔄 **Revalidação Automática**

As funções já incluem revalidação automática:
- `revalidatePath("/categories")`: Atualiza a página de categorias
- `revalidatePath("/dashboard")`: Atualiza o dashboard

### 🎨 **Interface Visual**

#### **Organização por Tipo:**
- **Receitas**: Card verde com listagem à esquerda
- **Despesas**: Card vermelho com listagem à direita

#### **CategorieCard Features:**
- Badge colorido indicando o tipo
- Ícones de ação (editar/deletar)
- Hover states para melhor UX
- Responsividade para mobile

#### **Estados de Loading:**
- Skeleton components durante carregamento inicial
- Loading states nos botões durante operações
- Feedback visual imediato

### 🧪 **Testando a Integração**

1. **Pré-requisitos:**
   - Variáveis de ambiente do Supabase configuradas
   - Tabela `categories` criada no Supabase
   - RLS policies configuradas (opcional mas recomendado)

2. **Teste completo:**
   - Acesse `/categories`
   - **Criar**: Clique em "Adicionar Categoria" e teste o formulário
   - **Editar**: Clique no ícone de edição em uma categoria
   - **Deletar**: Clique no ícone de lixeira e confirme a exclusão
   - Verifique se todas as operações atualizam a UI imediatamente
   - Confirme no Supabase se as mudanças foram persistidas

### 🐛 **Troubleshooting**

#### **Erro de autenticação:**
- Verifique se o usuário está logado
- Confirme as variáveis de ambiente do Supabase

#### **Erro de permissão:**
- Verifique se as políticas RLS estão corretas
- Confirme se o `user_id` está sendo enviado

#### **Toast não aparece:**
- Confirme se o `<Toaster />` está no layout
- Verifique se o sonner está instalado

#### **CategorieCard não funciona:**
- Verifique se todos os server actions estão importados
- Confirme se o componente AlertDialog foi instalado (`npx shadcn@latest add alert-dialog`)

### ✅ **Status da Integração**

- ✅ **Tipos TypeScript** definidos
- ✅ **Funções de API** implementadas
- ✅ **Server Actions** configuradas (CRUD completo)
- ✅ **Formulário de criação** funcional
- ✅ **CategorieCard** com edição e exclusão
- ✅ **Página de listagem** implementada
- ✅ **Toast notifications** configuradas
- ✅ **Validação** client e server-side
- ✅ **Tratamento de erros** robusto
- ✅ **Revalidação automática** implementada
- ✅ **Interface responsiva** implementada

**🚀 A integração CRUD completa está finalizada e pronta para uso!**
