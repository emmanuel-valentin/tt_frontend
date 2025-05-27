import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  Activity,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

const FEATURES = [
  {
    icon: Activity,
    title: "Seguimiento de Actividades",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
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
    icon: Users,
    title: "Gestión de Pacientes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    colorScheme: {
      border: "border-green-100 dark:border-green-800",
      background:
        "bg-gradient-to-br from-green-50 to-white dark:from-green-950/50 dark:to-slate-900",
      iconBg: "bg-green-100 dark:bg-green-900/50",
      iconColor: "text-green-600 dark:text-green-400",
      titleColor: "text-green-900 dark:text-green-100",
    },
  },
  {
    icon: Calendar,
    title: "Programación Inteligente",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    colorScheme: {
      border: "border-purple-100 dark:border-purple-800",
      background:
        "bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/50 dark:to-slate-900",
      iconBg: "bg-purple-100 dark:bg-purple-900/50",
      iconColor: "text-purple-600 dark:text-purple-400",
      titleColor: "text-purple-900 dark:text-purple-100",
    },
  },
  {
    icon: BarChart3,
    title: "Análisis y Reportes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    colorScheme: {
      border: "border-orange-100 dark:border-orange-800",
      background:
        "bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/50 dark:to-slate-900",
      iconBg: "bg-orange-100 dark:bg-orange-900/50",
      iconColor: "text-orange-600 dark:text-orange-400",
      titleColor: "text-orange-900 dark:text-orange-100",
    },
  },
  {
    icon: Shield,
    title: "Seguridad Avanzada",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    colorScheme: {
      border: "border-red-100 dark:border-red-800",
      background:
        "bg-gradient-to-br from-red-50 to-white dark:from-red-950/50 dark:to-slate-900",
      iconBg: "bg-red-100 dark:bg-red-900/50",
      iconColor: "text-red-600 dark:text-red-400",
      titleColor: "text-red-900 dark:text-red-100",
    },
  },
  {
    icon: Zap,
    title: "Rendimiento Optimizado",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    colorScheme: {
      border: "border-yellow-100 dark:border-yellow-800",
      background:
        "bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/50 dark:to-slate-900",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      titleColor: "text-yellow-900 dark:text-yellow-100",
    },
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="space-y-12 py-16 px-4 md:px-8">
      <div className="text-center space-y-6">
        <Badge
          variant="outline"
          className="px-4 py-2 border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-300"
        >
          Nuestras Características
        </Badge>
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Características
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className={`${feature.colorScheme.border} ${feature.colorScheme.background} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
            >
              <CardHeader>
                <div
                  className={`w-12 h-12 ${feature.colorScheme.iconBg} rounded-lg flex items-center justify-center mb-4`}
                >
                  <Icon
                    className={`w-6 h-6 ${feature.colorScheme.iconColor}`}
                  />
                </div>
                <CardTitle className={feature.colorScheme.titleColor}>
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
