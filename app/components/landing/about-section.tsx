import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Heart, Users, Zap } from "lucide-react";

const ABOUT_CARDS = [
  {
    icon: Heart,
    title: "Nuestra Misión",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    colorScheme: {
      border: "border-slate-100 dark:border-slate-800",
      background:
        "bg-gradient-to-br from-slate-50 to-white dark:from-slate-950/50 dark:to-slate-900",
      iconBg: "bg-slate-100 dark:bg-slate-900/50",
      iconColor: "text-slate-600 dark:text-slate-400",
      titleColor: "text-slate-900 dark:text-slate-100",
    },
  },
  {
    icon: Users,
    title: "Nuestra Visión",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
    colorScheme: {
      border: "border-blue-100 dark:border-blue-800",
      background:
        "bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/50 dark:to-slate-900",
      iconBg: "bg-blue-100 dark:bg-blue-900/50",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-900 dark:text-blue-100",
    },
  },
  {
    icon: Zap,
    title: "Nuestro Compromiso",
    description:
      "Como un producto nuevo en el mercado, estamos dedicados a revolucionar la fisioterapia con simplicidad, eficiencia y resultados excepcionales.",
    colorScheme: {
      border: "border-green-100 dark:border-green-800",
      background:
        "bg-gradient-to-br from-green-50 to-white dark:from-green-950/50 dark:to-slate-900",
      iconBg: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-green-600 dark:text-green-400",
      titleColor: "text-green-900 dark:text-green-100",
    },
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="space-y-12 py-16 px-4 md:px-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/50 dark:to-blue-900/30"
    >
      <div className="text-center space-y-6">
        <Badge
          variant="outline"
          className="px-4 py-2 border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300"
        >
          Conoce Más Sobre Nosotros
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-slate-600 to-blue-600 dark:from-slate-400 dark:to-blue-400 bg-clip-text text-transparent">
          Acerca de Nosotros
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ABOUT_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className={`${card.colorScheme.border} ${card.colorScheme.background} hover:shadow-lg transition-all duration-300`}
              >
                <CardContent className="pt-6 pb-6">
                  <div
                    className={`w-12 h-12 ${card.colorScheme.iconBg} rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${card.colorScheme.iconColor}`} />
                  </div>
                  <h3
                    className={`text-xl font-semibold ${card.colorScheme.titleColor} mb-4`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
