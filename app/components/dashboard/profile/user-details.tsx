import { ArrowUpRight } from "lucide-react";
import { Button } from "~/components/ui/button";

export function UserDetails() {
  const user = {
    nombre: "John",
    apellido_pat: "Smith",
    apellido_mat: "Doe",
    fecha_nacimiento: "1990-01-01",
    correo: "a@example.com",
    telefono: "55 XXXX XXXX",
    cedula: "12345678",
  };

  return (
    <div className="space-y-6 max-w-screen-md">
      <div className="grid grid-cols-none md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Nombre:</span> {user.nombre}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Apellido Paterno:</span>{" "}
            {user.apellido_pat}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Apellido Materno:</span>{" "}
            {user.apellido_mat}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Fecha de nacimiento:</span>{" "}
            {user.fecha_nacimiento}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Correo electrónico:</span>{" "}
            {user.correo}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Teléfono celular:</span>{" "}
            {user.telefono}
          </p>
        </div>

        <div className="grid gap-2">
          <p>
            <span className="font-semibold">Cédula profesional:</span>{" "}
            {user.cedula}
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
      </div>
    </div>
  );
}
