import { Link, useRevalidator } from "@remix-run/react";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Card, CardFooter, CardHeader } from "~/components/ui/card";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";

import { Check, X } from "lucide-react";
import { Link as UserLink } from "~/types/user/user.type";

import {
  acceptPatientLink,
  deletePatientLink,
} from "~/services/user/physiotherapist/physiotherapist.service";

interface Props {
  link: UserLink;
}

export function PatientRequestCard({ link }: Props) {
  const revalidator = useRevalidator();

  const handleDelete = async () => {
    const { serviceError } = await deletePatientLink(link.vinculacion_id);
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
    const { serviceError } = await acceptPatientLink(link.vinculacion_id);
    if (serviceError) {
      toast.error("Error al vincular paciente, por favor intenta nuevamente");
      return;
    }

    toast.success("Paciente vinculado correctamente");
    revalidator.revalidate();
  };

  return (
    <Card>
      <CardHeader>
        <Button asChild className="justify-start p-0" variant="link">
          <Link to={`/dashboard/profile/${link.persona.id}`}>
            <UserAvatar src={link.persona.foto_url} className="w-12 h-12" />
            <p className="text-foreground/80 text-base line-clamp-1">
              {link.usuario.first_name} {link.usuario.last_name}
            </p>
          </Link>
        </Button>
      </CardHeader>
      <CardFooter className="gap-2">
        <Button className="flex-1" variant="destructive" onClick={handleDelete}>
          <X />
          Rechazar
        </Button>
        <Button className="flex-1" onClick={handleAccept}>
          <Check />
          Aceptar
        </Button>
      </CardFooter>
    </Card>
  );
}
