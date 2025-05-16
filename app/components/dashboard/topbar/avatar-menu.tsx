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
import { Button } from "~/components/ui/button";

export function AvatarMenu() {
  const navigate = useNavigate();
  const fotoUrl = useAuthStore((state) => state.userData?.persona.foto_url);
  const firstName = useAuthStore((state) => state.userData?.usuario.first_name);
  const lastName = useAuthStore((state) => state.userData?.usuario.last_name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="p-6">
          {firstName} {lastName}
          <UserAvatar className="size-8" src={fotoUrl} />
        </Button>
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
