import { useNavigate } from "@remix-run/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { UserAvatar } from "~/components/shared/avatar/user-avatar";

import { LogOut, User } from "lucide-react";
import { useAuthStore } from "~/store/auth.store";

export function AvatarMenu() {
  const navigate = useNavigate();
  const fotoUrl = useAuthStore((state) => state.userData?.persona.foto_url);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className="w-10 h-10" src={fotoUrl} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/profile")}
        >
          <User />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => navigate("/auth/logout", { replace: true })}
        >
          <LogOut />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
