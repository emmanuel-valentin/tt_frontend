import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";

import { Loader } from "./components/shared/loader/loader";
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary as CustomErrorBoundary } from "./components/shared/error-boundary/error-boundary";
import { NetworkStatusAlert } from "./components/shared/alert/network-status-alert";

import { themeSessionResolver } from "./sessions.server";

import styles from "./tailwind.css?url";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";
import clsx from "clsx";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Fisiogo" },
    { name: "description", content: "Tu app de rehabilitación" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme(),
  };
}

export function HydrateFallback() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-muted/40">
      <Loader size="lg" text="Cargando..." />
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-muted/40 flex min-h-screen items-center justify-center p-4">
        <CustomErrorBoundary />
        <Scripts />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();

  return (
    <html lang="es" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />

        <Toaster richColors />
        <NetworkStatusAlert />
      </body>
    </html>
  );
}
