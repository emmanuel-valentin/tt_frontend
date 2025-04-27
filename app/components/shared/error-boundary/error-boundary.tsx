import { useEffect, useMemo, useState } from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "@remix-run/react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  CircleAlert,
  CircleX,
  FileQuestion,
  TriangleAlert,
  WifiOff,
} from "lucide-react";

// Helper component for consistent card structure
const ErrorCard = ({
  icon: Icon,
  title,
  description,
  children,
  footer,
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) => (
  <div className="flex items-center justify-center h-full p-4">
    <Card className="w-full max-w-md shadow-lg text-center">
      <CardHeader className="items-center">
        <Icon className="size-12 mb-4 text-destructive" />{" "}
        {/* Increased icon size */}
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col items-center gap-3 pb-6">
        {footer}
      </CardFooter>
    </Card>
  </div>
);

export function ErrorBoundary() {
  const [isOffline, setIsOffline] = useState(false);

  const navigate = useNavigate();
  const error = useRouteError();

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
      <ErrorCard
        icon={WifiOff}
        title="Error de conexión"
        description="Sin conexión a internet"
        footer={
          <>
            <Button
              onClick={() => window.location.reload()}
              className="w-full max-w-[200px]"
            >
              Reintentar
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(-1)}
              className="w-full max-w-[200px]"
            >
              Volver al inicio
            </Button>
          </>
        }
      >
        <p className="text-muted-foreground">
          No se detectó conexión a internet. Por favor, verifica tu conexión y
          vuelve a intentarlo.
        </p>
      </ErrorCard>
    );
  }

  // Handle Route Error Responses (including 404)
  if (isRouteErrorResponse(error)) {
    // Specific handling for 404 Not Found errors
    if (error.status === 404) {
      return (
        <ErrorCard
          icon={FileQuestion} // Use appropriate icon
          title="Página no encontrada (404)"
          description="La página que buscas no existe o ha sido movida."
          footer={
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              className="w-full max-w-[200px]"
            >
              Volver al inicio
            </Button>
          }
        >
          <p className="text-muted-foreground">
            Parece que has seguido un enlace roto o has introducido una URL que
            no existe en este sitio.
          </p>
        </ErrorCard>
      );
    }

    // Generic handling for other route errors
    return (
      <ErrorCard
        icon={CircleAlert} // Use appropriate icon
        title={`Error ${error.status}`}
        description={error.statusText}
        footer={
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="w-full max-w-[200px]"
          >
            Volver al inicio
          </Button>
        }
      >
        <p className="text-muted-foreground">
          {error.data || "Ha ocurrido un error en la ruta."}
        </p>
      </ErrorCard>
    );
  }

  // Handle generic JavaScript Errors
  if (error instanceof Error) {
    return (
      <ErrorCard
        icon={TriangleAlert} // Use TriangleAlert icon from lucide
        title="Error inesperado"
        footer={
          <Button
            variant="secondary"
            onClick={() => navigate("/")}
            className="w-full max-w-[200px]"
          >
            Volver al inicio
          </Button>
        }
      >
        <div className="space-y-4">
          <p className="text-sm font-medium">{error.message}</p>
          {/* Solo mostrar detalles en desarrollo */}
          {isDevelopment && error.stack && (
            <div className="rounded border bg-muted/50 p-4 text-left">
              {" "}
              {/* Keep stack trace left-aligned */}
              <p className="text-xs text-muted-foreground mb-2">
                Detalles del error:
              </p>
              <pre className="text-xs overflow-auto max-h-[200px]">
                {error.stack}
              </pre>
            </div>
          )}
        </div>
      </ErrorCard>
    );
  }

  // Fallback for unknown errors
  return (
    <ErrorCard
      icon={CircleX} // Use appropriate icon
      title="Error desconocido"
      footer={
        <Button
          variant="secondary"
          onClick={() => navigate("/")}
          className="w-full max-w-[200px]"
        >
          Volver al inicio
        </Button>
      }
    >
      <p className="text-muted-foreground">
        Se ha producido un error inesperado.
      </p>
    </ErrorCard>
  );
}
