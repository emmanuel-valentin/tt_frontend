import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export interface ExerciseFeedback {
  reps: number;
  correctReps: number;
  stage: string;
  angle: number;
  [key: string]: unknown;
}

export interface ExerciseDetector {
  process(landmarks: NormalizedLandmark[]): ExerciseFeedback;
  reset(): void;
}

export type ExerciseType = "bicep-curl" | "squat";

// Centralized angle thresholds for exercises
export const EXERCISE_ANGLE_THRESHOLDS = {
  "bicep-curl": {
    downThreshold: 160, // Angle to consider arm extended (stage "down")
    upThreshold: 30, // Angle to consider arm curled (stage "up")
  },
  squat: {
    upThreshold: 160, // Angle to consider standing straight (stage "up")
    downThreshold: 90, // Angle to consider squat position (stage "down")
  },
} as const;

function calculateAngle(
  a: [number, number],
  b: [number, number],
  c: [number, number]
) {
  const radians =
    Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
  let angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180) angle = 360 - angle;
  return angle;
}

export class BicepCurlDetector implements ExerciseDetector {
  private reps = 0;
  private correctReps = 0;
  private stage = "-";
  private angle = 0;

  process(landmarks: NormalizedLandmark[]): ExerciseFeedback {
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    const useLeft = leftElbow.visibility > rightElbow.visibility;
    let shoulder, elbow, wrist;
    if (useLeft) {
      shoulder = [landmarks[11].x, landmarks[11].y] as [number, number];
      elbow = [landmarks[13].x, landmarks[13].y] as [number, number];
      wrist = [landmarks[15].x, landmarks[15].y] as [number, number];
    } else {
      shoulder = [landmarks[12].x, landmarks[12].y] as [number, number];
      elbow = [landmarks[14].x, landmarks[14].y] as [number, number];
      wrist = [landmarks[16].x, landmarks[16].y] as [number, number];
    }
    const angle = calculateAngle(shoulder, elbow, wrist);
    this.angle = Math.round(angle * 100) / 100;

    const thresholds = EXERCISE_ANGLE_THRESHOLDS["bicep-curl"];

    if (angle > thresholds.downThreshold) {
      this.stage = "down";
    }
    if (angle < thresholds.upThreshold && this.stage === "down") {
      this.stage = "up";
      this.reps += 1;
      this.correctReps += 1;
    }
    return {
      reps: this.reps,
      correctReps: this.correctReps,
      stage: this.stage,
      angle: this.angle,
    };
  }

  reset() {
    this.reps = 0;
    this.correctReps = 0;
    this.stage = "-";
    this.angle = 0;
  }
}

export class SquatDetector implements ExerciseDetector {
  private reps = 0;
  private correctReps = 0;
  private stage = "-";
  private angle = 0;

  process(landmarks: NormalizedLandmark[]): ExerciseFeedback {
    // Usamos pierna izquierda para ejemplo
    const hip = [landmarks[23].x, landmarks[23].y] as [number, number];
    const knee = [landmarks[25].x, landmarks[25].y] as [number, number];
    const ankle = [landmarks[27].x, landmarks[27].y] as [number, number];
    const angle = calculateAngle(hip, knee, ankle);
    this.angle = Math.round(angle * 100) / 100;

    const thresholds = EXERCISE_ANGLE_THRESHOLDS.squat;

    if (angle > thresholds.upThreshold) {
      this.stage = "up";
    }
    if (angle < thresholds.downThreshold && this.stage === "up") {
      this.stage = "down";
      this.reps += 1;
      this.correctReps += 1;
    }
    return {
      reps: this.reps,
      correctReps: this.correctReps,
      stage: this.stage,
      angle: this.angle,
    };
  }

  reset() {
    this.reps = 0;
    this.correctReps = 0;
    this.stage = "-";
    this.angle = 0;
  }
}

export function getExerciseDetector(type: ExerciseType): ExerciseDetector {
  switch (type) {
    case "squat":
      return new SquatDetector();
    case "bicep-curl":
    default:
      return new BicepCurlDetector();
  }
}
