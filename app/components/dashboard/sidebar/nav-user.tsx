import { useNavigate } from "@remix-run/react";

import { EllipsisVertical, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar";

import { UserAvatar } from "~/components/shared/avatar/user-avatar";
import { useAuthStore } from "~/store/auth.store";

export function NavUser() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const user = useAuthStore((state) => state.userData);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground w-full"
            >
              <UserAvatar src={user?.persona.foto_url} />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user?.usuario.first_name} {user?.usuario.last_name}
                </span>
                <span className="truncate text-xs">{user?.usuario.email}</span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserAvatar src={user?.persona.foto_url} />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {user?.usuario.first_name} {user?.usuario.last_name}
                  </span>
                  <span className="truncate text-xs">
                    {user?.usuario.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
              <User className="mr-2 size-4" />
              Perfil
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => navigate("/auth/logout", { replace: true })}
            >
              <LogOut className="mr-2 size-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
