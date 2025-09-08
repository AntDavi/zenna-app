"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { updateTransactionAction } from "@/app/(app)/dashboard/_actions/transactions";
import { getCategories } from "@/lib/categories";
import { Category } from "@/types/category";
import { Transaction } from "@/types/transactions";
import { formatDateForInput, parseTransactionDate } from "@/lib/formatters";

// Schema de validação do formulário
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
  type: z.enum(["income", "expense"]),
  transaction_date: z.string().min(1, "Data é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

interface ModalEditTransactionProps {
  transaction: Transaction;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ModalEditTransaction({
  transaction,
  isOpen,
  onOpenChange,
}: ModalEditTransactionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: transaction.description,
      category_id: transaction.category_id,
      type: transaction.type,
      transaction_date: transaction.transaction_date.split("T")[0], // Remove time part
    },
  });

  // Carregar categorias
  useEffect(() => {
    async function loadCategories() {
      try {
        const allCategories = await getCategories();
        setCategories(allCategories);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
        toast.error("Erro ao carregar categorias");
      }
    }
    loadCategories();
  }, []);

  // Atualizar formulário quando a transação mudar
  useEffect(() => {
    if (transaction) {
      const formattedAmount = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(transaction.amount);

      // Formatar data para input de data (yyyy-mm-dd no timezone local)
      const transactionDate = parseTransactionDate(
        transaction.transaction_date
      );
      const localDateString = formatDateForInput(transactionDate);

      form.reset({
        amount: formattedAmount,
        description: transaction.description,
        category_id: transaction.category_id,
        type: transaction.type,
        transaction_date: localDateString,
      });
    }
  }, [transaction, form]);

  // Função para formatar valor monetário
  const formatCurrency = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");

    // Se vazio, retorna vazio
    if (!numbers) return "";

    // Converte para centavos apenas se necessário
    const amount = parseInt(numbers);

    // Se o valor já tem mais de 2 dígitos, assume que está em centavos
    // Se tem 1-2 dígitos, trata como valor inteiro
    const finalAmount = numbers.length > 2 ? amount / 100 : amount;

    // Formata para moeda brasileira
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(finalAmount);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    form.setValue("amount", formatted);
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      // Criar FormData para server action
      const formData = new FormData();
      formData.append("id", transaction.id);
      formData.append("amount", values.amount);
      formData.append("description", values.description);
      formData.append("category_id", values.category_id);
      formData.append("type", values.type);
      formData.append("transaction_date", values.transaction_date);

      const result = await updateTransactionAction(formData);

      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      toast.error("Erro inesperado ao atualizar transação");
    } finally {
      setIsLoading(false);
    }
  };

  // Filtrar categorias por tipo
  const filteredCategories = categories.filter(
    (cat) => cat.type === form.watch("type")
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5 text-blue-600" />
            Editar Transação
          </DialogTitle>
          <DialogDescription>Atualize os dados da transação.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="income">Receita</SelectItem>
                      <SelectItem value="expense">Despesa</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="Descrição da transação..."
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
                      {filteredCategories.map((category) => (
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
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
