import { Outlet, redirect, useMatches } from "@remix-run/react";
import { AppSidebar } from "~/components/dashboard/sidebar/app-sidebar";
import { Handle, HandleMatch } from "~/types/remix/route-handle.type";

import { Loader } from "~/components/shared/loader/loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

import { getAuthTokens, removeAuthTokens } from "~/lib/utils";
import { refreshAccessToken } from "~/services/auth/auth.service";
import { getUserData } from "~/services/user/user.service";
import { setUserData } from "~/store/auth.store";
import { BreadcrumbLink as CustomBreadcrumbLink } from "~/components/shared/breadcrumbs/breadcrumb-link";

export const handle: Handle = {
  breadcrumb: () => <CustomBreadcrumbLink to="/dashboard" label="Fisiogo" />,
};

export async function clientLoader() {
  const { refreshToken } = getAuthTokens();

  if (!refreshToken) {
    return redirect("/auth/login");
  }

  try {
    const refreshResponse = await refreshAccessToken(refreshToken);
    if (
      refreshResponse.serviceError ||
      !refreshResponse.serviceData?.access_token
    ) {
      throw new Error("Failed to refresh token");
    }

    localStorage.setItem(
      "access_token",
      refreshResponse.serviceData.access_token
    );

    const userResponse = await getUserData();
    if (userResponse.serviceError || !userResponse.serviceData) {
      throw new Error("Failed to fetch user data");
    }

    setUserData(userResponse.serviceData);
    return null;
  } catch (error) {
    removeAuthTokens();
    return redirect("/auth/login");
  }
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40">
      <Loader size="lg" text="Cargando el panel..." />
    </div>
  );
}

export default function DashboardLayout() {
  const matches = useMatches() as HandleMatch[];

  return (
    <ScrollArea className="h-dvh">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  {matches
                    .filter((match) => match.handle && match.handle.breadcrumb)
                    .map((match, index, array) => (
                      <BreadcrumbItem key={match.id}>
                        <BreadcrumbLink asChild>
                          {match.handle.breadcrumb(match)}
                        </BreadcrumbLink>
                        {index < array.length - 1 && <BreadcrumbSeparator />}
                      </BreadcrumbItem>
                    ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-col p-2 md:p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ScrollArea>
  );
}
