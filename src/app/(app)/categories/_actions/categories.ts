"use server";

import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/categories";
import { z } from "zod";

// Schema de validação server-side
const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .trim(),
  type: z.enum(["income", "expense"]),
});

export async function addCategoryAction(formData: FormData) {
  try {
    // Validar os dados do formulário
    const validatedFields = categorySchema.safeParse({
      name: formData.get("name"),
      type: formData.get("type"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          "Dados inválidos: " +
          validatedFields.error.issues.map((err) => err.message).join(", "),
      };
    }

    // Criar a categoria
    const category = await createCategory(validatedFields.data);

    return {
      success: true,
      data: category,
      message: "Categoria criada com sucesso!",
    };
  } catch (error) {
    console.error("Erro na action de criar categoria:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function updateCategoryAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return {
        success: false,
        error: "ID da categoria é obrigatório",
      };
    }

    // Validar os dados do formulário
    const validatedFields = categorySchema.safeParse({
      name: formData.get("name"),
      type: formData.get("type"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          "Dados inválidos: " +
          validatedFields.error.issues.map((err) => err.message).join(", "),
      };
    }

    // Atualizar a categoria
    const category = await updateCategory(id, validatedFields.data);

    return {
      success: true,
      data: category,
      message: "Categoria atualizada com sucesso!",
    };
  } catch (error) {
    console.error("Erro na action de atualizar categoria:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function deleteCategoryAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return {
        success: false,
        error: "ID da categoria é obrigatório",
      };
    }

    // Deletar a categoria
    await deleteCategory(id);

    return {
      success: true,
      message: "Categoria excluída com sucesso!",
    };
  } catch (error) {
    console.error("Erro na action de deletar categoria:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
