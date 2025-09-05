import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, CreditCard, PieChart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../../utils/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/zenna.svg" alt="Zenna Logo" width={60} height={60} />
          <span className="text-2xl font-bold">Zenna</span>
        </div>
        <div className="flex items-center gap-4">
          {data?.user ? (
            <Button asChild>
              <Link href="/dashboard">Acessar Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Começar Agora</Link>
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Tranquilidade com sua grana
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Gerencie suas finanças pessoais de forma simples e inteligente.
          Controle seus gastos, acompanhe seus investimentos e alcance seus
          objetivos financeiros.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/login">Começar Gratuitamente</Link>
          </Button>
          <Button size="lg" variant="outline">
            Ver Demonstração
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Por que escolher o Zenna?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <PieChart className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Controle Total</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Visualize todos os seus gastos e receitas em um só lugar com
                gráficos intuitivos.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Gestão de Patrimônio</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Acompanhe a evolução do seu patrimônio e tome decisões
                financeiras inteligentes.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Segurança Total</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Seus dados estão protegidos com criptografia de ponta e backup
                automático.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Fácil de Usar</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Interface simples e intuitiva que qualquer pessoa pode usar sem
                complicações.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-primary/5 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar sua vida financeira?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão no controle das suas
            finanças com o Zenna.
          </p>
          <Button size="lg" asChild>
            <Link href="/login">Criar Conta Gratuita</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/zenna.svg" alt="Zenna Logo" width={40} height={40} />
            <span className="font-semibold">Zenna</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Zenna. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
