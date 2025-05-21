import { Link } from "@remix-run/react";
import { AlertCircle, CloudOff, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";

interface Props {
  message: string;
  statusCode: number;
}

export function ErrorView({ message, statusCode }: Props) {
  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <div className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-primary/10 p-3">
          <CloudOff className="h-10 w-10 text-primary" />
        </div>

        <h1 className="mb-2 text-2xl font-bold text-foreground">¡Oops!</h1>
        <p className="mb-1 text-foreground/80">Algo salió mal</p>

        <div className="my-4 flex items-center gap-2 rounded-md bg-destructive/10 px-4 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          <span>{message}</span>
        </div>

        {statusCode && (
          <p className="mb-6 text-sm text-foreground/80">
            Código de error: {statusCode}
          </p>
        )}

        <div className="flex w-full flex-col gap-3">
          <Button className="flex-1 gap-2" variant="default">
            <RefreshCw className="h-4 w-4" />
            Reintentar
          </Button>

          <Button className="flex-1 gap-2" variant="link" asChild>
            <Link to="/dashboard">Volver al dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
