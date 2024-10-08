'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

interface Props {
  icon: JSX.Element;
  path: string;
  title: string;
}

export function MenuItem({ icon, path, title }: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={clsx(
        'flex gap-2 items-center hover:bg-gray-100 cursor-pointer px-4 py-4 transition-colors duration-200 rounded-md',
        {
          'bg-blue-100 text-blue-600 hover:bg-blue-100': pathname === path,
        },
      )}
    >
      {icon}
      <span>{title}</span>
    </Link>
  );
}
