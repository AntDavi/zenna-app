"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  updateCategoryAction,
  deleteCategoryAction,
} from "../_actions/categories";
import { ColorPicker } from "./ColorPicker";

const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .trim(),
  type: z.enum(["income", "expense"]),
  color: z
    .string()
    .regex(
      /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/,
      "Cor deve ser um hexadecimal válido"
    ),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export interface CategorieCardProps {
  id: string;
  title: string;
  type: "income" | "expense";
  color?: string;
}

export const CategorieCard = ({
  id,
  title,
  type,
  color,
}: CategorieCardProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Cor padrão baseada no tipo se não houver cor personalizada
  const defaultColor = type === "income" ? "#22c55e" : "#ef4444";
  const categoryColor = color || defaultColor;

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: title,
      type: type,
      color: categoryColor,
    },
  });

  const handleEdit = async (data: CategoryFormData) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("name", data.name);
      formData.append("type", data.type);
      formData.append("color", data.color);

      const result = await updateCategoryAction(formData);

      if (result.success) {
        toast.success(result.message || "Categoria atualizada com sucesso!");
        setEditOpen(false);
      } else {
        toast.error(result.error || "Erro ao atualizar categoria");
      }
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      toast.error("Erro inesperado ao atualizar categoria");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", id);

      const result = await deleteCategoryAction(formData);

      if (result.success) {
        toast.success(result.message || "Categoria excluída com sucesso!");
      } else {
        toast.error(result.error || "Erro ao excluir categoria");
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
      toast.error("Erro inesperado ao excluir categoria");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full border border-gray-200"
              style={{ backgroundColor: categoryColor }}
            ></div>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">
              {type === "income" ? "Receita" : "Despesa"}
            </span>
          </div>
          <div className="flex gap-1">
            {/* Botão de Editar */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-200"
                >
                  <PenIcon className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Editar Categoria</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleEdit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Categoria</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: Alimentação, Transporte..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                              <SelectItem value="income">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                  Receita
                                </div>
                              </SelectItem>
                              <SelectItem value="expense">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                  Despesa
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cor da Categoria</FormLabel>
                          <FormControl>
                            <ColorPicker
                              color={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditOpen(false)}
                        disabled={loading}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Salvando..." : "Salvar"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>

            {/* Botão de Excluir */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-red-200"
                >
                  <TrashIcon className="h-3 w-3 text-red-600" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza que deseja excluir a categoria &quot;{title}
                    &quot;? Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={loading}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {loading ? "Excluindo..." : "Excluir"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
