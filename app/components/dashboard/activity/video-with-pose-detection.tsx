/* eslint-disable jsx-a11y/media-has-caption */

import { LoaderCircle, VideoOff, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { usePoseDetection } from "~/hooks/use-pose-detection";
import { useFeedbackHistory } from "~/hooks/use-feedback-history";
import { getAPIResource } from "~/lib/utils";

import type { ExerciseType } from "~/lib/exercise-analyzer";
import { useExerciseAnalysis } from "~/hooks/use-exercise-analyzer";

import { FeedbackIndicators } from "./exercise-feedback/feedback-indicators";
import { FeedbackHistoryManager } from "./exercise-feedback/feedback-history-manager";
import { EmptyState } from "~/components/shared/views/empty-state";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

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
  const {
    videoRef,
    canvasRef,
    isInitialized,
    isLoading,
    poseDetectionEnabled,
    noPoseDetected,
    resetNoPoseDetected,
    updateLandmarksCallback,
  } = usePoseDetection();

  const { feedback, processLandmarks, getAngleLabel } = useExerciseAnalysis({
    exerciseType,
    analysisEnabled: poseDetectionEnabled && !noPoseDetected,
  });

  useEffect(() => {
    if (processLandmarks) {
      updateLandmarksCallback(processLandmarks);
    }
  }, [processLandmarks, updateLandmarksCallback]);

  const { feedbackHistory, isRecordingHistory } = useFeedbackHistory({
    videoRef,
    feedback,
    poseDetectionEnabled: poseDetectionEnabled && !noPoseDetected,
  });

  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      {/* Alerta cuando no se detecta pose */}
      {noPoseDetected && poseDetectionEnabled && (
        <div className="w-full max-w-2xl mb-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>No se puede detectar la pose</AlertTitle>
            <AlertDescription>
              No se ha detectado ninguna persona en el video durante los últimos
              segundos. Asegúrate de estar completamente visible en el video
              para que el análisis del ejercicio funcione correctamente. El
              análisis se ha pausado automáticamente.
              <button
                onClick={resetNoPoseDetected}
                className="ml-2 underline hover:no-underline"
              >
                Ocultar
              </button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      <FeedbackIndicators
        feedback={feedback}
        exerciseType={exerciseType}
        getAngleLabel={getAngleLabel}
      />

      <VideoPlayer
        videoRef={videoRef}
        canvasRef={canvasRef}
        videoSrc={videoSrc}
        isInitialized={isInitialized}
        isLoading={isLoading}
        poseDetectionEnabled={poseDetectionEnabled}
      />

      <div className="w-full mt-2 flex flex-col items-center gap-2">
        <FeedbackHistoryManager
          feedbackHistory={feedbackHistory}
          isLoading={isLoading}
          exerciseType={exerciseType}
          isRecordingHistory={isRecordingHistory}
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
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="text-white text-center">
            <LoaderCircle className="animate-spin h-10 w-10 mx-auto mb-2" />
            <p>Inicializando detección de pose...</p>
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        className="w-full rounded-md object-contain"
        style={{ maxHeight: "60vh" }}
        controls={false}
        crossOrigin="anonymous"
        src={videoSrc}
        muted
      />

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
  const videoSrc =
    activityFinished && patientVideoUrl
      ? getAPIResource(patientVideoUrl)
      : submittedVideo.url;

  if (videoSrc) {
    return (
      <VideoWithPoseDetection videoSrc={videoSrc} exerciseType={exerciseType} />
    );
  }

  return (
    <EmptyState
      icon={VideoOff}
      title="Sin video"
      description="El paciente aún no ha entregado su video para esta actividad."
    />
  );
}
