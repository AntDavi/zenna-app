"use client";

import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Transaction } from "@/types/transactions";
import { Category } from "@/types/category";

// Interface para transação com categoria expandida (como vem do Supabase)
interface TransactionWithCategory extends Transaction {
  categories?: Category;
}

interface Props {
  columns: ColumnDef<TransactionWithCategory, unknown>[];
  data: TransactionWithCategory[];
}

export default function TransactionsTable({ columns, data }: Props) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10, // fixo: 10 por página
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
  });

  const page = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();
  const firstIdx = pagination.pageIndex * pagination.pageSize + 1;
  const lastIdx = firstIdx + table.getRowModel().rows.length - 1;
  const total = data.length;

  return (
    <div className="rounded-xl border bg-card">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableHead key={header.id} className="whitespace-nowrap">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                Nenhuma transação encontrada.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginação */}
      <div className="flex flex-col gap-3 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          {total > 0 ? (
            <>
              Página <span className="font-medium">{page}</span> de{" "}
              <span className="font-medium">{pageCount || 1}</span>
              <span className="mx-2">·</span>
              Exibindo{" "}
              <span className="font-medium">
                {total ? `${firstIdx}–${lastIdx}` : 0}
              </span>{" "}
              de <span className="font-medium">{total}</span>
            </>
          ) : (
            "Nenhuma transação para exibir"
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
