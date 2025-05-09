import {
  ClientActionFunctionArgs,
  redirect,
  useLoaderData,
} from "@remix-run/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  getExercises,
  newActivity,
} from "~/services/activity/activity.service";
import { getAcceptedPatients } from "~/services/user/physiotherapist/physiotherapist.service";
import { newActivitySchema } from "~/schemas/activity/activity.schema";
import { ActivityForm } from "~/components/dashboard/activity/activity-form";

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
        <ActivityForm
          exercises={exercises!}
          patients={patients!}
          mode="create"
        />
      </CardContent>
    </Card>
  );
}
