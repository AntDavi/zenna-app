import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TransactionsTable from "./TransactionTable";
import { columns } from "./Columns";
import { getTransactions } from "@/lib/transactions";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

async function TransactionsList() {
  try {
    const transactions = await getTransactions();

    return <TransactionsTable columns={columns} data={transactions} />;
  } catch (error) {
    console.error("Erro ao carregar transações:", error);
    return (
      <div className="text-center p-8">
        <p className="text-red-600">
          Erro ao carregar transações. Tente novamente.
        </p>
      </div>
    );
  }
}

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

export default function TransactionsDataTable() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Histórico de Transações
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<TransactionsTableSkeleton />}>
          <TransactionsList />
        </Suspense>
      </CardContent>
    </Card>
  );
}
