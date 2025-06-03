import { useState, useEffect, useCallback } from "react";
import type { ExerciseFeedback } from "~/lib/exercise-analyzer";

export interface FeedbackHistoryEntry extends ExerciseFeedback {
  timestamp: number;
}

interface UseFeedbackHistoryProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  feedback: ExerciseFeedback;
  poseDetectionEnabled: boolean;
}

export function useFeedbackHistory({
  videoRef,
  feedback,
  poseDetectionEnabled,
}: UseFeedbackHistoryProps) {
  const [feedbackHistory, setFeedbackHistory] = useState<
    FeedbackHistoryEntry[]
  >([]);
  const [isRecordingHistory, setIsRecordingHistory] = useState(false);

  const addHistoryEntry = useCallback(() => {
    if (isRecordingHistory && poseDetectionEnabled && videoRef.current) {
      const newEntry: FeedbackHistoryEntry = {
        ...feedback,
        timestamp: videoRef.current.currentTime * 1000,
      };

      setFeedbackHistory((prev) => {
        const lastEntry = prev[prev.length - 1];
        if (lastEntry && newEntry.timestamp - lastEntry.timestamp < 100) {
          return prev;
        }
        return [...prev, newEntry];
      });
    }
  }, [feedback, isRecordingHistory, poseDetectionEnabled, videoRef]);

  const clearHistory = useCallback(() => {
    setFeedbackHistory([]);
  }, []);

  const startRecording = useCallback(() => {
    if (!isRecordingHistory) {
      clearHistory();
      setIsRecordingHistory(true);
    }
  }, [isRecordingHistory, clearHistory]);

  const stopRecording = useCallback(() => {
    setIsRecordingHistory(false);
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    videoElement.addEventListener("play", startRecording);
    videoElement.addEventListener("pause", stopRecording);
    videoElement.addEventListener("ended", stopRecording);

    return () => {
      videoElement.removeEventListener("play", startRecording);
      videoElement.removeEventListener("pause", stopRecording);
      videoElement.removeEventListener("ended", stopRecording);
    };
  }, [startRecording, stopRecording, videoRef]);

  useEffect(() => {
    addHistoryEntry();
  }, [addHistoryEntry]);

  return {
    feedbackHistory,
    isRecordingHistory,
    clearHistory,
    startRecording,
    stopRecording,
  };
}
