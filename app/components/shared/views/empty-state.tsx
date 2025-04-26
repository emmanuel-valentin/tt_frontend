import { cn } from "~/lib/utils";
import { Inbox, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = "Sin datos",
  description = "No hay información disponible para mostrar.",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-4 p-8 items-center justify-center text-center",
        className
      )}
    >
      <div className="rounded-full bg-muted p-4">
        <Icon className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
