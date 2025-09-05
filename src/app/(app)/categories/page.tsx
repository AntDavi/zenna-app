import { getCategories } from "@/lib/categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ModalAddCategorie from "./_components/ModalAddCategorie";
import { CategorieCard } from "./_components/CategorieCard";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function CategoriesList() {
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

function CategoriesLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-18" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-18" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Categories() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categorias</h1>
          <p className="text-muted-foreground">
            Gerencie suas categorias de receitas e despesas
          </p>
        </div>
        <ModalAddCategorie />
      </div>

      <Suspense fallback={<CategoriesLoading />}>
        <CategoriesList />
      </Suspense>
    </div>
  );
}
