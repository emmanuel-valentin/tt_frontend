import { Link } from "@remix-run/react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { ActivityActions } from "./activity-actions";

import { ChevronRight } from "lucide-react";
import { Activity } from "~/types/activity/activity.type";
import { useAuthStore } from "~/store/auth.store";
import { Role } from "~/types/user/user.type";

interface Props {
  activity: Activity;
}

export function ActivityCard({ activity }: Props) {
  const role = useAuthStore((state) => state.userData?.rol);

  return (
    <Card>
      <CardHeader className="items-start flex flex-row justify-between">
        <Button asChild className="px-0" variant="link">
          <Link
            className="flex gap-1 items-center"
            to={`/dashboard/profile/${activity.paciente.persona_id}`}
          >
            <UserAvatar className="w-6 h-6" src={activity.paciente.fotoUrl} />
            <span className="text-foreground">
              {activity.paciente.nombre} {activity.paciente.apellidoPat}{" "}
              {activity.paciente.apellidoMat}
            </span>
          </Link>
        </Button>

        {role === Role.PHYSIOTHERAPIST && (
          <ActivityActions activity={activity} />
        )}
      </CardHeader>

      {/* Title and description */}
      <CardContent>
        <div className="flex flex-col max-w-prose">
          <h3 className="font-medium">{activity.nombre}</h3>
          <p className="text-sm text-balance line-clamp-1 text-foreground/80">
            {activity.descripcion}
          </p>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button asChild>
          <Link
            className="flex-1 md:flex-none"
            to={`/dashboard/activities/${activity.id}`}
          >
            Ver detalles
            <ChevronRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
