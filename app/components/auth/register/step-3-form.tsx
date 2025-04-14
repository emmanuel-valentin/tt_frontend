import {
  Form,
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import { LoaderCircle, PlusCircle } from "lucide-react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import {
  clientAction,
  clientLoader,
} from "~/routes/auth.register_.additional-info";
import { useAvatarPreview } from "~/hooks/use-avatar-preview";

export function Step3Form() {
  const loaderData = useLoaderData<typeof clientLoader>();
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();
  const { avatarPreview, handleAvatarChange } = useAvatarPreview();

  const isSubmitting = navigation.state === "submitting";
  const errors = actionData?.validationErrors;

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
          defaultValue={loaderData.telefono}
        />
        {errors?.telefono && (
          <p className="text-red-500 text-sm">{errors.telefono[0]}</p>
        )}
      </div>

      {loaderData.role === "physiotherapist" && (
        <div className="grid gap-2">
          <Label htmlFor="cedula">Cédula profesional</Label>
          <Input id="cedula" name="cedula" required type="text" />
          {errors?.cedula && (
            <p className="text-red-500 text-sm">{errors.cedula[0]}</p>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-row gap-2">
        <Button className="flex-1" variant="secondary" asChild>
          <Link to="/auth/register/select-role" replace>
            Atrás
          </Link>
        </Button>

        <Button className="flex-1" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            "Finalizar registro"
          )}
        </Button>
      </div>
    </Form>
  );
}
