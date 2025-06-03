import { Separator } from "~/components/ui/separator";
import { VideoRecordingInstructions } from "./video-recording-instructions";
import { useAuthStore } from "~/store/auth.store";
import { Role } from "~/types/user/user.type";

interface ActivityDescriptionProps {
  description: string;
}

export function ActivityDescription({ description }: ActivityDescriptionProps) {
  const role = useAuthStore((state) => state.userData?.rol);

  return (
    <div>
      <h3 className="text-xl tracking-tight">Descripción</h3>
      <Separator className="mb-4" />
      <p className="text-balance text-foreground/80">
        {description || "No hay descripción disponible para esta actividad."}
      </p>
      {role === Role.PATIENT && (
        <div className="my-4">
          <VideoRecordingInstructions />
        </div>
      )}
    </div>
  );
}
