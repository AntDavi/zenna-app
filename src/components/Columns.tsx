"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { ArrowUp, ArrowDown, Edit, Trash2, MoreHorizontal } from "lucide-react";
import { Transaction } from "@/types/transactions";
import { Category } from "@/types/category";
import ModalEditTransaction from "./ModalEditTransaction";
import ModalDeleteTransaction from "./ModalDeleteTransaction";
import { useState } from "react";
import { formatCurrency, formatDate } from "@/lib/formatters";

// Interface para transação com categoria expandida (como vem do Supabase)
interface TransactionWithCategory extends Transaction {
  categories?: Category;
}

// Componente para ações da linha
function RowActions({ transaction }: { transaction: TransactionWithCategory }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-accent"
            aria-label="Abrir menu de ações"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className="cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteOpen(true)}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModalEditTransaction
        transaction={transaction}
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
      />

      <ModalDeleteTransaction
        transaction={transaction}
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
      />
    </>
  );
}

export const columns: ColumnDef<TransactionWithCategory>[] = [
  // 1) tipo (bolinha + seta)
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => {
      const isIncome = row.original.type === "income";
      const Ball = (
        <div
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full",
            isIncome
              ? "bg-emerald-100 dark:bg-emerald-900/30"
              : "bg-rose-100 dark:bg-rose-900/30",
          ].join(" ")}
        >
          {isIncome ? (
            <ArrowUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <ArrowDown className="h-4 w-4 text-rose-600 dark:text-rose-400" />
          )}
          <span className="sr-only">{isIncome ? "Receita" : "Despesa"}</span>
        </div>
      );
      return <div className="flex items-center">{Ball}</div>;
    },
    size: 56,
    enableResizing: false,
    enableSorting: false,
  },
  {
    accessorKey: "category_id",
    header: "Categoria",
    cell: ({ row }) => {
      const category = row.original.categories;
      if (!category) return <span className="text-muted-foreground">—</span>;
      return (
        <Badge className="gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-popover-foreground/10 border border-popover-foreground/20 text-black dark:text-white">
          <span>{category.name}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => (
      <div className="max-w-[340px] truncate">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "transaction_date",
    header: "Data",
    cell: ({ row }) => {
      return (
        <span className="tabular-nums">
          {formatDate(row.original.transaction_date)}
        </span>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {formatCurrency(row.original.amount)}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
        <RowActions transaction={row.original} />
      </div>
    ),
    enableHiding: false,
  },
];
