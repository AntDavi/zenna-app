import { CategorieCard } from "./CategorieCard";
import { getCategories } from "@/lib/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export async function CategoriesList() {
  try {
    const categories = await getCategories();

    const incomeCategories = categories.filter((cat) => cat.type === "income");
    const expenseCategories = categories.filter(
      (cat) => cat.type === "expense"
    );

    return (
      <div className="grid gap-6 md:grid-cols-2">
        {/* Receitas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              Receitas ({incomeCategories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {incomeCategories.length > 0 ? (
                incomeCategories.map((category) => (
                  <CategorieCard
                    key={category.id}
                    id={category.id}
                    title={category.name}
                    type={category.type}
                    color={category.color}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-sm text-center py-8">
                  Nenhuma categoria de receita criada
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Despesas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              Despesas ({expenseCategories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {expenseCategories.length > 0 ? (
                expenseCategories.map((category) => (
                  <CategorieCard
                    key={category.id}
                    id={category.id}
                    title={category.name}
                    type={category.type}
                    color={category.color}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-sm text-center py-8">
                  Nenhuma categoria de despesa criada
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
    return (
      <div className="text-center p-8">
        <p className="text-red-600">
          Erro ao carregar categorias. Tente novamente.
        </p>
      </div>
    );
  }
}
