import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiUrl } from "~/config/env.config";

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

export function getVideoAPI(path: string) {
  return `${apiUrl}/${path}`;
}
