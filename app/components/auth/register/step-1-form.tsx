import { Form, Link } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export function Step1Form() {
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
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-1">
        <div>
          <Label htmlFor="apellido_pat">Apellido Paterno</Label>
          <Input
            id="apellido_pat"
            name="apellido_pat"
            placeholder="Smith"
            required
            type="text"
          />
        </div>
        <div>
          <Label htmlFor="apellido_mat">Apellido Materno</Label>
          <Input
            id="apellido_mat"
            name="apellido_mat"
            placeholder="Doe"
            required
            type="text"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
        <Input
          id="fecha_nacimiento"
          name="fecha_nacimiento"
          placeholder="Selecciona una fecha"
          required
          type="date"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="correo">Correo electrónico</Label>
        <Input
          id="correo"
          name="correo"
          placeholder="a@example.com"
          required
          type="email"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-1">
        <div className="grid gap-2">
          <Label htmlFor="contrasenia">Contraseña</Label>
          <Input id="contrasenia" name="contrasenia" required type="password" />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="confirma_contrasenia">Confirma tu contraseña</Label>
          <Input
            id="confirma_contrasenia"
            name="confirma_contrasenia"
            required
            type="password"
          />
        </div>
      </div>

      <Button type="submit">Registrarse</Button>

      <p className="text-end text-sm">
        ¿Ya tienes una cuenta?{' '}
        <Link className="hover:underline text-primary" to="/auth/login">
          Inicia sesión
        </Link>
      </p>
    </Form>
  );
}
