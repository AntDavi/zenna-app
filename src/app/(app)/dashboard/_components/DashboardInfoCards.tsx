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
  value: number;
  type: "income" | "expense" | "balance" | "total";
  percentChange: number;
}

export default function DashboardInfoCards({
  title,
  value,
  type,
  percentChange,
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
          <p className="text-2xl font-bold">{value}</p>
        ) : (
          <p className="text-2xl font-bold">
            {value.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        )}

        {percentChange >= 0 ? (
          <p className="text-green-600 font-medium">
            {`+${percentChange.toFixed(1)}%`}
            <span className="text-foreground">
              {" "}
              em relação ao periodo passado
            </span>
          </p>
        ) : (
          <p className="text-red-600 font-medium">
            {`-${Math.abs(percentChange).toFixed(1)}%`}
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
