import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { formatDateForInput } from "~/lib/utils";
import { clientAction, clientLoader } from "~/routes/auth.register";

export function Step1Form() {
  const actionData = useActionData<typeof clientAction>();
  const loaderData = useLoaderData<typeof clientLoader>();
  const errors = actionData?.errors;

  return (
    <Form className="flex flex-col gap-6" method="post">
      <div className="grid gap-2">
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          name="nombre"
          placeholder="John"
          required
          type="text"
          defaultValue={loaderData?.nombre}
        />
        {errors?.nombre && (
          <p className="text-destructive text-sm">{errors.nombre[0]}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-1">
        <div>
          <Label htmlFor="apellidoPaterno">Apellido Paterno</Label>
          <Input
            id="apellidoPaterno"
            name="apellidoPaterno"
            placeholder="Smith"
            required
            type="text"
            defaultValue={loaderData?.apellidoPaterno}
          />
          {errors?.apellidoPaterno && (
            <p className="text-destructive text-sm">
              {errors.apellidoPaterno[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="apellidoMaterno">Apellido Materno</Label>
          <Input
            id="apellidoMaterno"
            name="apellidoMaterno"
            placeholder="Doe"
            required
            type="text"
            defaultValue={loaderData?.apellidoMaterno}
          />
          {errors?.apellidoMaterno && (
            <p className="text-destructive text-sm">
              {errors.apellidoMaterno[0]}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
        <Input
          id="fechaNacimiento"
          name="fechaNacimiento"
          placeholder="Selecciona una fecha"
          required
          type="date"
          defaultValue={formatDateForInput(loaderData?.fechaNacimiento)}
        />
        {errors?.fechaNacimiento && (
          <p className="text-destructive text-sm">
            {errors.fechaNacimiento[0]}
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          placeholder="a@example.com"
          required
          type="email"
          defaultValue={loaderData?.email}
        />
        {errors?.email && (
          <p className="text-destructive text-sm">{errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-1">
        <div className="grid gap-2 w-full">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={loaderData?.password}
          />
          {errors?.passwordConfirm && (
            <p className="text-destructive text-sm">
              {errors.passwordConfirm[0]}
            </p>
          )}
        </div>

        <div className="grid gap-2 w-full">
          <Label htmlFor="passwordConfirm">Confirma tu contraseña</Label>
          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            required
            type="password"
            defaultValue={loaderData?.passwordConfirm}
          />
          {errors?.passwordConfirm && (
            <p className="text-destructive text-sm">
              {errors.passwordConfirm[0]}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          required
          className="accent-primary h-4 w-4 rounded border border-input focus:ring-2 focus:ring-primary"
          value="on"
          defaultChecked={loaderData?.acceptTerms === "on"}
        />
        <Label htmlFor="acceptTerms" className="text-sm">
          Acepto los{" "}
          <Link
            to="/terms"
            className="text-primary underline hover:text-primary/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            Términos y Condiciones
          </Link>
        </Label>
      </div>
      {errors?.acceptTerms && (
        <p className="text-destructive text-sm">{errors.acceptTerms[0]}</p>
      )}

      <Button type="submit">Registrarse</Button>

      <p className="text-end text-sm">
        ¿Ya tienes una cuenta?{" "}
        <Link className="hover:underline text-primary" to="/auth/login">
          Inicia sesión
        </Link>
      </p>
    </Form>
  );
}
