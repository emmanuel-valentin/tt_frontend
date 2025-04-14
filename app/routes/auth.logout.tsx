import { redirect, useLoaderData } from "@remix-run/react";
import { getAuthTokens } from "~/lib/utils";
import { logout } from "~/services/auth/auth.service";

export async function clientLoader() {
  const { refreshToken } = getAuthTokens();

  if (!refreshToken) {
    localStorage.removeItem("access_token");
    return redirect("/auth");
  }

  const logoutResult = await logout(refreshToken);

  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");

  if (logoutResult?.serviceError) {
    console.error("Logout error:", logoutResult.serviceError);
  }

  return redirect("/auth");
}

export default function LogoutPage() {
  const { error, status } = useLoaderData<typeof clientLoader>();
  if (status !== 200) {
    throw new Error(error);
  }
}
