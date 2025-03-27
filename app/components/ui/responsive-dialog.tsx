import * as React from "react";
import { useMediaQuery } from "~/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";

import { cn } from "~/lib/utils";

interface ResponsiveDialogRootProps extends React.ComponentProps<typeof Dialog> {
  breakpoint?: string;
}

const ResponsiveDialog = ({
  children,
  breakpoint = "(min-width: 768px)",
  ...props
}: ResponsiveDialogRootProps) => {
  const isDesktop = useMediaQuery(breakpoint);
  
  if (isDesktop) {
    return <Dialog {...props}>{children}</Dialog>;
  }
  
  return <Drawer {...props}>{children}</Drawer>;
};

ResponsiveDialog.displayName = "ResponsiveDialog";

const ResponsiveDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DialogTrigger>
>(({ ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  if (isDesktop) {
    return <DialogTrigger {...props} ref={ref} />;
  }
  
  return <DrawerTrigger {...props} />;
});

ResponsiveDialogTrigger.displayName = "ResponsiveDialogTrigger";

const ResponsiveDialogClose = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof DialogClose>
>(({ ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  if (isDesktop) {
    return <DialogClose {...props} ref={ref} />;
  }
  
  return <DrawerClose {...props} />;
});

ResponsiveDialogClose.displayName = "ResponsiveDialogClose";

const ResponsiveDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  if (isDesktop) {
    return (
      <DialogContent className={className} {...props} ref={ref}>
        {children}
      </DialogContent>
    );
  }
  
  return (
    <DrawerContent className={className} {...props}>
      {children}
    </DrawerContent>
  );
});

ResponsiveDialogContent.displayName = "ResponsiveDialogContent";

const ResponsiveDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  if (isDesktop) {
    return (
      <DialogHeader
        className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
        {...props}
      />
    );
  }
  
  return (
    <DrawerHeader
      className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
      {...props}
    />
  );
};

ResponsiveDialogHeader.displayName = "ResponsiveDialogHeader";

const ResponsiveDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  if (isDesktop) {
    return (
      <DialogFooter
        className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
        {...props}
      />
    );
  }
  
  return <DrawerFooter className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />;
};

ResponsiveDialogFooter.displayName = "ResponsiveDialogFooter";

const ResponsiveDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  if (isDesktop) {
    return <DialogTitle className={className} {...props} ref={ref} />;
  }
  
  return <DrawerTitle className={className} {...props} />;
});

ResponsiveDialogTitle.displayName = "ResponsiveDialogTitle";

const ResponsiveDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, ...props }, ref) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  if (isDesktop) {
    return <DialogDescription className={className} {...props} ref={ref} />;
  }
  
  return <DrawerDescription className={className} {...props} />;
});

ResponsiveDialogDescription.displayName = "ResponsiveDialogDescription";

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
};
