import { cn } from "~/lib/utils";

interface AnimatedBackgroundProps {
  className?: string;
  variant?: "default" | "healthcare" | "landing";
  showDotPattern?: boolean;
  showFloatingElements?: boolean;
  showBlobs?: boolean;
}

export function AnimatedBackground({
  className,
  variant = "default",
  showDotPattern = true,
  showBlobs = true,
}: AnimatedBackgroundProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "healthcare":
        return "bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 dark:from-slate-900 dark:via-green-900/10 dark:to-blue-900/10";
      case "landing":
        return "bg-gradient-to-br from-blue-100 via-blue-50 to-blue-200 dark:from-blue-900/20 dark:via-slate-900/40 dark:to-blue-800/20";
      default:
        return "bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20";
    }
  };

  const getBlobColors = () => {
    switch (variant) {
      case "healthcare":
        return {
          blob1: "bg-green-200 dark:bg-green-600/20",
          blob2: "bg-blue-200 dark:bg-blue-600/20",
          blob3: "bg-teal-200 dark:bg-teal-600/20",
        };
      case "landing":
        return {
          blob1: "bg-blue-300 dark:bg-blue-600/30",
          blob2: "bg-indigo-300 dark:bg-indigo-600/30",
          blob3: "bg-purple-300 dark:bg-purple-600/30",
        };
      default:
        return {
          blob1: "bg-purple-300 dark:bg-purple-600/30",
          blob2: "bg-yellow-300 dark:bg-yellow-600/30",
          blob3: "bg-pink-300 dark:bg-pink-600/30",
        };
    }
  };

  const blobColors = getBlobColors();

  return (
    <div className={cn("absolute inset-0", getVariantClasses(), className)}>
      {/* Animated Gradient Orbs */}
      {showBlobs && (
        <>
          <div
            className={cn(
              "absolute top-0 -left-4 w-72 h-72 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-60 animate-blob",
              blobColors.blob1
            )}
          ></div>
          <div
            className={cn(
              "absolute top-0 -right-4 w-72 h-72 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-60 animate-blob",
              blobColors.blob2
            )}
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className={cn(
              "absolute -bottom-8 left-20 w-72 h-72 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-60 animate-blob",
              blobColors.blob3
            )}
            style={{ animationDelay: "4s" }}
          ></div>
        </>
      )}

      {/* Dot Pattern Overlay */}
      {showDotPattern && (
        <div className="absolute inset-0 opacity-30">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
