import { ClientActionFunctionArgs, redirect } from "@remix-run/react";

import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Card,
} from "~/components/ui/card";

import { Step3Form } from "~/components/auth/register/step-3-form";
import {
  loadFormData,
  setFormData,
  clearFormData,
} from "~/store/register-form.store";
import {
  registerSchema,
  step3FormSchema,
} from "~/schemas/auth/register.schema";
import { register } from "~/services/auth/auth.service";

export async function clientLoader() {
  const { step1, step2, step3 } = loadFormData();
  if (!step1 || !step2) return redirect("/auth/register");
  if (!step2.role) return redirect("/auth/register/select-role");

  return {
    role: step2.role,
    ...step3,
  };
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const parsedData = Object.fromEntries(formData);

  const step3Validation = step3FormSchema.safeParse(parsedData);
  if (!step3Validation.success) {
    return {
      validationErrors: step3Validation.error.flatten().fieldErrors,
    };
  }

  setFormData({ step3: step3Validation.data });

  const { step1, step2, step3 } = loadFormData();

  const registerValidation = registerSchema.safeParse({
    ...step1,
    ...step2,
    ...step3,
  });
  if (!registerValidation.success) {
    return {
      validationErrors: registerValidation.error.flatten().fieldErrors,
    };
  }

  const { serviceData, serviceError } = await register(registerValidation.data);

  if (serviceError) {
    return {
      serviceError,
    };
  }

  const { access_token, refresh_token } = serviceData!;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  clearFormData();
  return redirect("/dashboard"); // Redirect to a success page or dashboard
}

export default function RegisterSelectRolePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Por último...</CardTitle>
        <CardDescription>Solo necesitamos unas cosas más</CardDescription>
      </CardHeader>
      <CardContent>
        <Step3Form />
      </CardContent>
    </Card>
  );
}
