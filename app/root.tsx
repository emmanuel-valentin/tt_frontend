import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import { Loader } from "./components/shared/loader/loader";
import { Toaster } from "./components/ui/sonner";
import { ErrorBoundary as CustomErrorBoundary } from "./components/shared/error-boundary/error-boundary";
import { NetworkStatusAlert } from "./components/shared/alert/network-status-alert";

import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Fisiogo" },
    { name: "description", content: "Tu app de rehabilitación" },
  ];
};

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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />

        <Toaster richColors />
        <NetworkStatusAlert />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
