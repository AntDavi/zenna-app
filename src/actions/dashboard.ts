"use server";

import { getDashboardStatsByDateRange, DashboardStats } from "@/lib/dashboard";
import { DateRange } from "@/contexts/DateFilterContext";

export async function getDashboardStatsByDateRangeAction(
  dateRange: DateRange
): Promise<DashboardStats> {
  try {
    return await getDashboardStatsByDateRange(dateRange);
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    throw new Error("Erro ao buscar estatísticas do dashboard");
  }
}
