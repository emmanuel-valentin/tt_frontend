import { Card } from "~/components/ui/card";

export function Footer() {
  return (
    <Card className="bg-background border-t py-3 px-4 mt-auto mx-4 mb-4">
      <footer className="container mx-auto flex items-center justify-between text-sm text-muted-foreground">
        <div>
          <p>© {new Date().getFullYear()} Fisiogo.</p>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/help" className="hover:text-primary transition-colors">
            Ayuda
          </a>
          <a href="/privacy" className="hover:text-primary transition-colors">
            Privacidad
          </a>
          <a href="/terms" className="hover:text-primary transition-colors">
            Términos y condiciones
          </a>
        </div>
      </footer>
    </Card>
  );
}
