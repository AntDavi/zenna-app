export interface TransactionForm {
  amount: string;
  description: string;
  date: Date;
  category_id: string;
  type: "income" | "expense";
}

export const mockTransactions: Transaction[] = [
  // income
  {
    id: "t-001",
    type: "income",
    amount: "2450.00",
    description: "Salário agosto",
    date: new Date("2025-08-01"),
    category_id: "1",
  }, // Salário
  {
    id: "t-004",
    type: "income",
    amount: "600.00",
    description: "Projeto freelance",
    date: new Date("2025-08-07"),
    category_id: "2",
  }, // Freelance
  {
    id: "t-007",
    type: "income",
    amount: "150.00",
    description: "Venda marketplace",
    date: new Date("2025-08-12"),
    category_id: "4",
  }, // Vendas
  {
    id: "t-011",
    type: "income",
    amount: "320.00",
    description: "Consultoria rápida",
    date: new Date("2025-08-17"),
    category_id: "7",
  }, // Consultoria
  {
    id: "t-014",
    type: "income",
    amount: "210.00",
    description: "Dividendos ITSA4",
    date: new Date("2025-08-18"),
    category_id: "3",
  }, // Investimentos

  // expense
  {
    id: "t-002",
    type: "expense",
    amount: "120.90",
    description: "Almoço com equipe",
    date: new Date("2025-08-03"),
    category_id: "1",
  }, // Alimentação
  {
    id: "t-003",
    type: "expense",
    amount: "380.00",
    description: "Mensalidade internet",
    date: new Date("2025-08-05"),
    category_id: "8",
  }, // Utilidades
  {
    id: "t-005",
    type: "expense",
    amount: "49.90",
    description: "Streaming",
    date: new Date("2025-08-09"),
    category_id: "5",
  }, // Entretenimento
  {
    id: "t-006",
    type: "expense",
    amount: "89.00",
    description: "Livro de UX",
    date: new Date("2025-08-10"),
    category_id: "6",
  }, // Educação
  {
    id: "t-008",
    type: "expense",
    amount: "35.50",
    description: "Uber reunião",
    date: new Date("2025-08-13"),
    category_id: "2",
  }, // Transporte
  {
    id: "t-009",
    type: "expense",
    amount: "210.00",
    description: "Consulta clínica",
    date: new Date("2025-08-14"),
    category_id: "4",
  }, // Saúde
  {
    id: "t-010",
    type: "expense",
    amount: "75.00",
    description: "Presente sobrinho",
    date: new Date("2025-08-16"),
    category_id: "14",
  }, // Presentes
  {
    id: "t-012",
    type: "expense",
    amount: "260.00",
    description: "Conta de luz",
    date: new Date("2025-08-18"),
    category_id: "8",
  }, // Utilidades
  {
    id: "t-013",
    type: "expense",
    amount: "68.40",
    description: "Mercado da semana",
    date: new Date("2025-08-18"),
    category_id: "1",
  }, // Alimentação
  {
    id: "t-015",
    type: "expense",
    amount: "129.90",
    description: "Assinatura de software",
    date: new Date("2025-08-19"),
    category_id: "13",
  }, // Tecnologia
];

export type Transaction = TransactionForm & {
  id: string;
  type: "income" | "expense";
};
