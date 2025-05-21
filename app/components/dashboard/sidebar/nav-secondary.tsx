import { Link } from "@remix-run/react";
import { PenLine, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "~/components/shared/theme/theme-toggle";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

export function NavSecondary() {
  return (
    <SidebarGroup className="mt-auto">
      <SidebarGroupLabel>Configuración y privacidad</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <ThemeToggle />
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <PenLine />
            <Link to="/terms">Términos y condiciones</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton>
            <ShieldCheck />
            <Link to="/privacy">Política de privacidad</Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
