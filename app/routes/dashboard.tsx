import { Outlet, redirect } from "@remix-run/react";

import { Sidebar } from "~/components/dashboard/sidebar/sidebar";
import { Topbar } from "~/components/dashboard/topbar/topbar";
import { Loader } from "~/components/shared/loader/loader";

import { getAuthTokens } from "~/lib/utils";
import { refreshAccessToken } from "~/services/auth/auth.service";
import { getUserData } from "~/services/user/user.service";
import { setUserData } from "~/store/auth.store";

export async function clientLoader() {
  const { refreshToken } = getAuthTokens(); // Only need refresh token initially

  if (!refreshToken) {
    return redirect("/auth/login");
  }

  const refreshResponse = await refreshAccessToken(refreshToken);

  if (
    refreshResponse.serviceError ||
    !refreshResponse.serviceData?.access_token
  ) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return redirect("/auth/login");
  }

  const newAccessToken = refreshResponse.serviceData.access_token;
  localStorage.setItem("access_token", newAccessToken);

  const userResponse = await getUserData();

  if (userResponse.serviceError || !userResponse.serviceData) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return redirect("/auth/login");
  }

  const userData = userResponse.serviceData;
  setUserData(userData);

  return null;
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40">
      <Loader size="lg" text="Cargando el panel..." />
    </div>
  );
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
