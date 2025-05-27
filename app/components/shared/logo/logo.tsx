import { Link } from "@remix-run/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const logoVariants = cva(
  "flex items-center space-x-2 hover:opacity-80 transition-opacity",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const logoIconVariants = cva(
  "bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center",
  {
    variants: {
      size: {
        sm: "w-6 h-6 rounded-md",
        md: "w-8 h-8 rounded-lg",
        lg: "w-10 h-10 rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const logoTextVariants = cva(
  "font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent",
  {
    variants: {
      size: {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const logoIconTextVariants = cva("text-primary-foreground font-bold", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-lg",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface LogoIconProps extends VariantProps<typeof logoIconVariants> {
  className?: string;
}

export function LogoIcon({ size, className }: LogoIconProps) {
  return (
    <div className={cn(logoIconVariants({ size }), className)}>
      <span className={cn(logoIconTextVariants({ size }))}>F</span>
    </div>
  );
}

export interface LogoTextProps extends VariantProps<typeof logoTextVariants> {
  className?: string;
}

export function LogoText({ size, className }: LogoTextProps) {
  return (
    <span className={cn(logoTextVariants({ size }), className)}>Fisiogo</span>
  );
}

export interface LogoProps
  extends Omit<React.ComponentProps<typeof Link>, "to">,
    VariantProps<typeof logoVariants> {
  showText?: boolean;
  className?: string;
  to?: string;
}

export function Logo({
  size,
  showText = true,
  className,
  to = "/",
  ...props
}: LogoProps) {
  return (
    <Link to={to} className={cn(logoVariants({ size, className }))} {...props}>
      <LogoIcon size={size} />
      {showText && <LogoText size={size} />}
    </Link>
  );
}
