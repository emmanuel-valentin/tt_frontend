import { Link } from "@remix-run/react";
import { Card } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Shield, FileText } from "lucide-react";
import { Logo } from "~/components/shared/logo/logo";

export function Footer() {
  return (
    <Card className="bg-background border-t mt-auto">
      <footer className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo size="sm" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transformando la fisioterapia con tecnología avanzada para mejorar
              la calidad de vida de nuestros pacientes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Enlaces Rápidos</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/#features"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Características
              </Link>
              <Link
                to="/#about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Acerca de Nosotros
              </Link>
              <Link
                to="/#contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/terms"
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Términos y Condiciones</span>
              </Link>
              <Link
                to="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Política de Privacidad</span>
              </Link>
              <Link
                to="/#help"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Centro de Ayuda
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Fisiogo. Todos los derechos reservados.
          </p>
          <div className="flex items-center space-x-4 text-muted-foreground text-sm">
            <span>Versión 1.0.0</span>
            <Separator orientation="vertical" className="h-4" />
            <span>
              Última actualización: {new Date().toLocaleDateString("es-ES")}
            </span>
          </div>
        </div>
      </footer>
    </Card>
  );
}
