import {
  ClientActionFunctionArgs,
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { LoaderCircle, Play } from "lucide-react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import {
  getExercises,
  newActivity,
} from "~/services/activity/activity.service";
import { getAcceptedPatients } from "~/services/user/physiotherapist/physiotherapist.service";
import type { Exercise } from "~/types/activity/activity.type";
import type { Patient } from "~/types/user/patient.type";
import { EmptyState } from "~/components/shared/views/empty-state";
import { VideoPlayer } from "~/components/shared/video/video-player";
import { newActivitySchema } from "~/schemas/activity/activity.schema";

export async function clientLoader() {
  const responses = await Promise.all([getExercises(), getAcceptedPatients()]);
  const [exercises, patients] = responses;

  if (exercises.serviceError) {
    throw new Error(exercises.serviceError);
  }

  if (patients.serviceError) {
    throw new Error(patients.serviceError);
  }

  return {
    exercises: exercises.serviceData,
    patients: patients.serviceData,
  };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const parsedData = newActivitySchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return {
      validationErrors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { data } = parsedData;
  const { serviceError, serviceData } = await newActivity(data);

  if (serviceError) {
    return {
      serviceError,
    };
  }

  return redirect(`/dashboard/activities/${serviceData?.id}`);
}

export default function NewActivityPage() {
  const { exercises, patients } = useLoaderData<typeof clientLoader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [selectedExercise, setSelectedExercise] = useState<
    Exercise | undefined
  >();

  const handleExerciseSelect = (exerciseId: string) => {
    const exercise = exercises?.find(
      (ex: Exercise) => ex.id.toString() === exerciseId
    );
    console.log(exercise);
    setSelectedExercise(exercise);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Crear nueva actividad</CardTitle>
        <CardDescription>
          Llena todos los campos para asignar una nueva actividad a tus
          pacientes
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form section - Left side */}
          <div>
            <Form className="flex flex-col gap-6" method="post">
              <div className="grid gap-2">
                <Label htmlFor="pacienteID">Paciente</Label>
                <Select name="pacienteID" required>
                  <SelectTrigger id="pacienteID">
                    <SelectValue placeholder="Selecciona un paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients?.map((patient: Patient) => (
                      <SelectItem
                        key={patient.id}
                        value={patient.id.toString()}
                      >
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
                  onValueChange={handleExerciseSelect}
                >
                  <SelectTrigger id="ejercicioID">
                    <SelectValue placeholder="Selecciona un ejercicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises?.map((exercise: Exercise) => (
                      <SelectItem
                        key={exercise.id}
                        value={exercise.id.toString()}
                      >
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
                />
              </div>

              <div className="grid md:grid-cols-2 gap-2">
                <Button variant="secondary" asChild>
                  <Link to="/dashboard/activities">Cancelar</Link>
                </Button>

                <Button
                  className="-order-1 md:order-1"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <span className="sr-only">Creando actividad</span>
                      <LoaderCircle className="animate-spin w-4 h-4" />
                    </>
                  ) : (
                    <span>Asignar actividad</span>
                  )}
                </Button>
              </div>
            </Form>
          </div>

          {/* Preview section - Right side */}
          <div className="flex flex-col border rounded-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">
                Vista previa del ejercicio
              </h3>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              {selectedExercise ? (
                <VideoPlayer src={selectedExercise.url_video} />
              ) : (
                <EmptyState
                  icon={Play}
                  title="Sin video para mostrar"
                  description="Selecciona un ejercicio para ver la vista previa del video"
                />
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
