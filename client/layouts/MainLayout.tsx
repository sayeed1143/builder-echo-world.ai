import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";

export function MainLayout() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="relative z-10 mx-auto flex min-h-screen w-full flex-col gap-4 p-4">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
