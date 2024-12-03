'use client';

import clsx from 'clsx';

import { MenuItem } from './MenuItem';
import { routes } from '@/lib';
import { useUIStore } from '@/store';

export function SideMenu() {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const resetSideMenu = useUIStore((state) => state.resetSideMenu);

  return (
    <div>
      {/* Desktop nav */}
      <nav
        className="hidden md:flex md:flex-col gap-2 min-w-full md:w-auto border-r h-full px-2 pt-2 mr-20"
        onClick={resetSideMenu}
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

      {/* Mobile nav */}
      <nav
        className={clsx(
          'flex flex-col md:hidden gap-2 w-full md:w-72 h-full px-2 pt-2 border-l fixed bg-white transition-transform duration-300',
          {
            'translate-x-full': !isSideMenuOpen,
          },
        )}
        onClick={resetSideMenu}
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
