import {
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineTeam,
  AiOutlineUser,
} from 'react-icons/ai';

export const routes = [
  {
    path: '/dashboard',
    name: 'Inicio',
    icon: <AiOutlineHome className="w-6 h-6" />,
  },
  {
    path: '/dashboard/activities',
    name: 'Actividades',
    icon: <AiOutlineProfile className="w-6 h-6" />,
  },
  {
    path: '/dashboard/patients',
    name: 'Pacientes',
    icon: <AiOutlineTeam className="w-6 h-6" />,
  },
  {
    path: '/dashboard/physiotherapists',
    name: 'Fisioterapeutas',
    icon: <AiOutlineContacts className="w-6 h-6" />,
  },
  {
    path: '/dashboard/profile',
    name: 'Mi perfil',
    icon: <AiOutlineUser className="w-6 h-6" />,
  },
];
