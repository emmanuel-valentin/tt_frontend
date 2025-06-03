import { cn, getAPIResource } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface Props {
  className?: string;
  src?: string | null;
}

export function UserAvatar({ className, src }: Props) {
  const photoUrl = src?.startsWith("storage") ? getAPIResource(src) : src;

  return (
    <Avatar className={cn("size-8 rounded-full", className)}>
      <AvatarImage src={photoUrl ?? undefined} />
      <AvatarFallback className="rounded-lg">
        <img src="/user-avatar.svg" alt="Foto de perfil por defecto" />
      </AvatarFallback>
    </Avatar>
  );
}
