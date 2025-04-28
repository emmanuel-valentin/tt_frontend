import { Link } from "@remix-run/react";

import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { Activity } from "~/types/activity/activity.type";
import { useAuthStore } from "~/store/auth.store";

interface Props {
  activity: Activity;
}

export function ActivityAssignedUserBadge({ activity }: Props) {
  const userRole = useAuthStore((state) => state.userData?.rol);

  const isPhysiotherapist = userRole === "physiotherapist";

  const personToShow = isPhysiotherapist
    ? activity.paciente
    : activity.fisioterapeuta;

  return (
    <Link
      to={`/dashboard/profile/${personToShow.persona_id}`}
      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
    >
      <UserAvatar src={personToShow.fotoUrl} className="h-5 w-5" />
      <span className="text-xs font-medium">
        {personToShow.nombre} {personToShow.apellidoPat}
      </span>
    </Link>
  );
}
