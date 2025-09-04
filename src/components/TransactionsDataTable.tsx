import { Clock, FilterIcon, LogOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TransactionsTable from "./TransactionTable";
import { columns } from "./Columns";
import { mockTransactions } from "@/types/transactions";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function TransactionsDataTable() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Histórico de Transações
        </CardTitle>

        {/* <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm" className="gap-2">
              <FilterIcon className="h-4 w-4" />
              <p>Filtros</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="cursor-pointer flex items-center gap-2">
              <LogOut size={16} />
              Sair
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </CardHeader>

      <CardContent>
        <TransactionsTable columns={columns} data={mockTransactions} />
      </CardContent>
    </Card>
  );
}
