import { useState, useEffect } from "react";
import { LineChart as LineChartIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { ExerciseType, ExerciseFeedback } from "~/lib/exercise-analyzer";
import {
  ExerciseChart,
  type FeedbackHistoryEntry,
} from "./charts/exercise-chart";

interface FeedbackHistoryManagerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  feedback: ExerciseFeedback;
  poseDetectionEnabled: boolean;
  isLoading: boolean;
  exerciseType: ExerciseType;
}

/**
 * Componente que gestiona la recopilación y visualización del historial de feedback durante un ejercicio
 */
export function FeedbackHistoryManager({
  videoRef,
  feedback,
  poseDetectionEnabled,
  isLoading,
  exerciseType,
}: FeedbackHistoryManagerProps) {
  const [feedbackHistory, setFeedbackHistory] = useState<
    FeedbackHistoryEntry[]
  >([]);
  const [isRecordingHistory, setIsRecordingHistory] = useState(false);
  const [showFeedbackChart, setShowFeedbackChart] = useState(false);

  // Efecto para gestionar los eventos de reproducción del video
  useEffect(() => {
    if (!videoRef.current) return;

    const handlePlay = () => {
      // Limpiar historial al iniciar la reproducción
      if (!isRecordingHistory) {
        setFeedbackHistory([]);
        setIsRecordingHistory(true);
      }
    };

    const handlePause = () => {
      setIsRecordingHistory(false);
    };

    const handleEnded = () => {
      setIsRecordingHistory(false);
    };

    // Agregar eventos de reproducción
    const videoElement = videoRef.current;
    videoElement.addEventListener("play", handlePlay);
    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("ended", handleEnded);

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [isRecordingHistory, videoRef]);

  // Actualizar historial cuando hay nuevo feedback y estamos grabando
  useEffect(() => {
    if (isRecordingHistory && poseDetectionEnabled && videoRef.current) {
      const newEntry: FeedbackHistoryEntry = {
        ...feedback,
        timestamp: videoRef.current.currentTime * 1000,
      };
      setFeedbackHistory((prev) => [...prev, newEntry]);
    }
  }, [feedback, isRecordingHistory, poseDetectionEnabled, videoRef]);

  // No mostrar nada si no hay datos
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
