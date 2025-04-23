import { useEffect, useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { useNetworkStatus } from "~/hooks/use-network-status";

import { Wifi, WifiOff } from "lucide-react";

export function NetworkStatusAlert() {
  const { isOnline, wasOffline, resetWasOffline } = useNetworkStatus();
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    if (isOnline && wasOffline) {
      setShowReconnected(true);
      const timer = setTimeout(() => {
        setShowReconnected(false);
        resetWasOffline();
      }, 5000); // Ocultar después de 5 segundos
      return () => clearTimeout(timer);
    }
  }, [isOnline, wasOffline, resetWasOffline]);

  if (!isOnline) {
    return (
      <Alert
        variant="destructive"
        className="fixed bottom-4 right-4 max-w-md ml-auto z-50 shadow-lg"
      >
        <WifiOff className="size-4" />
        <AlertTitle>Sin conexión</AlertTitle>
        <AlertDescription className="flex flex-col gap-2">
          <p>
            No hay conexión a internet. Algunas funcionalidades podrían no estar
            disponibles.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  if (showReconnected) {
    return (
      <Alert
        variant="success"
        className="fixed bottom-4 right-4 max-w-md ml-auto z-50 shadow-lg"
      >
        <Wifi className="size-4" />
        <AlertTitle>Conexión restaurada</AlertTitle>
        <AlertDescription className="flex justify-between">
          <span>La conexión a internet se ha recuperado.</span>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
