import { Form, Link, useNavigation } from "@remix-run/react";
import { LoaderCircle } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form className="flex flex-col gap-6" method="post">
      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          placeholder="user@example.com"
          required
          type="email"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <p className="text-end text-sm">
        {/* <Link className="hover:underline text-primary" to="#">
          ¿Olvidaste tu contraseña?
        </Link> */}
      </p>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? (
          <>
            <span className="sr-only">Iniciando sesión</span>
            <LoaderCircle className="animate-spin w-4 h-4" />
          </>
        ) : (
          <span>Iniciar sesión</span>
        )}
      </Button>
      <p className="text-end text-sm">
        ¿No tienes una cuenta?{" "}
        <Link className="hover:underline text-primary" to="/auth/register">
          Regístrate
        </Link>
      </p>
    </Form>
  );
}
