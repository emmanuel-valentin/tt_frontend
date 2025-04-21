import { redirect } from "@remix-run/react";
import { getAuthTokens, removeAuthTokens } from "~/lib/utils";
import { logout } from "~/services/auth/auth.service";
import { clearUserData } from "~/store/auth.store";

export async function clientLoader() {
  const { refreshToken } = getAuthTokens();

  if (!refreshToken) {
    removeAuthTokens();
    return redirect("/auth");
  }

  const logoutResult = await logout(refreshToken);
  removeAuthTokens();
  clearUserData();

  if (logoutResult?.serviceError) {
    console.error("Logout error:", logoutResult.serviceError);
  }

  return redirect("/auth");
}
