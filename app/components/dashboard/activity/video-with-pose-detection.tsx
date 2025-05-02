/* eslint-disable jsx-a11y/media-has-caption */

import { LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { usePoseDetection } from "~/hooks/use-pose-detection";
import { getVideoAPI } from "~/lib/utils";

interface VideoWithPoseDetectionProps {
  videoSrc: string;
  className?: string;
}

export function VideoWithPoseDetection({
  videoSrc,
  className,
}: VideoWithPoseDetectionProps) {
  const {
    videoRef,
    canvasRef,
    isInitialized,
    isLoading,
    poseDetectionEnabled,
    setPoseDetectionEnabled,
  } = usePoseDetection();

  return (
    <div className={`relative w-full flex flex-col items-center ${className}`}>
      {/* Video container with constrained width and height */}
      <div
        className="relative w-full max-w-2xl mx-auto"
        style={{ maxHeight: "60vh" }}
      >
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="text-white text-center">
              <LoaderCircle className="animate-spin h-10 w-10 mx-auto mb-2" />
              <p>Inicializando detección de pose...</p>
            </div>
          </div>
        )}

        {/* Video element for playback - with controls enabled once initialized */}
        <video
          ref={videoRef}
          className="w-full rounded-md object-contain"
          style={{ maxHeight: "60vh" }}
          controls={isInitialized}
          crossOrigin="anonymous"
          src={videoSrc}
        />

        {/* Canvas overlay for pose landmarks */}
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

      {/* Controls and status */}
      <div className="mt-2 flex flex-col items-center gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => setPoseDetectionEnabled((prev) => !prev)}
        >
          {poseDetectionEnabled ? "Desactivar" : "Activar"} detección de pose
        </Button>
      </div>
    </div>
  );
}

interface SubmissionVideoContentProps {
  activityFinished: boolean;
  submittedVideo: { url: string | null; file: File | null };
  patientVideoUrl?: string;
}

export function SubmissionVideoContent({
  activityFinished,
  submittedVideo,
  patientVideoUrl,
}: SubmissionVideoContentProps) {
  if (activityFinished && patientVideoUrl) {
    return <VideoWithPoseDetection videoSrc={getVideoAPI(patientVideoUrl)} />;
  }

  if (submittedVideo.url) {
    return <VideoWithPoseDetection videoSrc={submittedVideo.url} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-muted rounded-lg text-center p-4">
      <p className="text-muted-foreground mb-4">
        No se ha subido ningún video.
      </p>
    </div>
  );
}
