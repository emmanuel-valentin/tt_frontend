import { ArrowUpRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { UserData } from "~/types/user/user.type";

interface Props {
  userData: UserData;
}

export function UserDetails({ userData }: Props) {
  const nombre = userData?.usuario.first_name || "";
  const apellidos = userData?.usuario.last_name.split(" ");
  const apellidoPat = apellidos?.[0] || "";
  const apellidoMat = apellidos?.[1] || "";

  return (
    <div className="space-y-6 max-w-screen-md">
      <div className="grid grid-cols-none md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Nombre:</span> {nombre}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Apellido Paterno:</span>{" "}
            {apellidoPat}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Apellido Materno:</span>{" "}
            {apellidoMat}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Fecha de nacimiento:</span>{" "}
            {userData.persona.fecha_nacimiento}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Correo electrónico:</span>{" "}
            {userData.usuario.email}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Teléfono celular:</span>{" "}
            {userData.persona.telefono}
          </p>
        </div>

        {userData.rol === "physiotherapist" && (
          <div className="grid gap-2">
            <p>
              <span className="font-semibold">Cédula profesional:</span>{" "}
              {userData.cedula}
            </p>

            <Button asChild className="w-fit p-0" variant="link">
              <a
                href="https://www.cedulaprofesional.sep.gob.mx/cedula/presidencia/indexAvanzada.action"
                rel="noreferrer"
                target="_blank"
              >
                Consultar cédula
                <ArrowUpRight className="h-4 2-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
