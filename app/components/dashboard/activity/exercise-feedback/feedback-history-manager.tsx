import { useState, memo } from "react";
import { LineChart as LineChartIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ExerciseType } from "~/lib/exercise-analyzer";
import { ExerciseChart } from "./charts/exercise-chart";
import type { FeedbackHistoryEntry } from "~/hooks/use-feedback-history";

interface FeedbackHistoryManagerProps {
  feedbackHistory: FeedbackHistoryEntry[];
  isLoading: boolean;
  exerciseType: ExerciseType;
  isRecordingHistory: boolean;
}

/**
 * Componente optimizado que solo se encarga de la visualización del historial de feedback
 * Ya no gestiona la recopilación de datos, solo la presentación
 */
function FeedbackHistoryManagerComponent({
  feedbackHistory,
  isLoading,
  exerciseType,
  isRecordingHistory,
}: FeedbackHistoryManagerProps) {
  const [showFeedbackChart, setShowFeedbackChart] = useState(false);

  // No mostrar nada si no hay datos y no estamos grabando
  if (feedbackHistory.length === 0 && !isRecordingHistory) {
    return null;
  }

  return (
    <div className="w-full mt-4">
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading || feedbackHistory.length === 0}
          onClick={() => setShowFeedbackChart(!showFeedbackChart)}
        >
          <LineChartIcon className="w-4 h-4 mr-2" />
          {showFeedbackChart ? "Ocultar gráfica" : "Ver gráfica"}
        </Button>
      </div>

      {/* Contenedor de la gráfica */}
      {showFeedbackChart && feedbackHistory.length > 0 && (
        <div className="w-full mt-4">
          <ExerciseChart data={feedbackHistory} exerciseType={exerciseType} />
        </div>
      )}
    </div>
  );
}

// Memoizar el componente para evitar re-renderizados innecesarios
export const FeedbackHistoryManager = memo(FeedbackHistoryManagerComponent);
