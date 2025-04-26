import { useEffect, useMemo, useState } from "react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { CircleAlert, CircleX, WifiOff } from "lucide-react";

export function ErrorBoundary() {
  const error = useRouteError();
  const [isOffline, setIsOffline] = useState(false);

  const isDevelopment = useMemo(() => {
    return process.env.NODE_ENV === "development";
  }, []);

  useEffect(() => {
    const checkConnection = () => {
      setIsOffline(!navigator.onLine);
    };

    checkConnection();

    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", checkConnection);

    // Comprobar también si el error parece ser de conexión
    if (error instanceof Error) {
      if (
        error.message.includes("NetworkError") ||
        error.message.includes("Failed to fetch") ||
        error.message.includes("Network request failed")
      ) {
        setIsOffline(true);
      }
    }

    return () => {
      window.removeEventListener("online", checkConnection);
      window.removeEventListener("offline", checkConnection);
    };
  }, [error]);

  // Si se detecta que no hay conexión a internet, mostrar un mensaje específico
  if (isOffline) {
    return (
      <Card className="container mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-destructive flex items-center gap-2">
            <WifiOff className="size-6" />
            Error de conexión
          </CardTitle>
          <CardDescription>Sin conexión a internet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No se detectó conexión a internet. Por favor, verifica tu conexión y
            vuelve a intentarlo.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pb-6">
          <Button
            onClick={() => window.location.reload()}
            className="w-full max-w-[200px]"
          >
            Reintentar
          </Button>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/")}
            className="w-full max-w-[200px]"
          >
            Volver al inicio
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="container mx-auto shadow-lg">
      {isRouteErrorResponse(error) ? (
        <>
          <CardHeader>
            <CardTitle className="text-xl text-destructive flex items-center gap-2">
              <CircleAlert className="size-6" />
              Error {error.status}
            </CardTitle>
            <CardDescription>{error.statusText}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error.data}</p>
          </CardContent>
        </>
      ) : error instanceof Error ? (
        <>
          <CardHeader>
            <CardTitle className="text-xl text-destructive flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              Error inesperado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm font-medium">{error.message}</p>
            {/* Solo mostrar detalles en desarrollo */}
            {isDevelopment && error.stack && (
              <div className="rounded border bg-muted/50 p-4">
                <p className="text-xs text-muted-foreground mb-2">
                  Detalles del error:
                </p>
                <pre className="text-xs overflow-auto max-h-[200px]">
                  {error.stack}
                </pre>
              </div>
            )}
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="text-xl text-destructive flex items-center gap-2">
              <CircleX className="size-6" />
              Error desconocido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Se ha producido un error inesperado.
            </p>
          </CardContent>
        </>
      )}
      <CardFooter className="flex justify-center pb-6">
        <Button
          variant="secondary"
          onClick={() => (window.location.href = "/")}
          className="w-full max-w-[200px]"
        >
          Volver al inicio
        </Button>
      </CardFooter>
    </Card>
  );
}
