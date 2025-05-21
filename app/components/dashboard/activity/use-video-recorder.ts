import { useState, useRef, useCallback } from "react";

export function useVideoRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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

  const initializeCamera = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!streamRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
        videoRef.current.muted = true;
        videoRef.current.play().catch(console.error);
      }
    } catch (error) {
      console.error("Error accessing media devices.", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startRecording = useCallback(() => {
    setRecordedVideoUrl(null);
    setRecordedBlob(null);
    recordedChunksRef.current = [];
    if (!streamRef.current) return;
    setIsLoading(true);
    try {
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setRecordedBlob(blob);
        setIsRecording(false);
        setIsLoading(false);
        cleanupStream();
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error starting recording.", error);
      setIsLoading(false);
    }
  }, [cleanupStream]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [isRecording]);

  const clearRecording = useCallback(() => {
    setRecordedVideoUrl(null);
    setRecordedBlob(null);
  }, []);

  return {
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
  };
}
