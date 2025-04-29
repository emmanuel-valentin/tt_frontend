import { Form, useNavigation } from "@remix-run/react";
import { LoaderCircle } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { Activity, Exercise } from "~/types/activity/activity.type";
import type { Patient } from "~/types/user/patient.type";
import { useState } from "react";
import { ExercisePreview } from "../exercise/exercise-preview";
import { formatDateForInput } from "~/lib/utils";

export interface ActivityFormProps {
  patients: Patient[];
  exercises: Exercise[];
  currentActivity?: Activity;
  mode: "create" | "edit";
}

export function ActivityForm({
  patients,
  exercises,
  currentActivity,
  mode = "create",
}: ActivityFormProps) {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const onSelectExercise = (exerciseId: string) => {
    const selected = exercises.find(
      (exercise) => exercise.id.toString() === exerciseId.toString()
    );
    setSelectedExercise(selected);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Form section - Left side */}
      <div>
        <Form className="flex flex-col gap-6" method="post">
          {mode === "edit" && (
            <input
              type="hidden"
              name="ejercicioAsignadoID"
              value={currentActivity?.id}
            />
          )}

          <div className="grid gap-2">
            <Label htmlFor="pacienteID">Paciente</Label>
            <Select
              name="pacienteID"
              required
              defaultValue={currentActivity?.paciente.id.toString()}
            >
              <SelectTrigger id="pacienteID">
                <SelectValue placeholder="Selecciona un paciente" />
              </SelectTrigger>
              <SelectContent>
                {patients?.map((patient: Patient) => (
                  <SelectItem key={patient.id} value={patient.id.toString()}>
                    {patient.usuario.first_name} {patient.usuario.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="ejercicioID">Ejercicio</Label>
            <Select
              name="ejercicioID"
              required
              onValueChange={onSelectExercise}
              defaultValue={currentActivity?.id.toString()}
            >
              <SelectTrigger id="ejercicioID">
                <SelectValue placeholder="Selecciona un ejercicio" />
              </SelectTrigger>
              <SelectContent>
                {exercises?.map((exercise: Exercise) => (
                  <SelectItem key={exercise.id} value={exercise.id.toString()}>
                    {exercise.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fechaLimite">Fecha límite</Label>
            <Input
              id="fechaLimite"
              name="fechaLimite"
              type="date"
              required
              defaultValue={formatDateForInput(currentActivity?.fechaLimite)}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-2">
            <Button variant="secondary" asChild>
              Cancelar
            </Button>

            <Button
              className="-order-1 md:order-1"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span className="sr-only">
                    {mode === "create"
                      ? "Creando actividad"
                      : "Actualizando actividad"}
                  </span>
                  <LoaderCircle className="animate-spin w-4 h-4" />
                </>
              ) : (
                <span>
                  {mode === "create"
                    ? "Asignar actividad"
                    : "Actualizar actividad"}
                </span>
              )}
            </Button>
          </div>
        </Form>
      </div>

      <ExercisePreview exercise={selectedExercise} />
    </div>
  );
}
