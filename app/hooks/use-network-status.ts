import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [wasOffline, setWasOffline] = useState<boolean>(false);

  useEffect(() => {
    const updateNetworkStatus = () => {
      const online = navigator.onLine;
      if (!online && isOnline) {
        setWasOffline(true);
      }
      setIsOnline(online);
    };

    updateNetworkStatus();

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, [isOnline]);

  const resetWasOffline = () => {
    setWasOffline(false);
  };

  return {
    isOnline,
    isOffline: !isOnline,
    wasOffline,
    resetWasOffline,
  };
}
