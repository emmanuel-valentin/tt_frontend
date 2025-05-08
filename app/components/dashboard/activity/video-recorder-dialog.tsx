import React, { useState, useRef, useCallback } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogClose,
} from "~/components/ui/responsive-dialog";
import { Button } from "~/components/ui/button";
import { VideoPlayer } from "~/components/shared/video/video-player";
import { Loader } from "~/components/shared/loader/loader";
import { Video, VideoOff, Upload } from "lucide-react";

interface VideoRecorderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onVideoSubmit: (videoBlob: Blob) => void; // Callback to handle the recorded video
}

export function VideoRecorderDialog({
  open,
  onOpenChange,
  onVideoSubmit,
}: VideoRecorderDialogProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Simulate loading/processing
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const cleanupStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startRecording = async () => {
    setRecordedVideoUrl(null);
    setRecordedBlob(null);
    recordedChunksRef.current = [];
    setIsLoading(true);
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.muted = true; // Mute preview to avoid feedback loop
        videoRef.current.play().catch(console.error);
      }

      mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm", // Adjust mime type if needed
        });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setRecordedBlob(blob);
        setIsRecording(false);
        setIsLoading(false);
        cleanupStream(); // Stop camera access after recording finishes
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing media devices.", error);
      // TODO: Show error to user
    } finally {
      setIsLoading(false); // Ensure loading stops even on error
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      // onstop event handles the rest
    }
  };

  const handleSubmit = () => {
    if (recordedBlob) {
      onVideoSubmit(recordedBlob);
      handleClose(); // Close dialog after submission
    }
  };

  const handleClose = () => {
    stopRecording(); // Ensure recording stops if dialog is closed prematurely
    cleanupStream(); // Clean up stream and camera access
    setRecordedVideoUrl(null); // Reset preview
    setRecordedBlob(null);
    setIsRecording(false);
    setIsLoading(false);
    onOpenChange(false); // Close the dialog
  };

  // Ensure cleanup happens when the component unmounts or dialog closes externally
  React.useEffect(() => {
    return () => {
      cleanupStream();
    };
  }, [cleanupStream]);

  React.useEffect(() => {
    if (!open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]); // Dependency array includes open to react to external close triggers

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent
        className="sm:max-w-[600px]"
        onPointerDownOutside={(e) => {
          // Prevent closing when clicking outside if recording is in progress
          if (isRecording || isLoading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isRecording || isLoading) e.preventDefault();
        }}
      >
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Grabar Video</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Graba un video para completar la actividad. Asegúrate de tener buena
            iluminación y de que el ejercicio sea visible.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <div className="py-4 flex flex-col items-center gap-4">
          {isLoading && <Loader text="Iniciando cámara..." />}

          {/* Live Preview / Recorded Preview */}
          {!recordedVideoUrl &&
            (isRecording || isLoading || streamRef.current) && (
              <video
                ref={videoRef}
                className="w-full h-auto bg-muted rounded"
                playsInline // Important for mobile playback
              />
            )}
          {recordedVideoUrl && (
            <VideoPlayer src={recordedVideoUrl} className="w-full" />
          )}
          {!isRecording &&
            !recordedVideoUrl &&
            !isLoading &&
            !streamRef.current && (
              <div className="w-full h-60 bg-muted rounded flex items-center justify-center text-muted-foreground">
                <span>Vista previa de la cámara aparecerá aquí</span>
              </div>
            )}
        </div>

        <ResponsiveDialogFooter className="gap-2 sm:gap-0">
          <ResponsiveDialogClose asChild>
            {/* Disable close button during recording/loading */}
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isRecording || isLoading}
            >
              Cancelar
            </Button>
          </ResponsiveDialogClose>

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
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
