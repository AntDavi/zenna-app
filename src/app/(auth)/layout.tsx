import AppHeader from "@/components/AppHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <AppHeader />
        <main className="w-full">
          <div className="p-6 ">{children}</div>
        </main>
      </body>
    </html>
  );
}
