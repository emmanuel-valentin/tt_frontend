import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

const FAQ_ITEMS = [
  {
    question: "¿Cómo empiezo a usar Fisiogo?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    question: "¿Es segura mi información?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    question: "¿Puedo cancelar mi suscripción?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
];

export function HelpSection() {
  return (
    <section
      id="help"
      className="space-y-12 py-16 px-4 md:px-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30"
    >
      <div className="text-center space-y-6">
        <Badge
          variant="outline"
          className="px-4 py-2 border-purple-200 text-purple-700 dark:border-purple-700 dark:text-purple-300"
        >
          Centro de Soporte
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
          Centro de Ayuda
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-center">
          Preguntas Frecuentes
        </h3>
        <div className="space-y-4 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
