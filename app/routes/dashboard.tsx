import { Outlet, redirect } from "@remix-run/react";

import { Sidebar } from "~/components/dashboard/sidebar/sidebar";
import { Topbar } from "~/components/dashboard/topbar/topbar";
import { Loader } from "~/components/shared/loader/loader";

import { getAuthTokens } from "~/lib/utils";
import { refreshAccessToken } from "~/services/auth/auth.service";
import { getUserData } from "~/services/user/user.service";
import { setUserData } from "~/store/auth.store";

export async function clientLoader() {
  const { accessToken, refreshToken } = getAuthTokens();

  if (!accessToken || !refreshToken) {
    return redirect("/auth/login");
  }

  const responses = await Promise.all([
    refreshAccessToken(refreshToken),
    getUserData(),
  ]);

  const [refreshResponse, userResponse] = responses;
  if (refreshResponse.serviceError || userResponse.serviceError) {
    throw new Error("Error al obtener los datos del usuario");
  }

  const token = refreshResponse.serviceData!;
  const userData = userResponse.serviceData!;

  if (!token || !userData) {
    return redirect("/auth/login");
  }

  localStorage.setItem("access_token", token.access_token!);
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
