import { NavLink } from '@remix-run/react';
import { LucideProps } from 'lucide-react';

import { useUIStore } from '~/store/ui.store';

type Icon = React.ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
>;

interface Props {
  icon: Icon;
  path: string;
  title: string;
}

export function SidebarItem({ icon: Icon, path, title }: Props) {
  const resetSideMenu = useUIStore((state) => state.resetSideMenu);

  return (
    <NavLink
      end
      className="flex gap-2 items-center cursor-pointer px-4 py-4 transition-colors duration-200 rounded-md [&.active]:bg-secondary [&.active]:text-primary [&.active]:hover:bg-secondary hover:bg-muted text-black/80"
      to={path}
      onClick={resetSideMenu}
    >
      <Icon className="w-6 h-6" />
      <span className="md:sr-only lg:not-sr-only">{title}</span>
    </NavLink>
  );
}
