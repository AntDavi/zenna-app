import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ptBR } from "date-fns/locale";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export type DateFilterType = "today" | "week" | "month" | "custom";

interface DateFilterProps {
  filterType: DateFilterType;
  startDate?: Date;
  endDate?: Date;
  onFilterChange: (
    type: DateFilterType,
    startDate?: Date,
    endDate?: Date
  ) => void;
}

export default function DateFilter({
  filterType,
  startDate,
  endDate,
  onFilterChange,
}: DateFilterProps) {
  const handlePresetFilter = (type: DateFilterType) => {
    const today = new Date();
    let start: Date;
    const end: Date = today;

    switch (type) {
      case "today":
        start = today;
        break;
      case "week":
        start = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      default:
        return;
    }

    onFilterChange(type, start, end);
  };

  const handleCustomDateChange = (
    date: Date | undefined,
    isStartDate: boolean
  ) => {
    if (isStartDate) {
      onFilterChange("custom", date, endDate);
    } else {
      onFilterChange("custom", startDate, date);
    }
  };

  return (
    <Card className="p-4 bg-card border border-border rounded-md flex items-center justify-between flex-col md:flex-row ">
      <CardHeader className="flex items-center md:justify-start justify-center gap-2 w-full text-muted-foreground">
        <CalendarIcon className="h-5 w-5 " />
        <CardTitle className="font-semibold">Filtro de Data:</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-3 flex-col md:flex-row w-full md:justify-end">
        <div className="flex gap-2">
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
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-foreground">Personalizado:</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate
                  ? format(startDate, "dd/MM/yyyy", { locale: ptBR })
                  : "Data inicial"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => handleCustomDateChange(date, true)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate
                  ? format(endDate, "dd/MM/yyyy", { locale: ptBR })
                  : "Data final"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => handleCustomDateChange(date, false)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
}
