import { Form, Link } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export function LoginForm() {
  return (
    <Form className="flex flex-col gap-6" method="post" action="/auth/login">
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
        <Label htmlFor="password">Correo electrónico</Label>
        <Input id="password" name="password" type="password" required />
      </div>
      <p className="text-end text-sm">
        <Link className="hover:underline text-primary" to="#">
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
      <Button type="submit">Iniciar sesión</Button>
      <p className="text-end text-sm">
        ¿No tienes una cuenta?{' '}
        <Link className="hover:underline text-primary" to="/auth/register">
          Regístrate
        </Link>
      </p>
    </Form>
  );
}
