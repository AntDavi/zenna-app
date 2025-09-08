"use client";

import ModalAddIncomeTransaction from "./ModalAddIncomeTransaction";
import ModalAddExpenseTransaction from "./ModalAddExpenseTransaction";

interface ModalAddTransactionProps {
  type?: "income" | "expense" | "both";
}

export default function ModalAddTransaction({
  type = "both",
}: ModalAddTransactionProps) {
  if (type === "income") {
    return <ModalAddIncomeTransaction />;
  }

  if (type === "expense") {
    return <ModalAddExpenseTransaction />;
  }

  // Mostrar ambos os botões
  return (
    <div className="flex gap-2">
      <ModalAddIncomeTransaction />
      <ModalAddExpenseTransaction />
    </div>
  );
}
