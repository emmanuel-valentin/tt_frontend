import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { Step1Form } from "~/components/auth/register/step-1-form";
import { ClientActionFunctionArgs, redirect } from "@remix-run/react";
import { step1FormSchema } from "~/schemas/auth/register.schema";
import { loadFormData, setFormData } from "~/store/register-form.store";

export async function clientLoader() {
  const { step1 } = loadFormData();
  if (!step1) return null;

  return step1;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const rawData = Object.fromEntries(formData);
  const { data, error, success } = step1FormSchema.safeParse(rawData);

  if (success && data) {
    setFormData({ step1: data });
    return redirect("/auth/register/select-role");
  }

  return {
    errors: error?.flatten().fieldErrors,
  };
}

export default function RegisterBasicInfoPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crea una nueva cuenta</CardTitle>
        <CardDescription>
          En esta sección requerimos información básica de tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Step1Form />
      </CardContent>
    </Card>
  );
}
