import { NavLink } from "@remix-run/react";
import { cn } from "~/lib/utils";

interface Props {
  label: string;
  to: string;
}

export function BreadcrumbLink({ label, to }: Props) {
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "text-sm font-medium transition-colors hover:text-foreground/80 active:text-accent-foreground",
          isActive ? "text-accent-foreground" : "text-foreground/60"
        )
      }
      to={to}
      end
    >
      {label}
    </NavLink>
  );
}
