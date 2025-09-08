"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, RotateCcw } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useDateFilter, DateFilterType } from "@/contexts/DateFilterContext";

export default function DateFilter() {
  const { filterType, dateRange, setFilter, resetFilter } = useDateFilter();

  const handlePresetFilter = (type: DateFilterType) => {
    setFilter(type);
  };

  const handleCustomDateChange = (
    date: Date | undefined,
    isStartDate: boolean
  ) => {
    if (!date) return;

    if (isStartDate) {
      setFilter("custom", date, dateRange.endDate);
    } else {
      setFilter("custom", dateRange.startDate, date);
    }
  };

  return (
    <Card className="p-4 bg-card border border-border rounded-md flex items-center justify-between flex-col md:flex-row">
      <CardHeader className="flex items-center md:justify-start justify-center gap-2 w-full text-muted-foreground">
        <CalendarIcon className="h-5 w-5" />
        <CardTitle className="font-semibold">Filtro de Data:</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3 flex-col md:flex-row w-full md:justify-end">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterType === "today" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetFilter("today")}
          >
            Hoje
          </Button>
          <Button
            variant={filterType === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetFilter("week")}
          >
            Últimos 7 dias
          </Button>
          <Button
            variant={filterType === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetFilter("month")}
          >
            Este mês
          </Button>
          <Button
            variant={filterType === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => handlePresetFilter("year")}
          >
            Este ano
          </Button>
        </div>

        <div className="flex gap-2 items-center flex-wrap">
          <span className="text-sm text-muted-foreground">Personalizado:</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={filterType === "custom" ? "default" : "outline"}
                size="sm"
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.startDate
                  ? format(dateRange.startDate, "dd/MM/yyyy", { locale: ptBR })
                  : "Data inicial"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.startDate}
                onSelect={(date) => handleCustomDateChange(date, true)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <span className="text-sm text-muted-foreground">até</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={filterType === "custom" ? "default" : "outline"}
                size="sm"
                className={cn(
                  "justify-start text-left font-normal",
                  !dateRange.endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.endDate
                  ? format(dateRange.endDate, "dd/MM/yyyy", { locale: ptBR })
                  : "Data final"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.endDate}
                onSelect={(date) => handleCustomDateChange(date, false)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilter}
            className="ml-2"
            title="Resetar filtro"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
