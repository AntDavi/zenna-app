"use client";

import DateFilter, { DateFilterType } from "@/components/DateFilter";
import { useState } from "react";
import DashboardInfoCards from "./_components/DashboardInfoCards";
import DashboardPieChart from "./_components/DashboardPieChart";
import DashboardBarsChart from "./_components/DashboardBarsChart";
import TransactionsDataTable from "@/components/TransactionsDataTable";

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState<DateFilterType>("month");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  return (
    <section className="flex flex-col min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        {/* Filtro de Datas */}
        {/* <DateFilter
          filterType={"today"}
          onFilterChange={function (
            type: DateFilterType,
            startDate?: Date,
            endDate?: Date
          ): void {
            throw new Error("Function not implemented.");
          }}
        /> */}

        {/* Cards de Informação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <DashboardInfoCards
            title="Entradas"
            amount={5000}
            type="income"
            percentage={3}
          />
          <DashboardInfoCards
            title="Saídas"
            amount={3000}
            type="expense"
            percentage={-8}
          />
          <DashboardInfoCards
            title="Balanço"
            amount={2000}
            type="balance"
            percentage={3}
          />
          <DashboardInfoCards
            title="Total"
            amount={10000}
            type="total"
            percentage={2.5}
          />
        </div>

        {/* Gráficos e Outras Informações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
          <DashboardPieChart />
          <DashboardBarsChart />
        </div>

        {/* Transações */}
        <TransactionsDataTable />
      </div>
    </section>
  );
}
