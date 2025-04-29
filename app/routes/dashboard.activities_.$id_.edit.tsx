import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
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
  getActivityById,
  getExercises,
  updateActivity,
} from "~/services/activity/activity.service";
import { getAcceptedPatients } from "~/services/user/physiotherapist/physiotherapist.service";
import { editActivitySchema } from "~/schemas/activity/activity.schema";
import { ActivityForm } from "~/components/dashboard/activity/activity-form";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const id = params.id;

  if (!id) {
    throw new Error("ID de actividad no proporcionado");
  }

  const responses = await Promise.all([
    getExercises(),
    getAcceptedPatients(),
    getActivityById(id),
  ]);

  const [exercises, patients, activity] = responses;

  if (exercises.serviceError) {
    throw new Error(exercises.serviceError);
  }

  if (patients.serviceError) {
    throw new Error(patients.serviceError);
  }

  if (activity.serviceError) {
    throw new Error(activity.serviceError);
  }

  const activityData = activity.serviceData;

  return {
    exercises: exercises.serviceData,
    patients: patients.serviceData,
    currentActivity: activityData,
  };
}

export async function clientAction({
  request,
  params,
}: ClientActionFunctionArgs) {
  const id = params.id as string;
  const formData = await request.formData();
  const parsedData = editActivitySchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return {
      validationErrors: parsedData.error.flatten().fieldErrors,
    };
  }

  const { data } = parsedData;
  console.log("Parsed data", data);
  const { serviceError } = await updateActivity(id, data);

  if (serviceError) {
    return {
      serviceError,
    };
  }

  return redirect(`/dashboard/activities/${id}`);
}

export default function EditActivityPage() {
  const { exercises, patients, currentActivity } =
    useLoaderData<typeof clientLoader>();

  return (
    <Card>
      <CardHeader>
        <CardTitle pageTitle>Editar actividad</CardTitle>
        <CardDescription>
          Modifica los campos necesarios para actualizar esta actividad
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ActivityForm
          exercises={exercises!}
          patients={patients!}
          mode="edit"
          currentActivity={currentActivity}
        />
      </CardContent>
    </Card>
  );
}
