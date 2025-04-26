import { useNavigate, useRevalidator } from "@remix-run/react";

import { Check, Eye, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  acceptPatientLink,
  deletePatientLink,
} from "~/services/user/physiotherapist/physiotherapist.service";

import { type EnrollmentStatus } from "~/types/user/user.type";

interface Props {
  userId: string;
  estatus: EnrollmentStatus;
  vinculacionId: string;
}

export function PatientsDataTableActions({
  userId,
  estatus,
  vinculacionId,
}: Props) {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const handleDelete = async () => {
    const { serviceError } = await deletePatientLink(vinculacionId);
    if (serviceError) {
      toast.error(
        "Error al desvincular paciente, por favor intenta nuevamente"
      );
      return;
    }

    toast.success("Paciente desvinculado correctamente");
    revalidator.revalidate();
  };

  const handleAccept = async () => {
    const { serviceError } = await acceptPatientLink(vinculacionId);
    if (serviceError) {
      toast.error("Error al vincular paciente, por favor intenta nuevamente");
      return;
    }

    toast.success("Paciente vinculado correctamente");
    revalidator.revalidate();
  };

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

        {estatus === "PENDIENTE" && (
          <DropdownMenuItem onClick={handleAccept}>
            <Check className="h-4 w-4" />
            Aceptar solicitud
          </DropdownMenuItem>
        )}

        {estatus === "VINCULADO" && (
          <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
            <Trash className="h-4 w-4" />
            Desvincular paciente
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
