import {
  ClientActionFunctionArgs,
  redirect,
  useLoaderData,
} from "@remix-run/react";

import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "~/components/ui/card";
import { Step2Form } from "~/components/auth/register/step-2-form";

import { loadFormData, setFormData } from "~/store/register-form.store";
import { step2FormSchema } from "~/schemas/auth/register.schema";

export async function clientLoader() {
  const { step1, step2 } = loadFormData();
  if (!step1) return redirect("/auth/register");

  return {
    nombre: step1.nombre,
    ...step2,
  };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  const { data, error, success } = step2FormSchema.safeParse(rawData);
  if (success && data) {
    setFormData({ step2: data });
    return redirect("/auth/register/additional-info");
  }

  return {
    errors: error?.flatten().fieldErrors,
  };
}

export default function RegisterSelectRolePage() {
  const loaderData = useLoaderData<typeof clientLoader>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>¡Hola, {loaderData.nombre}!</CardTitle>
        <CardDescription>
          Ahora, selecciona un rol para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Step2Form />
      </CardContent>
    </Card>
  );
}
