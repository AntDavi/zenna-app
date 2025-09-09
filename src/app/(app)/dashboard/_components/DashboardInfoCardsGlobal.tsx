"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  TrendingUp,
  TrendingDown,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDateFilter } from "@/contexts/DateFilterContext";
import { DashboardStats } from "@/lib/dashboard";
import { getDashboardStatsByDateRangeAction } from "@/actions/dashboard";
import { Button } from "@/components/ui/button";

const DashboardIcons = {
  income: ArrowUpCircle,
  expense: ArrowDownCircle,
  balance: DollarSign,
  total: Wallet,
};

const IconColors = {
  income: "text-green-600",
  expense: "text-red-600",
  balance: "text-blue-600",
  total: "text-purple-600",
};

const CardStyles = {
  income: "border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50",
  expense: "border-red-200 bg-gradient-to-br from-red-50 to-red-100/50 hover:from-red-100 hover:to-red-200/50",
  balance: "border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50",
  total: "border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50",
};

interface DashboardInfoCardProps {
  title: string;
  value: number;
  type: "income" | "expense" | "balance" | "total";
  percentChange: number;
  isLoading?: boolean;
}

function DashboardInfoCard({
  title,
  value,
  type,
  percentChange,
  isLoading = false,
}: DashboardInfoCardProps) {
  const Icon = DashboardIcons[type];
  const isPositiveChange = percentChange >= 0;
  const TrendIcon = isPositiveChange ? TrendingUp : TrendingDown;

  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-5 w-5 bg-muted rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="h-8 bg-muted rounded w-24 mb-2"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md border-2",
        CardStyles[type]
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", IconColors[type])} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            {type === "total" ? (
              value.toLocaleString("pt-BR")
            ) : (
              value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={isPositiveChange ? "default" : "destructive"}
              className={cn(
                "text-xs font-medium",
                isPositiveChange 
                  ? "bg-green-100 text-green-700 hover:bg-green-200" 
                  : "bg-red-100 text-red-700 hover:bg-red-200"
              )}
            >
              <TrendIcon className="h-3 w-3 mr-1" />
              {isPositiveChange ? "+" : ""}
              {percentChange.toFixed(1)}%
            </Badge>
            <span className="text-xs text-muted-foreground">
              vs. período anterior
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DashboardInfoCardsGlobal() {
  const { dateRange } = useDateFilter();
  const [stats, setStats] = useState<DashboardStats>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    totalTransactions: 0,
    incomeChange: 0,
    expenseChange: 0,
    balanceChange: 0,
    transactionCountChange: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newStats = await getDashboardStatsByDateRangeAction(dateRange);
      setStats(newStats);
    } catch (err) {
      console.error("Erro ao carregar estatísticas:", err);
      setError("Erro ao carregar dados");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [dateRange.startDate, dateRange.endDate]);

  const handleRefresh = () => {
    fetchStats();
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-destructive">
            Erro ao carregar dados
          </h3>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Resumo Financeiro</h3>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
          Atualizar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardInfoCard
          title="Receitas"
          value={stats.totalIncome}
          type="income"
          percentChange={stats.incomeChange}
          isLoading={isLoading}
        />
        <DashboardInfoCard
          title="Despesas"
          value={stats.totalExpenses}
          type="expense"
          percentChange={stats.expenseChange}
          isLoading={isLoading}
        />
        <DashboardInfoCard
          title="Saldo"
          value={stats.balance}
          type="balance"
          percentChange={stats.balanceChange}
          isLoading={isLoading}
        />
        <DashboardInfoCard
          title="Transações"
          value={stats.totalTransactions}
          type="total"
          percentChange={stats.transactionCountChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
