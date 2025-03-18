import { Link } from "@remix-run/react";

import { Menu } from "lucide-react";

import { Button } from "~/components/ui/button";
import { useUIStore } from "~/store/ui.store";
import { AvatarMenu } from "./avatar-menu";

export function Topbar() {
  const toggleSideMenu = useUIStore((state) => state.toggleSideMenu);

  return (
    <header className="sticky top-0 z-50 border-b bg-white text-primary px-6">
      <div className="flex gap-2 h-16 items-center">
        <Button
          className="md:hidden"
          onClick={toggleSideMenu}
          variant="ghost"
          size="icon"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menú</span>
        </Button>

        <h1 className="text-xl flex-1">
          <Link to="/dashboard">Fisiogo</Link>
        </h1>

        <AvatarMenu />
      </div>
    </header>
  );
}
