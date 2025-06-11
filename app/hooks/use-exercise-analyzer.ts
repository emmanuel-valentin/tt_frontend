import { useEffect, useRef, useState } from "react";
import {
  ExerciseType,
  ExerciseDetector,
  getExerciseDetector,
  ExerciseFeedback,
} from "~/lib/exercise-analyzer";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";

interface UseExerciseAnalysisOptions {
  exerciseType: ExerciseType;
  analysisEnabled?: boolean;
}

export function useExerciseAnalysis({
  exerciseType,
  analysisEnabled = true,
}: UseExerciseAnalysisOptions) {
  const [feedback, setFeedback] = useState<ExerciseFeedback>({
    reps: 0,
    correctReps: 0,
    stage: "-",
    angle: 0,
  });
  const detectorRef = useRef<ExerciseDetector>(
    getExerciseDetector(exerciseType)
  );

  // Reset detector and feedback when exercise type changes
  useEffect(() => {
    detectorRef.current = getExerciseDetector(exerciseType);
    detectorRef.current.reset();
    setFeedback({ reps: 0, correctReps: 0, stage: "-", angle: 0 });
  }, [exerciseType]);

  // Process landmarks and update feedback
  const processLandmarks = (landmarks: NormalizedLandmark[]) => {
    if (!landmarks || !detectorRef.current || !analysisEnabled) return;

    const newFeedback = detectorRef.current.process(landmarks);
    setFeedback(newFeedback);
  };

  // Reset exercise analysis
  const resetExercise = () => {
    if (detectorRef.current) {
      detectorRef.current.reset();
      setFeedback({ reps: 0, correctReps: 0, stage: "-", angle: 0 });
    }
  };

  const getAngleLabel = (type: ExerciseType): string => {
    const angleLabelMap: Record<ExerciseType, string> = {
      "bicep-curl": "Angulo de extensión",
      squat: "Angulo de flexión",
    };
    return angleLabelMap[type];
  };

  return {
    feedback,
    processLandmarks,
    resetExercise,
    getAngleLabel,
    analysisEnabled,
  };
}
