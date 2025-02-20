import { Activity, Home, Stethoscope, Users } from 'lucide-react';

export const DASHBOARDROUTES = [
  {
    path: '/dashboard',
    label: 'Inicio',
    icon: Home,
  },
  {
    path: '/dashboard/activities',
    label: 'Actividades',
    icon: Activity,
  },
  {
    path: '/dashboard/patients',
    label: 'Pacientes',
    icon: Users,
  },
  {
    path: '/dashboard/physiotherapists',
    label: 'Fisioterapeutas',
    icon: Stethoscope,
  },
];
