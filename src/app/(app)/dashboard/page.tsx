import DashboardPieChart from "./_components/DashboardPieChart";
import TransactionsDataTableGlobal from "@/components/TransactionsDataTableGlobal";
import ModalAddTransaction from "./_components/ModalAddTransaction";

import DateFilter from "@/components/DateFilter";
import DashboardInfoCardsGlobal from "./_components/DashboardInfoCardsGlobal";

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

        {/* Filtro de Datas Global */}
        <div className="mb-6">
          <DateFilter />
        </div>

        {/* Cards de Informação com filtro global */}
        <div className="mb-6">
          <DashboardInfoCardsGlobal />
        </div>

        {/* Gráficos e Outras Informações */}
        <div className="flex flex-col gap-4 mt-6 mb-6">
          <DashboardPieChart />
        </div>

        {/* Transações com filtro global */}
        <TransactionsDataTableGlobal />
      </div>
    </section>
  );
}
