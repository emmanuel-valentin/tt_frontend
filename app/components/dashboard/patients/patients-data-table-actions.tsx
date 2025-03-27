import { useNavigate } from "@remix-run/react";

import { Check, Eye, MoreVertical, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { type EnrollmentStatus } from "~/types/user/patient.type";

interface Props {
  userId: string;
  estatus: EnrollmentStatus;
}

export function PatientsDataTableActions({ userId, estatus }: Props) {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acctiones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigate(`/dashboard/profile/${userId}`)}
        >
          <Eye className="h-4 w-4" />
          Ver perfil
        </DropdownMenuItem>

        {estatus === "aceptado" && (
          <DropdownMenuItem>
            <Check className="h-4 w-4" />
            Aceptar solicitud
          </DropdownMenuItem>
        )}

        {estatus === "pendiente" && (
          <DropdownMenuItem className="text-red-500">
            <Trash className="h-4 w-4" />
            Desvincular paciente
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
