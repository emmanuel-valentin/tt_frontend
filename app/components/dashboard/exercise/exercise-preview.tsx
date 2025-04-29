import { Play } from "lucide-react";
import { VideoPlayer } from "~/components/shared/video/video-player";
import { EmptyState } from "~/components/shared/views/empty-state";
import { Exercise } from "~/types/activity/activity.type";

interface Props {
  exercise?: Exercise;
}

export function ExercisePreview({ exercise }: Props) {
  return (
    <div className="flex flex-col border rounded-md">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">Vista previa del ejercicio</h3>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-center">
        {exercise ? (
          <VideoPlayer src={exercise.url_video} />
        ) : (
          <EmptyState
            icon={Play}
            title="Sin video para mostrar"
            description="Selecciona un ejercicio para ver la vista previa del video"
          />
        )}
      </div>
    </div>
  );
}
