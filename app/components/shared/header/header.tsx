import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { LayoutDashboard, Menu, X, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { Logo } from "~/components/shared/logo/logo";
import { Theme, useTheme } from "remix-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useTheme();
  const isDark = theme === Theme.DARK;

  const toggleTheme = () => {
    setTheme(isDark ? Theme.LIGHT : Theme.DARK);
  };

  return (
    <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
      <header className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Características
            </a>
            <a
              href="#about"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Acerca de
            </a>
            <a
              href="#contact"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Contacto
            </a>
            <a
              href="#help"
              className="text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              Ayuda
            </a>
            <Separator orientation="vertical" className="h-6" />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-muted"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Cambiar tema</span>
            </Button>
            <Button asChild variant="default" className="shadow-lg">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Panel de Control</span>
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t">
            <nav className="flex flex-col space-y-3">
              <a
                href="#features"
                className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Características
              </a>
              <a
                href="#about"
                className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Acerca de
              </a>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </a>
              <a
                href="#help"
                className="text-muted-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Ayuda
              </a>
              <div className="flex items-center gap-2 mt-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="hover:bg-muted"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Cambiar tema</span>
                </Button>
                <Button asChild variant="default" className="flex-1 shadow-lg">
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-center space-x-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Panel de Control</span>
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </Card>
  );
}
