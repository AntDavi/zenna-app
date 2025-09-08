export interface Transaction {
  id: string;
  user_id: string;
  category_id: string;
  amount: number;
  description: string;
  type: "income" | "expense";
  transaction_date: string; // ISO date string
  created_at: string;
  updated_at: string;
}

export type CreateTransactionData = Pick<
  Transaction,
  "category_id" | "amount" | "description" | "type" | "transaction_date"
>;

export type UpdateTransactionData = Partial<CreateTransactionData>;

export interface TransactionForm {
  amount: string;
  description: string;
  transaction_date: string;
  category_id: string;
  type: "income" | "expense";
}

export const mockTransactions: Omit<
  Transaction,
  "user_id" | "created_at" | "updated_at"
>[] = [
  // income
  {
    id: "t-001",
    type: "income",
    amount: 2450.0,
    description: "Salário agosto",
    transaction_date: "2025-08-01",
    category_id: "1",
  }, // Salário
  {
    id: "t-004",
    type: "income",
    amount: 600.0,
    description: "Projeto freelance",
    transaction_date: "2025-08-07",
    category_id: "2",
  }, // Freelance
  {
    id: "t-007",
    type: "income",
    amount: 150.0,
    description: "Venda marketplace",
    transaction_date: "2025-08-12",
    category_id: "4",
  }, // Vendas
  {
    id: "t-011",
    type: "income",
    amount: 320.0,
    description: "Consultoria rápida",
    transaction_date: "2025-08-17",
    category_id: "7",
  }, // Consultoria
  {
    id: "t-014",
    type: "income",
    amount: 210.0,
    description: "Dividendos ITSA4",
    transaction_date: "2025-08-18",
    category_id: "3",
  }, // Investimentos

  // expense
  {
    id: "t-002",
    type: "expense",
    amount: 120.9,
    description: "Almoço com equipe",
    transaction_date: "2025-08-03",
    category_id: "1",
  }, // Alimentação
  {
    id: "t-003",
    type: "expense",
    amount: 380.0,
    description: "Mensalidade internet",
    transaction_date: "2025-08-05",
    category_id: "8",
  }, // Utilidades
  {
    id: "t-005",
    type: "expense",
    amount: 49.9,
    description: "Streaming",
    transaction_date: "2025-08-09",
    category_id: "5",
  }, // Entretenimento
  {
    id: "t-006",
    type: "expense",
    amount: 89.0,
    description: "Livro de UX",
    transaction_date: "2025-08-10",
    category_id: "6",
  }, // Educação
  {
    id: "t-008",
    type: "expense",
    amount: 35.5,
    description: "Uber reunião",
    transaction_date: "2025-08-13",
    category_id: "2",
  }, // Transporte
  {
    id: "t-009",
    type: "expense",
    amount: 210.0,
    description: "Consulta clínica",
    transaction_date: "2025-08-14",
    category_id: "4",
  }, // Saúde
  {
    id: "t-010",
    type: "expense",
    amount: 75.0,
    description: "Presente sobrinho",
    transaction_date: "2025-08-16",
    category_id: "14",
  }, // Presentes
  {
    id: "t-012",
    type: "expense",
    amount: 260.0,
    description: "Conta de luz",
    transaction_date: "2025-08-18",
    category_id: "8",
  }, // Utilidades
  {
    id: "t-013",
    type: "expense",
    amount: 68.4,
    description: "Mercado da semana",
    transaction_date: "2025-08-18",
    category_id: "1",
  }, // Alimentação
  {
    id: "t-015",
    type: "expense",
    amount: 129.9,
    description: "Assinatura de software",
    transaction_date: "2025-08-19",
    category_id: "13",
  }, // Tecnologia
];
