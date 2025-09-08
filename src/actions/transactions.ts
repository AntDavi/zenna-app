"use server";

import { getTransactionsByDateRange } from "@/lib/transactions";
import { Transaction } from "@/types/transactions";

export async function getTransactionsByDateRangeAction(
  startDate: string,
  endDate: string
): Promise<Transaction[]> {
  try {
    return await getTransactionsByDateRange(startDate, endDate);
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    throw new Error("Erro ao buscar transações");
  }
}
