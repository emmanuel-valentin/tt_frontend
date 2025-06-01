import { createThemeSessionResolver } from "remix-themes";
import { createCookieSessionStorage } from "@remix-run/node";
import { cookieSecret } from "./config/env.config";

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction,
    secrets: [cookieSecret],
  },
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);
