import { Outlet } from '@remix-run/react';

export default function AuthLayout() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-lg">
        <Outlet />
      </div>
    </main>
  );
}
