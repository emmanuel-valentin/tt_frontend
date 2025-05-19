import { LoaderCircle } from "lucide-react";
import { cn } from "~/lib/utils";

interface LoaderProps {
  /** Text to display under the loader */
  text?: string;
  /** Size of the loader (sm, md, lg) */
  size?: "sm" | "md" | "lg";
  /** Optional additional className for styling */
  className?: string;
}

export function Loader({
  text = "Cargando...",
  size = "md",
  className,
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className
      )}
    >
      <LoaderCircle
        className={cn("animate-spin text-primary", sizeClasses[size])}
      />
      {text && (
        <p className="text-center font-medium text-foreground/80">{text}</p>
      )}
    </div>
  );
}
