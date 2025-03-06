import { Form } from '@remix-run/react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { Save } from 'lucide-react';

export function UpdateProfileForm() {
  return (
    <Form className="space-y-6 max-w-screen-md" method="post">
      <div className="grid grid-cols-none md:grid-cols-2 gap-6">
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

        <div className="grid gap-2">
          <Label htmlFor="apellido_pat">Apellido Paterno</Label>
          <Input
            id="apellido_pat"
            name="apellido_pat"
            placeholder="Smith"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="apellido_mat">Apellido Materno</Label>
          <Input
            id="apellido_mat"
            name="apellido_mat"
            placeholder="Doe"
            required
            type="text"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="foto">Foto de perfil</Label>
          <Input accept="image/**" id="foto" name="foto" required type="file" />
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

        <div className="grid gap-2">
          <Label htmlFor="telefono">Teléfono celular</Label>
          <Input
            id="telefono"
            name="telefono"
            placeholder="55 XXXX XXXX"
            required
            type="tel"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="cedula">Cédula profesional</Label>
          <Input id="cedula" name="cedula" required type="text" />
        </div>
      </div>

      <Button className="w-full md:w-auto" type="submit">
        <Save />
        Actualizar información
      </Button>
    </Form>
  );
}
