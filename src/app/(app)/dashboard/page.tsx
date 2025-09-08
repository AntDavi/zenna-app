import DashboardPieChart from "./_components/DashboardPieChart";
import DashboardBarsChart from "./_components/DashboardBarsChart";
import TransactionsDataTable from "@/components/TransactionsDataTable";
import ModalAddTransaction from "./_components/ModalAddTransaction";
import { DashboardInfoCards } from "./_components/DashboardInfoCards";

export default function Dashboard() {
  return (
    <section className="flex flex-col min-h-screen">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mt-8 flex-col md:flex-row">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="flex flex-row md:items-center mb-4 gap-4">
            <ModalAddTransaction />
          </div>
        </div>

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
            value={5000}
            type="income"
            percentChange={3}
          />
          <DashboardInfoCards
            title="Saídas"
            value={3000}
            type="expense"
            percentChange={-8}
          />
          <DashboardInfoCards
            title="Balanço"
            value={2000}
            type="balance"
            percentChange={3}
          />
          <DashboardInfoCards
            title="Total"
            value={10000}
            type="neutral"
            percentChange={2.5}
          />
        </div>

        {/* Gráficos e Outras Informações */}
        <div className="flex flex-col gap-4 mt-6 mb-6">
          <DashboardPieChart />
          <DashboardBarsChart />
        </div>

        {/* Transações */}
        <TransactionsDataTable />
      </div>
    </section>
  );
}
