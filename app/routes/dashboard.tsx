import { Outlet } from "@remix-run/react";

import { Sidebar } from "~/components/dashboard/sidebar/sidebar";
import { Topbar } from "~/components/dashboard/topbar/topbar";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="mx-auto p-4 w-full bg-muted/60 overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
