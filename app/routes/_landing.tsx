import { Outlet } from "@remix-run/react";
import { Header } from "~/components/shared/header/header";
import { Footer } from "~/components/shared/footer/footer";

export default function LandingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="container mx-auto flex-grow px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
