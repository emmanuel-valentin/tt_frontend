'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

import { useUIStore } from '@/store';
import { UserAvatar } from '../user-avatar/UserAvatar';

export function TopBar() {
  const toggleSideMenu = useUIStore((state) => state.toggleSideMenu);
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);

  return (
    <header className="flex justify-between items-center bg-blue-500 text-white px-2 py-4">
      <h1 className="text-xl ml-4">
        <Link href="/dashboard">APP_NAME</Link>
      </h1>
      <nav>
        {/* User avatar */}
        <Link
          href="/dashboard/profile"
          className="hidden md:block mx-4"
        >
          <UserAvatar size={36} />
        </Link>

        {/* Toggle side menu */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleSideMenu}
        >
          <AiOutlineMenu
            className={clsx('h-8 w-8 lg:h-10 lg:w-10 cursor-pointer', {
              hidden: isSideMenuOpen,
            })}
          />
          <AiOutlineClose
            className={clsx('h-8 w-8 lg:h-10 lg:w-10 cursor-pointer', {
              hidden: !isSideMenuOpen,
            })}
          />
        </button>
      </nav>
    </header>
  );
}
