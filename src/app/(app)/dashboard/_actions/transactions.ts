"use server";

import {
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/lib/transactions";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// Schema de validação server-side para transações
const transactionSchema = z.object({
  amount: z
    .string()
    .min(1, "Valor é obrigatório")
    .transform((val) => {
      console.log("🔄 [Schema] Valor original recebido:", val);

      // Remove todos os caracteres que não são dígitos, vírgula ou ponto
      const cleaned = val.replace(/[^\d.,]/g, "");
      console.log("🔄 [Schema] Valor após limpeza:", cleaned);

      // Para valores brasileiros como "2.000,00", precisamos converter corretamente
      let normalized: string;

      // Se tem ponto E vírgula (ex: "2.000,00"), é formato brasileiro
      if (cleaned.includes(".") && cleaned.includes(",")) {
        // Remove pontos (separadores de milhares) e troca vírgula por ponto
        normalized = cleaned.replace(/\./g, "").replace(",", ".");
      }
      // Se só tem vírgula (ex: "2000,00"), substitui por ponto
      else if (cleaned.includes(",") && !cleaned.includes(".")) {
        normalized = cleaned.replace(",", ".");
      }
      // Se só tem ponto, verifica se é separador decimal ou de milhares
      else if (cleaned.includes(".")) {
        const parts = cleaned.split(".");
        // Se tem mais de 2 dígitos após o último ponto, é separador de milhares
        if (parts.length > 1 && parts[parts.length - 1].length > 2) {
          normalized = cleaned.replace(/\./g, "");
        } else {
          normalized = cleaned; // Já está correto
        }
      }
      // Se só tem números, está correto
      else {
        normalized = cleaned;
      }

      console.log("🔄 [Schema] Valor normalizado:", normalized);

      const parsed = parseFloat(normalized);
      console.log("🔄 [Schema] Valor parseado:", parsed);

      if (isNaN(parsed) || parsed <= 0) {
        throw new Error("Valor deve ser um número positivo");
      }

      console.log("🔄 [Schema] Valor final para banco:", parsed);
      return parsed;
    }),
  description: z
    .string()
    .min(3, "Descrição deve ter pelo menos 3 caracteres")
    .max(200, "Descrição deve ter no máximo 200 caracteres")
    .trim(),
  category_id: z.string().min(1, "Categoria é obrigatória"),
  type: z.enum(["income", "expense"], {
    message: "Tipo deve ser receita ou despesa",
  }),
  transaction_date: z
    .string()
    .min(1, "Data é obrigatória")
    .refine((date) => {
      const parsed = new Date(date);
      return !isNaN(parsed.getTime());
    }, "Data inválida"),
});

export async function addTransactionAction(formData: FormData) {
  try {
    console.log("🚀 [ServerAction] Dados recebidos do FormData:");
    console.log("  - amount:", formData.get("amount"));
    console.log("  - description:", formData.get("description"));
    console.log("  - category_id:", formData.get("category_id"));
    console.log("  - type:", formData.get("type"));
    console.log("  - transaction_date:", formData.get("transaction_date"));

    // Validar os dados do formulário
    const validatedFields = transactionSchema.safeParse({
      amount: formData.get("amount"),
      description: formData.get("description"),
      category_id: formData.get("category_id"),
      type: formData.get("type"),
      transaction_date: formData.get("transaction_date"),
    });

    if (!validatedFields.success) {
      console.log(
        "❌ [ServerAction] Validação falhou:",
        validatedFields.error.issues
      );
      return {
        success: false,
        error:
          "Dados inválidos: " +
          validatedFields.error.issues.map((err) => err.message).join(", "),
      };
    }

    console.log(
      "✅ [ServerAction] Dados validados com sucesso:",
      validatedFields.data
    );

    // Criar a transação
    const transaction = await createTransaction(validatedFields.data);

    console.log("📝 [ServerAction] Transação criada no banco:", transaction);

    revalidatePath("/dashboard");
    revalidatePath("/transactions");

    return {
      success: true,
      data: transaction,
      message: "Transação criada com sucesso!",
    };
  } catch (error) {
    console.error("Erro na action de criar transação:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function updateTransactionAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return {
        success: false,
        error: "ID da transação é obrigatório",
      };
    }

    // Validar os dados do formulário
    const validatedFields = transactionSchema.safeParse({
      amount: formData.get("amount"),
      description: formData.get("description"),
      category_id: formData.get("category_id"),
      type: formData.get("type"),
      transaction_date: formData.get("transaction_date"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          "Dados inválidos: " +
          validatedFields.error.issues.map((err) => err.message).join(", "),
      };
    }

    // Atualizar a transação
    const transaction = await updateTransaction(id, validatedFields.data);

    revalidatePath("/dashboard");
    revalidatePath("/transactions");

    return {
      success: true,
      data: transaction,
      message: "Transação atualizada com sucesso!",
    };
  } catch (error) {
    console.error("Erro na action de atualizar transação:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function deleteTransactionAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;

    if (!id) {
      return {
        success: false,
        error: "ID da transação é obrigatório",
      };
    }

    // Deletar a transação
    await deleteTransaction(id);

    revalidatePath("/dashboard");
    revalidatePath("/transactions");

    return {
      success: true,
      message: "Transação excluída com sucesso!",
    };
  } catch (error) {
    console.error("Erro na action de deletar transação:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
