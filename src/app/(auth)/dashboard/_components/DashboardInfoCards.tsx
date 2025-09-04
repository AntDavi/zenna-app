import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
} from "lucide-react";
import React from "react";

const DashboardIcons = {
  income: <ArrowUpCircle />,
  expense: <ArrowDownCircle />,
  balance: <DollarSign />,
  total: <Wallet />,
};

export interface DashboardInfoCardsProps {
  title: string;
  amount: number;
  type: "income" | "expense" | "balance" | "total";
  percentage: number;
}

export default function DashboardInfoCards({
  title,
  amount,
  type,
  percentage,
}: DashboardInfoCardsProps) {
  return (
    <Card
      className={
        type === "income"
          ? "bg-green-100"
          : type === "expense"
          ? "bg-red-100"
          : type === "balance"
          ? "bg-blue-100"
          : "bg-gray-100"
      }
    >
      <CardHeader>
        {DashboardIcons[type]}
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {type === "total" ? (
          <p className="text-2xl font-bold">{amount}</p>
        ) : (
          <p className="text-2xl font-bold">
            {amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        )}

        {percentage >= 0 ? (
          <p className="text-green-600 font-medium">
            {`+${percentage.toFixed(1)}%`}
            <span className="text-foreground">
              {" "}
              em relação ao periodo passado
            </span>
          </p>
        ) : (
          <p className="text-red-600 font-medium">
            {`-${Math.abs(percentage).toFixed(1)}%`}
            <span className="text-foreground">
              {" "}
              em relação ao periodo passado
            </span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
