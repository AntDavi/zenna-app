import { getTransactionsByDateRange } from "./transactions";
import { DateRange } from "@/contexts/DateFilterContext";

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  totalTransactions: number;
  incomeChange: number;
  expenseChange: number;
  balanceChange: number;
  transactionCountChange: number;
}

/**
 * Calcula as estatísticas do dashboard para um período específico usando DateRange
 */
export async function getDashboardStatsByDateRange(
  dateRange: DateRange
): Promise<DashboardStats> {
  try {
    const startDate = dateRange.startDate.toISOString().split("T")[0];
    const endDate = dateRange.endDate.toISOString().split("T")[0];

    const transactions = await getTransactionsByDateRange(startDate, endDate);

    // Calcular estatísticas atuais
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;
    const totalTransactions = transactions.length;

    // Calcular período anterior para comparação
    const previousPeriodStats = await getPreviousPeriodStatsByDateRange(
      dateRange
    );

    // Calcular mudanças percentuais
    const incomeChange = calculatePercentageChange(
      previousPeriodStats.totalIncome,
      totalIncome
    );
    const expenseChange = calculatePercentageChange(
      previousPeriodStats.totalExpenses,
      totalExpenses
    );
    const balanceChange = calculatePercentageChange(
      previousPeriodStats.balance,
      balance
    );
    const transactionCountChange = calculatePercentageChange(
      previousPeriodStats.totalTransactions,
      totalTransactions
    );

    return {
      totalIncome,
      totalExpenses,
      balance,
      totalTransactions,
      incomeChange,
      expenseChange,
      balanceChange,
      transactionCountChange,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas do dashboard:", error);
    throw new Error("Erro ao buscar estatísticas do dashboard");
  }
}

/**
 * Calcula as estatísticas do período anterior para comparação baseado no DateRange
 */
async function getPreviousPeriodStatsByDateRange(
  dateRange: DateRange
): Promise<Omit<DashboardStats, "incomeChange" | "expenseChange" | "balanceChange" | "transactionCountChange">> {
  try {
    const currentStart = dateRange.startDate;
    const currentEnd = dateRange.endDate;
    
    // Calcular a duração do período atual
    const diffDays = Math.ceil(
      (currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Calcular período anterior
    const previousEnd = new Date(currentStart.getTime() - 24 * 60 * 60 * 1000);
    const previousStart = new Date(
      previousEnd.getTime() - diffDays * 24 * 60 * 60 * 1000
    );

    const previousStartDate = previousStart.toISOString().split("T")[0];
    const previousEndDate = previousEnd.toISOString().split("T")[0];

    const previousTransactions = await getTransactionsByDateRange(
      previousStartDate,
      previousEndDate
    );

    const totalIncome = previousTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = previousTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      totalTransactions: previousTransactions.length,
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas do período anterior:", error);
    // Retornar valores zerados em caso de erro
    return {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0,
      totalTransactions: 0,
    };
  }
}

/**
 * Calcula a mudança percentual entre dois valores
 */
function calculatePercentageChange(
  previousValue: number,
  currentValue: number
): number {
  if (previousValue === 0) {
    return currentValue > 0 ? 100 : 0;
  }

  return ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
}

/**
 * Busca estatísticas do dashboard para o mês atual
 */
export async function getCurrentMonthStats(): Promise<DashboardStats> {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const dateRange: DateRange = {
    startDate: startOfMonth,
    endDate: endOfMonth,
  };

  return getDashboardStatsByDateRange(dateRange);
}

/**
 * Busca estatísticas do dashboard para os últimos 30 dias
 */
export async function getLast30DaysStats(): Promise<DashboardStats> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const dateRange: DateRange = {
    startDate: thirtyDaysAgo,
    endDate: now,
  };

  return getDashboardStatsByDateRange(dateRange);
}

/**
 * Busca estatísticas do dashboard para o ano atual
 */
export async function getCurrentYearStats(): Promise<DashboardStats> {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const endOfYear = new Date(now.getFullYear(), 11, 31);

  const dateRange: DateRange = {
    startDate: startOfYear,
    endDate: endOfYear,
  };

  return getDashboardStatsByDateRange(dateRange);
}
