import { Form, useActionData, useNavigation } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { Loader2, Save } from "lucide-react";
import { UserData } from "~/types/user/user.type";
import { clientAction } from "~/routes/dashboard.profile";

interface Props {
  userData?: UserData;
}

export function UpdateProfileForm({ userData }: Props) {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const firstName = userData?.usuario.first_name || "";
  const lastName = userData?.usuario.last_name || "";
  const [apellidoPat = "", apellidoMat = ""] = lastName.split(" ");

  const errors = actionData?.validationErrors;

  return (
    <Form className="space-y-6 max-w-screen-md" method="POST">
      {/* Campos ocultos necesarios para la actualización */}
      <Input type="hidden" name="id" defaultValue={userData?.id} />

      <div className="grid grid-cols-none md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            placeholder="John"
            required
            type="text"
            defaultValue={firstName}
          />
          {errors?.nombre && (
            <p className="text-red-500 text-sm">{errors.nombre[0]}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="apellido_pat">Apellido Paterno</Label>
          <Input
            id="apellido_pat"
            name="apellido_pat"
            placeholder="Smith"
            required
            type="text"
            defaultValue={apellidoPat}
          />
          {errors?.apellido_pat && (
            <p className="text-red-500 text-sm">{errors.apellido_pat[0]}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="apellido_mat">Apellido Materno</Label>
          <Input
            id="apellido_mat"
            name="apellido_mat"
            placeholder="Doe"
            required
            type="text"
            defaultValue={apellidoMat}
          />
          {errors?.apellido_mat && (
            <p className="text-red-500 text-sm">{errors.apellido_mat[0]}</p>
          )}
        </div>

        {/* <div className="grid gap-2">
          <Label htmlFor="foto_url">Foto de perfil</Label>
          <Input
            accept="image/**"
            id="foto_url"
            name="foto_url"
            required
            type="file"
          />
        </div> */}

        <div className="grid gap-2">
          <Label htmlFor="fecha_nacimiento">Fecha de nacimiento</Label>
          <Input
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            placeholder="Selecciona una fecha"
            required
            type="date"
            defaultValue={userData?.persona.fecha_nacimiento}
          />
          {errors?.fecha_nacimiento && (
            <p className="text-red-500 text-sm">{errors.fecha_nacimiento[0]}</p>
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
            defaultValue={userData?.usuario.email}
          />
          {errors?.email && (
            <p className="text-red-500 text-sm">{errors.email[0]}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="telefono">Teléfono celular</Label>
          <Input
            id="telefono"
            name="telefono"
            placeholder="55 XXXX XXXX"
            required
            type="tel"
            defaultValue={userData?.persona.telefono}
          />
          {errors?.telefono && (
            <p className="text-red-500 text-sm">{errors.telefono[0]}</p>
          )}
        </div>

        {userData?.rol === "physiotherapist" && (
          <div className="grid gap-2">
            <Label htmlFor="cedula">Cédula profesional</Label>
            <Input
              id="cedula"
              name="cedula"
              required
              type="text"
              defaultValue={userData.cedula}
            />
            {errors?.cedula && (
              <p className="text-red-500 text-sm">{errors.cedula[0]}</p>
            )}
          </div>
        )}
      </div>

      <Button
        className="w-full md:w-auto"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Actualizando...
          </>
        ) : (
          <>
            Actualizar información
            <Save className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </Form>
  );
}
