import { Separator } from "~/components/ui/separator";

interface ActivityDescriptionProps {
  description: string;
}

export function ActivityDescription({ description }: ActivityDescriptionProps) {
  return (
    <div>
      <h3 className="text-xl tracking-tight">Descripción</h3>
      <Separator className="mb-4" />
      <p className="text-balance text-foreground/80">
        {description || "No hay descripción disponible para esta actividad."}
      </p>
    </div>
  );
}
