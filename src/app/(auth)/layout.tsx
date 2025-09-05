import { redirect } from "next/navigation";
import { createClient } from "../../../utils/supabase/server";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  // Se o usuário já está logado, redireciona para o dashboard
  if (data?.user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
