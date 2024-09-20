import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';

export function TopBar() {
  return (
    <header className="flex justify-between items-center bg-blue-500 text-white px-2 py-4">
      <h1 className="text-xl lg:text-2xl ml-4">
        <Link href="/dashboard">APP_NAME</Link>
      </h1>
      <nav>
        {/* User avatar */}
        <Link
          href="/dashboard/profile"
          className="hidden md:block"
        >
          <div className="bg-gray-200 h-8 w-8 lg:h-10 lg:w-10 rounded-full cursor-pointer hover:bg-gray-100 transition-colors duration-200" />
        </Link>

        {/* Toggle side menu */}
        <button className="md:hidden">
          <AiOutlineMenu className="h-8 w-8 lg:h-10 lg:w-10 cursor-pointer" />
        </button>
      </nav>
    </header>
  );
}
