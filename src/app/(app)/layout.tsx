import AppHeader from "@/components/AppHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
