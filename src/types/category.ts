export interface Category {
  id: string;
  user_id: string;
  name: string;
  type: "income" | "expense";
  created_at: string;
  updated_at: string;
}

export interface CategoryInsert {
  name: string;
  type: "income" | "expense";
  user_id: string;
}

export interface CategoryUpdate {
  name?: string;
  type?: "income" | "expense";
}

export type CategoryType = "income" | "expense";
