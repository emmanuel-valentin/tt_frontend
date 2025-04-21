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
import { setAuthTokens } from "~/lib/utils";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const parsedData = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsedData.success) {
    return {
      validationErrors: parsedData.error.flatten().fieldErrors,
    };
  }

  const response = await login(parsedData.data);

  if (response.serviceError) {
    return {
      serviceError: response.serviceError,
    };
  }

  const data = response.serviceData!;
  setAuthTokens(data.access_token, data.refresh_token);
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
