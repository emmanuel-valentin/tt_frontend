import { createThemeSessionResolver } from "remix-themes";
import { createCookieSessionStorage } from "@remix-run/node";

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
