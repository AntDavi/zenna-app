/**
 * Utilitários para formatação de dados
 */

/**
 * Formata valor monetário para moeda brasileira
 */
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

/**
 * Formata data para exibição no formato brasileiro
 * Evita problemas de timezone ao interpretar datas no formato YYYY-MM-DD
 */
export const formatDate = (dateString: string): string => {
  // Para evitar problemas de timezone, criamos a data manualmente
  // assumindo que a data já está no timezone local
  const [year, month, day] = dateString.split("T")[0].split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(date);
};

/**
 * Formata data para input de data (yyyy-mm-dd) no timezone local
 */
export const formatDateForInput = (date: Date = new Date()): string => {
  return date.toLocaleDateString("en-CA");
};

/**
 * Converte data do banco (que pode ter timezone) para formato local
 */
export const parseTransactionDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};
