import { Outlet } from "@remix-run/react";

export default function LandingLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      {/* Main content */}
      <main className="container mx-auto flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
