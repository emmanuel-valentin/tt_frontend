import { ClientLoaderFunctionArgs, Outlet, redirect } from "@remix-run/react";
import { Logo } from "~/components/shared/logo/logo";
import { AnimatedBackground } from "~/components/shared/animated-background/animated-background";

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
    <main className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground variant="healthcare" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-lg">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="lg" to="/" />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Transformando la fisioterapia con tecnología
          </p>
        </div>

        {/* Form Content */}
        <Outlet />

        {/* Decorative Bottom Element */}
        <div className="mt-8 pt-6">
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400/60 rounded-full animate-pulse"></div>
            <div
              className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-teal-400/60 rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </main>
  );
}
