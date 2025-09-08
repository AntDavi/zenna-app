import { createClient } from "../../utils/supabase/server";
import {
  CreateTransactionData,
  Transaction,
  UpdateTransactionData,
} from "@/types/transactions";
import { revalidatePath } from "next/cache";

export async function createTransaction(
  data: CreateTransactionData
): Promise<Transaction> {
  console.log("🏦 [DB] Dados que serão inseridos no Supabase:", data);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const transactionData = {
    ...data,
    user_id: user.id,
  };

  console.log(
    "🏦 [DB] Dados finais para inserção (com user_id):",
    transactionData
  );

  const { data: transaction, error } = await supabase
    .from("transactions")
    .insert([transactionData])
    .select()
    .single();

  if (error) {
    console.error("❌ [DB] Erro ao criar transação no Supabase:", error);
    throw new Error("Erro ao criar transação");
  }

  console.log("✅ [DB] Transação inserida com sucesso:", transaction);

  revalidatePath("/dashboard");
  revalidatePath("/transactions");

  return transaction;
}

export async function getTransactions(): Promise<Transaction[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      categories:category_id (
        id,
        name,
        type
      )
    `
    )
    .eq("user_id", user.id)
    .order("transaction_date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar transações:", error);
    throw new Error("Erro ao buscar transações");
  }

  return transactions || [];
}

export async function getTransactionsByType(
  type: "income" | "expense"
): Promise<Transaction[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      categories:category_id (
        id,
        name,
        type
      )
    `
    )
    .eq("user_id", user.id)
    .eq("type", type)
    .order("transaction_date", { ascending: false });

  if (error) {
    console.error(`Erro ao buscar transações de ${type}:`, error);
    throw new Error(`Erro ao buscar transações de ${type}`);
  }

  return transactions || [];
}

export async function getTransactionsByDateRange(
  startDate: string,
  endDate: string
): Promise<Transaction[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const { data: transactions, error } = await supabase
    .from("transactions")
    .select(
      `
      *,
      categories:category_id (
        id,
        name,
        type
      )
    `
    )
    .eq("user_id", user.id)
    .gte("transaction_date", startDate)
    .lte("transaction_date", endDate)
    .order("transaction_date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar transações por período:", error);
    throw new Error("Erro ao buscar transações por período");
  }

  return transactions || [];
}

export async function updateTransaction(
  id: string,
  data: UpdateTransactionData
): Promise<Transaction> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const { data: transaction, error } = await supabase
    .from("transactions")
    .update(data)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar transação:", error);
    throw new Error("Erro ao atualizar transação");
  }

  revalidatePath("/dashboard");
  revalidatePath("/transactions");

  return transaction;
}

export async function deleteTransaction(id: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado");
  }

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Erro ao deletar transação:", error);
    throw new Error("Erro ao deletar transação");
  }

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
}
