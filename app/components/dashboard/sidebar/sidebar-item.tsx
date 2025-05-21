import { NavLink } from "@remix-run/react";
import { LucideIcon } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";

interface Props {
  icon: LucideIcon;
  path: string;
  label: string;
}

export function SidebarItem({ icon: Icon, path, label }: Props) {
  return (
    <NavLink to={path} end>
      {({ isActive }) => (
        <SidebarMenuItem>
          <SidebarMenuButton isActive={isActive}>
            <Icon />
            <span>{label}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      )}
    </NavLink>
  );
}
