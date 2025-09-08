import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ModalAddCategorie from "./_components/ModalAddCategorie";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoriesList } from "./_components/CategorieList";

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
