import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, DollarSign } from "lucide-react";

export interface FinancialCardProps {
  type: "income" | "expense" | "balance" | "neutral";
  title: string;
  value: number;
  percentChange: number; // Ex: -8.2 ou 12.5
  isLoading?: boolean;
  icon?: React.ElementType;
  className?: string;
}

export function DashboardInfoCards({
  type,
  title,
  value,
  percentChange,
  isLoading = false,
  icon,
  className = "",
}: FinancialCardProps) {
  const Icon =
    icon ||
    (type === "income"
      ? TrendingUp
      : type === "expense"
      ? TrendingDown
      : type === "balance"
      ? DollarSign
      : Wallet);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(val);
  };

  // Cor da porcentagem
  const percentColor =
    percentChange > 0
      ? "text-green-500"
      : percentChange < 0
      ? "text-red-500"
      : "text-muted-foreground";
  const percentPrefix = percentChange > 0 ? "+" : "";

  return (
    <Card
      className={`shadow-sm border-border transition-all duration-300
                ${type === "income" ? "border-l-4 border-l-income" : ""}
                ${type === "expense" ? "border-l-4 border-l-expense" : ""}
                ${
                  type === "balance"
                    ? value < 0
                      ? "border-l-4 border-l-expense"
                      : "border-l-4 border-l-income"
                    : ""
                }
                ${type === "neutral" ? "border-l-4 border-l-neutral" : ""}
                ${className}`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium text-card-foreground">
          {title}
        </CardTitle>
        <div
          className={`p-2 rounded-lg
                    ${type === "income" ? "bg-income-light text-income" : ""}
                    ${type === "expense" ? "bg-expense-light text-expense" : ""}
                    ${
                      type === "balance"
                        ? value < 0
                          ? "bg-expense-light text-expense"
                          : "bg-income-light text-income"
                        : ""
                    }
                    ${
                      type === "neutral" ? "bg-muted text-muted-foreground" : ""
                    }
                `}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">
          {isLoading ? (
            <div className="h-8 bg-muted rounded animate-pulse" />
          ) : type === "neutral" ? (
            value
          ) : (
            formatCurrency(value)
          )}
        </div>
        <p className={`text-xs flex items-center gap-1 mt-1 ${percentColor}`}>
          <span>
            {percentPrefix}
            {percentChange}%
          </span>
          <span className="text-muted-foreground">vs período anterior</span>
        </p>
      </CardContent>
    </Card>
  );
}
