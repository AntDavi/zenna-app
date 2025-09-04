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
import { getCategoriesByType } from "@/types/categories";
import { Transaction } from "@/types/transactions";

const formatBRL = (value: string) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    Number.parseFloat(value || "0")
  );

const formatDate = (d: Date) =>
  new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" }).format(d);

// busca categoria respeitando o tipo para evitar colisão de IDs
const getCategorySafe = (category_id: string, type: "income" | "expense") =>
  getCategoriesByType(type).find((c) => c.id === category_id);

export const columns: ColumnDef<Transaction>[] = [
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
      const cat = getCategorySafe(row.original.category_id, row.original.type);
      if (!cat) return <span className="text-muted-foreground">—</span>;
      return (
        <Badge className="gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium bg-popover-foreground/10 border border-popover-foreground/20 text-black dark:text-white">
          <span>{cat.name}</span>
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
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => {
      const d =
        row.original.date instanceof Date
          ? row.original.date
          : new Date(row.original.date);
      return <span className="tabular-nums">{formatDate(d)}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium tabular-nums">
        {formatBRL(row.original.amount)}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Ações</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-end">
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
              onClick={() => {
                // Implementar editar
                console.log("Editar transação:", row.original);
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // Implementar excluir
                console.log("Excluir transação:", row.original);
              }}
              className="cursor-pointer text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableHiding: false,
  },
];
