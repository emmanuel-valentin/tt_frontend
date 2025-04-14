import { Outlet, redirect } from "@remix-run/react";

import { Sidebar } from "~/components/dashboard/sidebar/sidebar";
import { Topbar } from "~/components/dashboard/topbar/topbar";
import { getAuthTokens } from "~/lib/utils";
import { refreshAccessToken } from "~/services/auth/auth.service";

export async function clientLoader() {
  const { accessToken, refreshToken } = getAuthTokens();

  if (!accessToken || !refreshToken) {
    return redirect("/auth/login");
  }

  const { serviceData, serviceError } = await refreshAccessToken(refreshToken);

  if (serviceData?.access_token) {
    localStorage.setItem("access_token", serviceData.access_token);
  } else if (serviceError) {
    return redirect("/auth/login");
  }

  // TODO: Get user profile and store it to a global state.

  return null;
}

export default function DashboardLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="mx-auto p-4 w-full bg-muted/60 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
