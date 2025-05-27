import {
  Activity,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Zap,
  Heart,
} from "lucide-react";
import type { Feature, AboutCard, FaqItem } from "./types";

export const FEATURES: Feature[] = [
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

export const ABOUT_CARDS: AboutCard[] = [
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

export const FAQ_ITEMS: FaqItem[] = [
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
