import { ClientActionFunctionArgs, redirect } from "@remix-run/react";
import { LoginForm } from "~/components/auth/login/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  console.log(Object.fromEntries(formData));
  return redirect("/dashboard");
}

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inicia sesión</CardTitle>
        <CardDescription>
          Ingresa tus credenciales para ingresar al dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
