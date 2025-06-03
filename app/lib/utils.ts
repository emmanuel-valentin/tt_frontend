import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiUrl } from "~/config/env.config";
import { refreshAccessToken } from "~/services/auth/auth.service";
import { getUserData } from "~/services/user/user.service";
import { setUserData } from "~/store/auth.store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAuthTokens() {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  return { accessToken, refreshToken };
}

export function setAuthTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
}

export function removeAuthTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

export function formatDate(date: string | Date) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function formatDateForInput(
  date: string | Date | undefined | null
): string | undefined {
  if (!date) return undefined;

  try {
    const dateObj = typeof date === "string" ? new Date(date) : date;

    // Check if the date is valid
    if (isNaN(dateObj.getTime())) return undefined;

    return dateObj.toISOString().split("T")[0];
  } catch (error) {
    console.error("Error formatting date for input:", error);
    return undefined;
  }
}

export function getAPIResource(path: string) {
  if (!path.includes("/media")) {
    return `${apiUrl}/media/${path}`;
  }

  return `${apiUrl}/${path}`;
}

export async function refreshAuthSession() {
  const { refreshToken } = getAuthTokens();

  if (!refreshToken) {
    removeAuthTokens();
    return { error: "No refresh token found" };
  }

  const refreshResponse = await refreshAccessToken(refreshToken);

  if (
    refreshResponse.serviceError ||
    !refreshResponse.serviceData?.access_token
  ) {
    removeAuthTokens();
    return { error: "Failed to refresh token" };
  }

  const newAccessToken = refreshResponse.serviceData.access_token;
  localStorage.setItem("access_token", newAccessToken);

  const userResponse = await getUserData();

  if (userResponse.serviceError || !userResponse.serviceData) {
    removeAuthTokens();
    return { error: "Failed to fetch user data" };
  }

  setUserData(userResponse.serviceData);
  return { success: true };
}
