import type { ExerciseType, ExerciseFeedback } from "~/lib/exercise-analyzer";

interface FeedbackIndicatorsProps {
  feedback: ExerciseFeedback;
  exerciseType: ExerciseType;
  getAngleLabel: (exerciseType: ExerciseType) => string;
}

/**
 * Componente que muestra indicadores de feedback en tiempo real durante un ejercicio
 */
export function FeedbackIndicators({
  feedback,
  exerciseType,
  getAngleLabel,
}: FeedbackIndicatorsProps) {
  return (
    <div className="flex flex-row gap-4 mb-4 w-full justify-center">
      <FeedbackIndicator
        label="REPS"
        value={feedback.reps}
        bgColor="bg-blue-100"
      />
      <FeedbackIndicator
        label="CORRECT REPS"
        value={feedback.correctReps}
        bgColor="bg-green-100"
      />
      <FeedbackIndicator
        label="STAGE"
        value={feedback.stage}
        bgColor="bg-yellow-100"
      />
      <FeedbackIndicator
        label={getAngleLabel(exerciseType)}
        value={`${feedback.angle}°`}
        bgColor="bg-purple-100"
      />
    </div>
  );
}

interface FeedbackIndicatorProps {
  label: string;
  value: string | number;
  bgColor: string;
}

/**
 * Componente que muestra un indicador individual de feedback
 */
function FeedbackIndicator({ label, value, bgColor }: FeedbackIndicatorProps) {
  return (
    <div className={`p-2 ${bgColor} rounded text-center`}>
      <div className="text-xs">{label}</div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  );
}
