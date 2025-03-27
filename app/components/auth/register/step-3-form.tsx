import { useState } from 'react';
import { Form, Link } from '@remix-run/react';

import { PlusCircle } from 'lucide-react';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { UserAvatar } from '~/components/shared/avatar/user-avatar';

interface Props {
  role: 'patient' | 'physiotherapist';
}

export function Step3Form({ role }: Props) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Form className="flex flex-col gap-6" method="post">
      <div className="relative mx-auto">
        <Label
          aria-label="Seleccionar foto de perfil"
          className="h-full w-full cursor-pointer"
          htmlFor="foto"
        >
          <UserAvatar className="h-32 w-32" src={avatarPreview} />
        </Label>

        <div className="absolute bottom-2 right-2 rounded-full bg-primary p-1 text-primary-foreground">
          <PlusCircle className="h-5 w-5" />
        </div>

        <Input
          accept="image/**"
          className="hidden"
          id="foto"
          name="foto"
          onChange={handleAvatarChange}
          type="file"
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

      {role === 'physiotherapist' && (
        <div className="grid gap-2">
          <Label htmlFor="cedula">Cédula profesional</Label>
          <Input id="cedula" name="cedula" required type="text" />
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-row gap-2">
        <Button className="flex-1" variant="secondary" asChild>
          <Link to="/auth/register/select-role" replace>
            Atrás
          </Link>
        </Button>

        <Button className="flex-1" type="submit">
          Finalizar
        </Button>
      </div>
    </Form>
  );
}
