import {
  ClientActionFunctionArgs,
  redirect,
  useActionData,
} from "@remix-run/react";

import { LoginForm } from "~/components/auth/login/login-form";
import { ErrorAlert } from "~/components/shared/alert/error-alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

import { login } from "~/services/auth/auth.service";
import { loginSchema } from "~/schemas/auth/login.schema";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const { data, error, success } = loginSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return {
      validationErrors: error.flatten().fieldErrors,
    };
  }

  const { serviceData: actionData, serviceError } = await login({
    ...data,
  });

  if (serviceError) {
    return {
      serviceError,
    };
  }

  const { access_token, refresh_token } = actionData!;
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);

  return redirect("/dashboard");
}

export default function LoginPage() {
  const data = useActionData<typeof clientAction>();
  const actionError = data?.serviceError;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para ingresar al dashboard
          {actionError && <ErrorAlert message={actionError} title="Error" />}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
