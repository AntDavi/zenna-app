"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Janeiro", expense: 186, income: 80, balance: 106 },
  { month: "Fevereiro", expense: 305, income: 200, balance: -105 },
  { month: "Março", expense: 237, income: 120, balance: -117 },
  { month: "Abril", expense: 73, income: 190, balance: 117 },
  { month: "Maio", expense: 209, income: 130, balance: -79 },
  { month: "Junho", expense: 214, income: 140, balance: -74 },
  { month: "Julho", expense: 200, income: 150, balance: -50 },
  { month: "Agosto", expense: 250, income: 180, balance: -70 },
  { month: "Setembro", expense: 300, income: 200, balance: -100 },
  { month: "Outubro", expense: 400, income: 300, balance: -100 },
  { month: "Novembro", expense: 350, income: 250, balance: -100 },
  { month: "Dezembro", expense: 300, income: 400, balance: 100 },
];

const chartConfig = {
  income: { label: "Receita", color: "var(--income)" },
  expense: { label: "Despesa", color: "var(--expense)" },
  balance: { label: "Balanço", color: "var(--balance-positive)" },
} satisfies ChartConfig;

// Função para retornar a cor baseada no valor do balanço
const getBalanceColor = (balance: number) => {
  return balance >= 0
    ? "var(--color-balance-positive)"
    : "var(--color-balance-negative)";
};

export default function DashboardBarsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          Comparativo de Período
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="">
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => String(value).slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="income" fill="var(--color-income)" radius={4} />
              <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
              <Bar dataKey="balance" radius={4}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBalanceColor(entry.balance)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
