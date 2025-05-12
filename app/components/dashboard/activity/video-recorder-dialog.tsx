import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { VideoPlayer } from "~/components/shared/video/video-player";
import { Loader } from "~/components/shared/loader/loader";
import { Video, VideoOff, Upload } from "lucide-react";
import { useVideoRecorder } from "./use-video-recorder";

interface VideoRecorderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoSubmit: (videoBlob: Blob) => void;
}

export function VideoRecorderDialog({
  open,
  onOpenChange,
  onVideoSubmit,
}: VideoRecorderDialogProps) {
  const {
    videoRef,
    isRecording,
    isLoading,
    recordedVideoUrl,
    recordedBlob,
    startRecording,
    stopRecording,
    initializeCamera,
    cleanupStream,
    clearRecording,
  } = useVideoRecorder();

  // Handle camera initialization and cleanup on dialog open/close
  useEffect(() => {
    if (open) {
      initializeCamera();
    } else {
      cleanupStream();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Ensure cleanup happens when the component unmounts
  useEffect(() => cleanupStream, [cleanupStream]);

  const handleSubmit = () => {
    if (recordedBlob) {
      onVideoSubmit(recordedBlob);
      handleClose();
    }
  };

  const handleClose = () => {
    stopRecording();
    cleanupStream();
    clearRecording();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        fullscreen
        className="flex flex-col h-full"
        onPointerDownOutside={(e) => {
          if (isRecording || isLoading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isRecording || isLoading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Grabar Video</DialogTitle>
          <DialogDescription>
            Graba un video para completar la actividad. Asegúrate de tener buena
            iluminación y de que el ejercicio sea visible.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 w-full flex-1 overflow-auto py-4">
          {isLoading && <Loader text="Iniciando cámara..." />}

          {/* Live Preview / Recorded Preview */}
          {!recordedVideoUrl &&
            (isRecording || isLoading || videoRef.current?.srcObject) && (
              <video
                ref={videoRef}
                className="w-full h-full bg-muted rounded flex-1"
                playsInline // Important for mobile playback
              />
            )}
          {recordedVideoUrl && (
            <VideoPlayer
              src={recordedVideoUrl}
              className="w-full h-full flex-1"
            />
          )}
          {!isRecording &&
            !recordedVideoUrl &&
            !isLoading &&
            !videoRef.current?.srcObject && (
              <div className="w-full h-full min-h-60 bg-muted rounded flex items-center justify-center text-muted-foreground flex-1">
                <span>Vista previa de la cámara aparecerá aquí</span>
              </div>
            )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isRecording || isLoading}
            >
              Cancelar
            </Button>
          </DialogClose>

          {recordedVideoUrl && (
            <Button
              variant="secondary"
              onClick={() => {
                clearRecording();
                initializeCamera();
              }}
              disabled={isLoading}
            >
              Descartar
            </Button>
          )}

          {!isRecording && !recordedVideoUrl && (
            <Button onClick={startRecording} disabled={isLoading}>
              <Video className="mr-2 h-4 w-4" /> Iniciar Grabación
            </Button>
          )}

          {isRecording && (
            <Button
              onClick={stopRecording}
              variant="destructive"
              disabled={isLoading}
            >
              <VideoOff className="mr-2 h-4 w-4" /> Detener Grabación
            </Button>
          )}

          {recordedVideoUrl && (
            <Button onClick={handleSubmit}>
              <Upload className="mr-2 h-4 w-4" /> Enviar Video
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
