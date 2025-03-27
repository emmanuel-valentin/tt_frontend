import { SidebarItem } from "./sidebar-item";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

import { cn } from "~/lib/utils";
import { DASHBOARDROUTES as routes } from "~/constants/routes";
import { useUIStore } from "~/store/ui.store";

export function Sidebar() {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex md:flex-col gap-2 border-r p-2 lg:w-80">
        <TooltipProvider>
          {routes.map((route) => (
            <Tooltip key={route.path}>
              <TooltipTrigger>
                <SidebarItem
                  icon={route.icon}
                  path={route.path}
                  title={route.label}
                />
              </TooltipTrigger>
              <TooltipContent className="lg:hidden">
                {route.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>

      {/* Mobile nav */}
      <nav
        className={cn(
          "flex flex-col md:hidden gap-2 w-full h-full px-2 pt-2 border-l fixed bg-white transition-transform duration-200 z-50",
          {
            "-translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        {routes.map((route) => (
          <SidebarItem
            icon={route.icon}
            key={route.path}
            path={route.path}
            title={route.label}
          />
        ))}
      </nav>
    </>
  );
}
