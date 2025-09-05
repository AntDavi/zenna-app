import AppHeader from "@/components/AppHeader";
import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <html lang="pt-br">
      <body>
        <main className="w-full">
          <AppHeader />
          <div className="p-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
