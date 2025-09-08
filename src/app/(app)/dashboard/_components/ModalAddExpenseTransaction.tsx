"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { addTransactionAction } from "../_actions/transactions";
import { getCategoriesByType } from "@/lib/categories";
import { Category } from "@/types/category";
import { formatDateForInput } from "@/lib/formatters";

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Valor é obrigatório")
    .refine((val) => {
      const cleaned = val.replace(/[^\d.,]/g, "");
      const normalized = cleaned.replace(",", ".");
      const parsed = parseFloat(normalized);
      return !isNaN(parsed) && parsed > 0;
    }, "Valor deve ser um número positivo"),
  description: z
    .string()
    .min(3, "Descrição deve ter pelo menos 3 caracteres")
    .max(200, "Descrição deve ter no máximo 200 caracteres"),
  category_id: z.string().min(1, "Categoria é obrigatória"),
  transaction_date: z.string().min(1, "Data é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ModalAddExpenseTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
      category_id: "",
      transaction_date: formatDateForInput(),
    },
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        const expenseCategories = await getCategoriesByType("expense");
        setCategories(expenseCategories);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        toast.error("Erro ao carregar categorias");
      }
    }
    loadCategories();
  }, []);

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return "";
    const amount = parseInt(numbers) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("🔢 [ModalAddExpense] Input original:", e.target.value);
    const formatted = formatCurrency(e.target.value);
    console.log("🔢 [ModalAddExpense] Valor formatado:", formatted);
    form.setValue("amount", formatted);
  };

  const onSubmit = async (values: FormValues) => {
    console.log("📝 [ModalAddExpense] Valores do formulário:", values);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("amount", values.amount);
      formData.append("description", values.description);
      formData.append("category_id", values.category_id);
      formData.append("type", "expense");
      formData.append("transaction_date", values.transaction_date);

      console.log("📋 [ModalAddExpense] FormData sendo enviada:");
      console.log("  - amount:", values.amount);
      console.log("  - description:", values.description);
      console.log("  - category_id:", values.category_id);
      console.log("  - type: expense");
      console.log("  - transaction_date:", values.transaction_date);

      const result = await addTransactionAction(formData);

      if (result.success) {
        toast.success(result.message);
        form.reset();
        setIsOpen(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Erro ao criar transação:", error);
      toast.error("Erro inesperado ao criar transação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <TrendingDown className="w-4 h-4 mr-2" />
          Nova Despesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            Nova Despesa
          </DialogTitle>
          <DialogDescription>
            Adicione uma nova despesa ao seu controle financeiro.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="R$ 0,00"
                      {...field}
                      onChange={handleAmountChange}
                      className="text-right font-mono"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Ex: Supermercado, combustível, conta de luz..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transaction_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isLoading ? "Salvando..." : "Salvar Despesa"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
