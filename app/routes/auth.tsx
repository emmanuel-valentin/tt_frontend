import { ClientLoaderFunctionArgs, Outlet, redirect } from "@remix-run/react";

export function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const nextPath = request.url.split("/").pop();
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (nextPath === "logout") {
    return null;
  }

  if (!accessToken || !refreshToken) {
    return null;
  }

  return redirect("/dashboard");
}

export default function AuthLayout() {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-secondary">
      <div className="w-full max-w-lg">
        <Outlet />
      </div>
    </main>
  );
}
