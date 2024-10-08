'use client';

import clsx from 'clsx';

import { MenuItem } from './MenuItem';
import { useUIStore } from '@/store';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineArrowRight,
  AiOutlineContacts,
  AiOutlineHome,
  AiOutlineProfile,
  AiOutlineTeam,
  AiOutlineUser,
} from 'react-icons/ai';

const routes = [
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

export function SideMenu() {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);

  return (
    <div>
      {/* Desktop nav */}
      <nav className="hidden md:flex md:flex-col gap-2 min-w-full md:w-auto border-r h-full px-2 pt-2 mr-20">
        {routes.map((route) => (
          <MenuItem
            icon={route.icon}
            key={route.path}
            path={route.path}
            title={route.name}
          />
        ))}
      </nav>

      {/* Mobile nav */}
      <nav
        className={clsx(
          'flex flex-col md:hidden gap-2 w-full md:w-72 h-full px-2 pt-2 border-l fixed bg-white transition-transform duration-300',
          { 'translate-x-full': isSideMenuOpen },
        )}
      >
        {routes.map((route) => (
          <MenuItem
            icon={route.icon}
            key={route.path}
            path={route.path}
            title={route.name}
          />
        ))}
      </nav>
    </div>
  );
}
