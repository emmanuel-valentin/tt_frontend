/* eslint-disable jsx-a11y/media-has-caption */

import { LoaderCircle } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { usePoseDetection } from "~/hooks/use-pose-detection";
import { getVideoAPI } from "~/lib/utils";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";

import type { ExerciseType } from "~/lib/exercise-analyzer";
import { useExerciseAnalysis } from "~/hooks/use-exercise-analyzer";

import { FeedbackIndicators } from "./exercise-feedback/feedback-indicators";
import { FeedbackHistoryManager } from "./exercise-feedback/feedback-history-manager";

interface VideoWithPoseDetectionProps {
  videoSrc: string;
  className?: string;
  exerciseType?: ExerciseType;
}

export function VideoWithPoseDetection({
  videoSrc,
  className,
  exerciseType = "bicep-curl",
}: VideoWithPoseDetectionProps) {
  const [updateCount, setUpdateCount] = useState(0); // Para forzar actualizaciones

  // Obtener funcionalidad de análisis de ejercicios
  const { feedback, processLandmarks, getAngleLabel, exerciseConnectors } =
    useExerciseAnalysis({
      exerciseType,
    });

  // Callback memorizado para procesar landmarks
  const handleLandmarksDetected = useCallback(
    (landmarks: NormalizedLandmark[]) => {
      processLandmarks(landmarks);
      // Incrementar contador cada 5 detecciones para forzar re-renderizados periódicos
      setUpdateCount((prev) => ((prev + 1) % 5 === 0 ? prev + 1 : prev));
    },
    [processLandmarks]
  );

  // Obtener funcionalidad de detección de pose
  const {
    videoRef,
    canvasRef,
    isInitialized,
    isLoading,
    poseDetectionEnabled,
    poseDetectionRef,
  } = usePoseDetection({
    onLandmarksDetected: handleLandmarksDetected,
  });

  // Actualizar los conectores de ejercicio cuando cambien
  useEffect(() => {
    if (isInitialized && poseDetectionRef.current && exerciseConnectors) {
      poseDetectionRef.current.setExerciseConnectors(exerciseConnectors);
    }
  }, [isInitialized, exerciseConnectors, poseDetectionRef, updateCount]);

  // Forzar actualizaciones periódicas para mejorar la sincronización
  useEffect(() => {
    const forceUpdateInterval = setInterval(() => {
      setUpdateCount((prev) => prev + 1);
    }, 500); // Cada 500ms

    return () => clearInterval(forceUpdateInterval);
  }, []);

  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      {/* Indicadores de feedback en tiempo real */}
      <FeedbackIndicators
        feedback={feedback}
        exerciseType={exerciseType}
        getAngleLabel={getAngleLabel}
      />

      {/* Contenedor del video con detección de pose */}
      <VideoPlayer
        videoRef={videoRef}
        canvasRef={canvasRef}
        videoSrc={videoSrc}
        isInitialized={isInitialized}
        isLoading={isLoading}
        poseDetectionEnabled={poseDetectionEnabled}
      />

      {/* Controles y visualización del historial */}
      <div className="w-full mt-2 flex flex-col items-center gap-2">
        <FeedbackHistoryManager
          videoRef={videoRef}
          feedback={feedback}
          poseDetectionEnabled={poseDetectionEnabled}
          isLoading={isLoading}
          exerciseType={exerciseType}
        />
      </div>
    </div>
  );
}

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoSrc: string;
  isInitialized: boolean;
  isLoading: boolean;
  poseDetectionEnabled: boolean;
}

/**
 * Componente que renderiza el reproductor de video con el canvas para detección de pose
 */
function VideoPlayer({
  videoRef,
  canvasRef,
  videoSrc,
  isInitialized,
  isLoading,
  poseDetectionEnabled,
}: VideoPlayerProps) {
  useEffect(() => {
    if (isInitialized && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error al reproducir el video automáticamente:", error);
      });
    }
  }, [isInitialized, videoRef]);

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      style={{ maxHeight: "60vh" }}
    >
      {/* Overlay de carga */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="text-white text-center">
            <LoaderCircle className="animate-spin h-10 w-10 mx-auto mb-2" />
            <p>Inicializando detección de pose...</p>
          </div>
        </div>
      )}

      {/* Elemento de video */}
      <video
        ref={videoRef}
        className="w-full rounded-md object-contain"
        style={{ maxHeight: "60vh" }}
        controls={false}
        crossOrigin="anonymous"
        src={videoSrc}
      />

      {/* Canvas overlay para landmarks de pose */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 rounded-md"
        style={{
          backgroundColor: poseDetectionEnabled
            ? "rgba(0, 0, 0, 0.1)"
            : "transparent",
        }}
      />
    </div>
  );
}

interface SubmissionVideoContentProps {
  activityFinished: boolean;
  submittedVideo: { url: string | null; file: File | null };
  patientVideoUrl?: string;
  exerciseType?: ExerciseType;
}

export function SubmissionVideoContent({
  activityFinished,
  submittedVideo,
  patientVideoUrl,
  exerciseType = "bicep-curl",
}: SubmissionVideoContentProps) {
  if (activityFinished && patientVideoUrl) {
    return (
      <VideoWithPoseDetection
        videoSrc={getVideoAPI(patientVideoUrl)}
        exerciseType={exerciseType}
      />
    );
  }

  if (submittedVideo.url) {
    return (
      <VideoWithPoseDetection
        videoSrc={submittedVideo.url}
        exerciseType={exerciseType}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-muted rounded-lg text-center p-4">
      <p className="text-muted-foreground mb-4">
        No se ha subido ningún video.
      </p>
    </div>
  );
}
