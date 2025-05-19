import { useAuthStore } from "~/store/auth.store";
import { DASHBOARDROUTES as routes } from "~/constants/routes";
import { SidebarItem } from "./sidebar-item";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "~/components/ui/sidebar";

export function NavMain() {
  const role = useAuthStore((state) => state.userData!.rol);
  const filteredRoutes = routes.filter((route) =>
    route.allowedRoles.includes(role)
  );

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menú Principal</SidebarGroupLabel>
      <SidebarMenu>
        {filteredRoutes.map((route) => (
          <SidebarItem {...route} key={route.path} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
