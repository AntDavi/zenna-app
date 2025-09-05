"use server";

import { createClient } from "../../utils/supabase/server";
import { CategoryInsert, CategoryUpdate } from "@/types/category";
import { revalidatePath } from "next/cache";

export async function createCategory(data: Omit<CategoryInsert, "user_id">) {
  const supabase = await createClient();

  // Verificar se o usuário está autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Usuário não autenticado");
  }

  // Inserir a categoria
  const { data: category, error } = await supabase
    .from("categories")
    .insert({
      ...data,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar categoria:", error);
    throw new Error("Erro ao criar categoria: " + error.message);
  }

  // Revalidar a página para atualizar a lista
  revalidatePath("/categories");
  revalidatePath("/dashboard");

  return category;
}

export async function getCategories() {
  const supabase = await createClient();

  // Verificar se o usuário está autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Usuário não autenticado");
  }

  // Buscar categorias do usuário
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar categorias:", error);
    throw new Error("Erro ao buscar categorias: " + error.message);
  }

  return categories || [];
}

export async function getCategoriesByType(type: "income" | "expense") {
  const supabase = await createClient();

  // Verificar se o usuário está autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Usuário não autenticado");
  }

  // Buscar categorias do usuário por tipo
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", user.id)
    .eq("type", type)
    .order("name", { ascending: true });

  if (error) {
    console.error("Erro ao buscar categorias por tipo:", error);
    throw new Error("Erro ao buscar categorias por tipo: " + error.message);
  }

  return categories || [];
}

export async function updateCategory(id: string, data: CategoryUpdate) {
  const supabase = await createClient();

  // Verificar se o usuário está autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Usuário não autenticado");
  }

  // Atualizar a categoria
  const { data: category, error } = await supabase
    .from("categories")
    .update(data)
    .eq("id", id)
    .eq("user_id", user.id) // Garantir que só o dono pode editar
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar categoria:", error);
    throw new Error("Erro ao atualizar categoria: " + error.message);
  }

  // Revalidar a página para atualizar a lista
  revalidatePath("/categories");
  revalidatePath("/dashboard");

  return category;
}

export async function deleteCategory(id: string) {
  const supabase = await createClient();

  // Verificar se o usuário está autenticado
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Usuário não autenticado");
  }

  // Deletar a categoria
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Garantir que só o dono pode deletar

  if (error) {
    console.error("Erro ao deletar categoria:", error);
    throw new Error("Erro ao deletar categoria: " + error.message);
  }

  // Revalidar a página para atualizar a lista
  revalidatePath("/categories");
  revalidatePath("/dashboard");

  return { success: true };
}
