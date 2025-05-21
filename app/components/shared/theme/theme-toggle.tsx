import { Label } from "@radix-ui/react-label";
import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Separator } from "~/components/ui/separator";
import { SidebarMenuButton } from "~/components/ui/sidebar";
import { Switch } from "~/components/ui/switch";

export function ThemeToggle() {
  const [theme, setTheme] = useTheme();
  const isDark = theme === Theme.DARK;

  const toggleTheme = () => {
    setTheme(isDark ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Sun className="size-4 dark:hidden" />
          <Moon className="size-4 hidden dark:block" />
          <span>Cambiar apariencia</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2 p-2">
        <div className="flex items-center gap-2">
          <Sun className="size-4 dark:hidden" />
          <Moon className="size-4 hidden dark:block" />
          <span>Cambiar apariencia</span>
        </div>
        <Separator />
        <div className="flex items-center gap-2 text-sm">
          <Switch
            id="theme-toggle"
            checked={isDark}
            onCheckedChange={toggleTheme}
          />
          <Label htmlFor="theme-toggle">
            {isDark ? "Modo oscuro" : "Modo claro"}
          </Label>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
