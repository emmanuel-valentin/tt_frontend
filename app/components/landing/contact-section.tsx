import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Mail } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="space-y-12 py-16 px-4 md:px-8">
      <div className="text-center space-y-6">
        <Badge
          variant="outline"
          className="px-4 py-2 border-green-200 text-green-700 dark:border-green-700 dark:text-green-300"
        >
          Ponte en Contacto
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400 bg-clip-text text-transparent">
          Contacto
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-white dark:border-blue-800 dark:from-blue-950/50 dark:to-slate-900 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-blue-900 dark:text-blue-100">
              Envíanos un Mensaje
            </CardTitle>
            <CardDescription className="text-base">
              Estamos aquí para ayudarte. Completa el formulario y nos pondremos
              en contacto contigo pronto.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="contact-name"
                  className="text-blue-900 dark:text-blue-100"
                >
                  Nombre *
                </Label>
                <Input
                  id="contact-name"
                  type="text"
                  placeholder="Tu nombre completo"
                  required
                  className="border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="contact-email"
                  className="text-blue-900 dark:text-blue-100"
                >
                  Email *
                </Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contact-subject"
                className="text-blue-900 dark:text-blue-100"
              >
                Asunto *
              </Label>
              <Input
                id="contact-subject"
                type="text"
                placeholder="¿En qué podemos ayudarte?"
                required
                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-400"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="contact-message"
                className="text-blue-900 dark:text-blue-100"
              >
                Mensaje *
              </Label>
              <Textarea
                id="contact-message"
                placeholder="Cuéntanos más detalles sobre tu consulta..."
                required
                className="border-blue-200 focus:border-blue-500 dark:border-blue-700 dark:focus:border-blue-400 h-32 resize-none"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:shadow-lg">
              <Mail className="w-5 h-5 mr-2" />
              Enviar Mensaje
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              * Campos obligatorios. Nos pondremos en contacto contigo en un
              plazo de 24 horas.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
