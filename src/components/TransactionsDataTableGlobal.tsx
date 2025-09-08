"use client";

import { Clock, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TransactionsTable from "./TransactionTable";
import { columns } from "./Columns";
import { getTransactionsByDateRangeAction } from "@/actions/transactions";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { useDateFilter } from "@/contexts/DateFilterContext";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/transactions";
import { cn } from "@/lib/utils";

function TransactionsTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-8 w-8" />
        </div>
      ))}
    </div>
  );
}

export default function TransactionsDataTableGlobal() {
  const { dateRange } = useDateFilter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const startDate = dateRange.startDate.toISOString().split("T")[0];
      const endDate = dateRange.endDate.toISOString().split("T")[0];
      
      const data = await getTransactionsByDateRangeAction(startDate, endDate);
      setTransactions(data);
    } catch (err) {
      console.error("Erro ao carregar transações:", err);
      setError("Erro ao carregar transações");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [dateRange.startDate, dateRange.endDate]);

  const handleRefresh = () => {
    fetchTransactions();
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Histórico de Transações
        </CardTitle>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
          Atualizar
        </Button>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <TransactionsTableSkeleton />
        ) : error ? (
          <div className="text-center p-8">
            <p className="text-red-600 mb-4">{error}</p>
            <Button variant="outline" onClick={handleRefresh}>
              Tentar novamente
            </Button>
          </div>
        ) : (
          <TransactionsTable columns={columns} data={transactions} />
        )}
      </CardContent>
    </Card>
  );
}
