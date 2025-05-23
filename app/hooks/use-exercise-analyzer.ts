import { useEffect, useRef, useState } from "react";
import {
  ExerciseType,
  ExerciseDetector,
  getExerciseDetector,
  ExerciseFeedback,
  EXERCISE_ANGLE_THRESHOLDS,
} from "~/lib/exercise-analyzer";
import { NormalizedLandmark } from "@mediapipe/tasks-vision";

interface UseExerciseAnalysisOptions {
  exerciseType: ExerciseType;
}

// Define exercise-specific joint pairs
const EXERCISE_CONNECTORS = {
  "bicep-curl": {
    left: [
      [11, 13], // shoulder to elbow
      [13, 15], // elbow to wrist
    ],
    right: [
      [12, 14], // shoulder to elbow
      [14, 16], // elbow to wrist
    ],
  },
  squat: {
    left: [
      [23, 25], // hip to knee
      [25, 27], // knee to ankle
    ],
    right: [
      [24, 26], // hip to knee
      [26, 28], // knee to ankle
    ],
  },
};

export function useExerciseAnalysis({
  exerciseType,
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

  const [exerciseConnectors, setExerciseConnectors] = useState<
    { pairs: number[][]; color: string }[]
  >([]);

  const lastLandmarksRef = useRef<NormalizedLandmark[] | null>(null);

  const angleBufferRef = useRef<number[]>([]);
  const MAX_BUFFER_SIZE = 5;

  const currentSideRef = useRef<boolean>(true);

  const isSideLockedRef = useRef<boolean>(false);

  const hasProcessedLandmarksRef = useRef<boolean>(false);

  useEffect(() => {
    detectorRef.current = getExerciseDetector(exerciseType);
    detectorRef.current.reset();
    setFeedback({ reps: 0, correctReps: 0, stage: "-", angle: 0 });
    angleBufferRef.current = [];
    lastLandmarksRef.current = null;
    hasProcessedLandmarksRef.current = false;
    isSideLockedRef.current = false;

    initializeExerciseConnectors(exerciseType);
  }, [exerciseType]);

  const initializeExerciseConnectors = (type: ExerciseType) => {
    const connectors = EXERCISE_CONNECTORS[type];
    const side = "left";
    const color = "#FF0000";

    setExerciseConnectors([{ pairs: connectors[side], color }]);
  };

  const processLandmarks = (landmarks: NormalizedLandmark[]) => {
    if (!landmarks || !detectorRef.current) return;

    lastLandmarksRef.current = landmarks;
    hasProcessedLandmarksRef.current = true;

    // Only determine which side to use if we haven't locked in a side yet
    if (!isSideLockedRef.current) {
      currentSideRef.current = determineExerciseSide(landmarks, exerciseType);
      isSideLockedRef.current = true;
    }

    const newFeedback = detectorRef.current.process(landmarks);

    const smoothedAngle = applyAngleSmoothing(newFeedback.angle);
    const smoothedFeedback = {
      ...newFeedback,
      angle: smoothedAngle,
    };

    setFeedback(smoothedFeedback);

    updateExerciseConnectors(
      smoothedFeedback.angle,
      smoothedFeedback.stage,
      currentSideRef.current,
      exerciseType
    );
  };

  const applyAngleSmoothing = (newAngle: number): number => {
    angleBufferRef.current.push(newAngle);

    if (angleBufferRef.current.length > MAX_BUFFER_SIZE) {
      angleBufferRef.current.shift();
    }

    const sum = angleBufferRef.current.reduce((acc, val) => acc + val, 0);
    const average = Math.round((sum / angleBufferRef.current.length) * 10) / 10;

    return average;
  };

  const determineExerciseSide = (
    landmarks: NormalizedLandmark[],
    type: ExerciseType
  ): boolean => {
    if (!landmarks || landmarks.length < 33) return true;

    if (type === "bicep-curl") {
      const leftElbow = landmarks[13];
      const rightElbow = landmarks[14];

      if (
        leftElbow &&
        rightElbow &&
        typeof leftElbow.visibility === "number" &&
        typeof rightElbow.visibility === "number"
      ) {
        return leftElbow.visibility > rightElbow.visibility;
      }

      if (leftElbow && rightElbow) {
        // If visibility not available, use x position (left is smaller x value)
        return leftElbow.x < rightElbow.x;
      }
    } else if (type === "squat") {
      const leftKnee = landmarks[25];
      const rightKnee = landmarks[26];

      if (
        leftKnee &&
        rightKnee &&
        typeof leftKnee.visibility === "number" &&
        typeof rightKnee.visibility === "number"
      ) {
        return leftKnee.visibility > rightKnee.visibility;
      }

      if (leftKnee && rightKnee) {
        // If visibility not available, use x position (left is smaller x value)
        return leftKnee.x < rightKnee.x;
      }
    }
    return true;
  };

  const updateExerciseConnectors = (
    angle: number,
    stage: string,
    useLeft: boolean,
    type: ExerciseType
  ) => {
    const connectors = EXERCISE_CONNECTORS[type];
    const side = useLeft ? "left" : "right";
    const thresholds = EXERCISE_ANGLE_THRESHOLDS[type];

    let color = "#FF0000";

    if (type === "bicep-curl") {
      if (stage === "down" && angle > thresholds.downThreshold - 10) {
        color = "#00FF00";
      } else if (stage === "up" && angle < thresholds.upThreshold + 10) {
        color = "#00FF00";
      }
    } else if (type === "squat") {
      if (stage === "up" && angle > thresholds.upThreshold - 10) {
        color = "#00FF00";
      } else if (stage === "down" && angle < thresholds.downThreshold + 10) {
        color = "#00FF00";
      }
    }

    setExerciseConnectors([{ pairs: connectors[side], color }]);
  };

  useEffect(() => {
    if (lastLandmarksRef.current && feedback) {
      updateExerciseConnectors(
        feedback.angle,
        feedback.stage,
        currentSideRef.current,
        exerciseType
      );
    }
  }, [feedback, exerciseType]);

  const resetExercise = () => {
    if (detectorRef.current) {
      detectorRef.current.reset();
      setFeedback({ reps: 0, correctReps: 0, stage: "-", angle: 0 });
      hasProcessedLandmarksRef.current = false;
      isSideLockedRef.current = false;

      initializeExerciseConnectors(exerciseType);

      angleBufferRef.current = [];
      lastLandmarksRef.current = null;
    }
  };

  const getAngleLabel = (type: ExerciseType): string => {
    const angleLabelMap: Record<ExerciseType, string> = {
      "bicep-curl": "ELBOW ANGLE",
      squat: "KNEE ANGLE",
    };
    return angleLabelMap[type];
  };

  return {
    feedback,
    processLandmarks,
    resetExercise,
    getAngleLabel,
    exerciseConnectors,
  };
}
