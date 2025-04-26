import { Activity, Home, LucideIcon, Stethoscope, Users } from "lucide-react";
import type { Role } from "~/types/user/user.type";

interface Route {
  path: string;
  label: string;
  icon: LucideIcon;
  allowedRoles: Role[];
}

export const DASHBOARDROUTES: Route[] = [
  {
    path: "/dashboard",
    label: "Inicio",
    icon: Home,
    allowedRoles: ["patient", "physiotherapist"],
  },
  {
    path: "/dashboard/activities",
    label: "Actividades",
    icon: Activity,
    allowedRoles: ["patient", "physiotherapist"],
  },
  {
    path: "/dashboard/patients",
    label: "Mis Pacientes",
    icon: Users,
    allowedRoles: ["physiotherapist"],
  },
  {
    path: "/dashboard/physiotherapists",
    label: "Mis Fisioterapeutas",
    icon: Stethoscope,
    allowedRoles: ["patient"],
  },
];
