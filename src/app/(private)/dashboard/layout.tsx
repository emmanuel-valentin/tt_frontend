import { SideMenu, TopBar } from '@/components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1">
        <SideMenu />
        <main className="px-2 mt-2">{children}</main>
      </div>
    </div>
  );
}
