"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type DateFilterType = "today" | "week" | "month" | "year" | "custom";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface DateFilterContextType {
  filterType: DateFilterType;
  dateRange: DateRange;
  setFilter: (type: DateFilterType, startDate?: Date, endDate?: Date) => void;
  resetFilter: () => void;
}

const DateFilterContext = createContext<DateFilterContextType | undefined>(
  undefined
);

export function useDateFilter() {
  const context = useContext(DateFilterContext);
  if (context === undefined) {
    throw new Error("useDateFilter must be used within a DateFilterProvider");
  }
  return context;
}

interface DateFilterProviderProps {
  children: React.ReactNode;
}

export function DateFilterProvider({ children }: DateFilterProviderProps) {
  const [filterType, setFilterType] = useState<DateFilterType>("month");
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    // Inicializar com o mês atual
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    return {
      startDate: startOfMonth,
      endDate: endOfMonth,
    };
  });

  const calculateDateRange = (type: DateFilterType): DateRange => {
    const today = new Date();
    let startDate: Date;
    let endDate: Date = today;

    switch (type) {
      case "today":
        startDate = new Date(today);
        endDate = new Date(today);
        break;
      case "week":
        startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        endDate = today;
        break;
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "year":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = new Date(today.getFullYear(), 11, 31);
        break;
      default:
        // Para custom, mantém as datas atuais
        return dateRange;
    }

    return { startDate, endDate };
  };

  const setFilter = (
    type: DateFilterType,
    customStartDate?: Date,
    customEndDate?: Date
  ) => {
    setFilterType(type);

    if (type === "custom" && customStartDate && customEndDate) {
      setDateRange({
        startDate: customStartDate,
        endDate: customEndDate,
      });
    } else if (type === "custom" && customStartDate) {
      setDateRange((prev) => ({
        ...prev,
        startDate: customStartDate,
      }));
    } else if (type === "custom" && customEndDate) {
      setDateRange((prev) => ({
        ...prev,
        endDate: customEndDate,
      }));
    } else {
      const newRange = calculateDateRange(type);
      setDateRange(newRange);
    }
  };

  const resetFilter = () => {
    setFilterType("month");
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    setDateRange({
      startDate: startOfMonth,
      endDate: endOfMonth,
    });
  };

  // Sincronizar localStorage (opcional - para persistir filtros)
  useEffect(() => {
    const savedFilter = localStorage.getItem("dateFilter");
    if (savedFilter) {
      try {
        const parsed = JSON.parse(savedFilter);
        setFilterType(parsed.filterType);
        setDateRange({
          startDate: new Date(parsed.startDate),
          endDate: new Date(parsed.endDate),
        });
      } catch (error) {
        console.error("Erro ao carregar filtro salvo:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "dateFilter",
      JSON.stringify({
        filterType,
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
      })
    );
  }, [filterType, dateRange]);

  const value: DateFilterContextType = {
    filterType,
    dateRange,
    setFilter,
    resetFilter,
  };

  return (
    <DateFilterContext.Provider value={value}>
      {children}
    </DateFilterContext.Provider>
  );
}
