import { Link } from "@remix-run/react";
import { SidebarMenuButton } from "~/components/ui/sidebar";
import { LogoIcon, LogoText } from "./logo";

interface SidebarLogoProps {
  to?: string;
}

export function SidebarLogo({ to = "/dashboard" }: SidebarLogoProps) {
  return (
    <SidebarMenuButton size="lg" asChild>
      <Link to={to}>
        <LogoIcon size="md" />
        <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
          <LogoText size="sm" />
          <span className="text-xs">Panel principal</span>
        </div>
      </Link>
    </SidebarMenuButton>
  );
}
