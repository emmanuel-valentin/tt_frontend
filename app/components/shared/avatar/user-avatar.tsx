import { cn } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

interface Props {
  className?: string;
  src?: string | null;
}

export function UserAvatar({ className, src }: Props) {
  return (
    <Avatar className={cn("w-10 h-10", className)}>
      <AvatarImage src={src ?? undefined} />
      <AvatarFallback>
        <img src="/user-avatar.svg" alt="Foto de perfil por defecto" />
      </AvatarFallback>
    </Avatar>
  );
}
