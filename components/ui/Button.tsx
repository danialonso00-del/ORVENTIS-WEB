"use client";

import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:   "bg-[#3B6FD4] text-white hover:bg-[#2A5BC4] hover:scale-[1.02]",
        primary:   "bg-[#3B6FD4] text-white hover:bg-[#2A5BC4] hover:scale-[1.02]",
        secondary: "border border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white/50",
        outline:   "border border-white/20 bg-transparent text-white hover:bg-white/10",
        ghost:     "text-[#5A8DE8] hover:text-white bg-transparent",
        navy:      "bg-[#1A2B5E] text-white hover:bg-[#243572] hover:scale-[1.02]",
        link:      "text-[#3B6FD4] underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "h-11 px-6 py-2.5 rounded text-sm",
        sm:      "h-9  px-4 py-2   rounded text-xs",
        md:      "h-11 px-6 py-3   rounded text-sm",
        lg:      "h-14 px-8 py-4   rounded text-base",
        icon:    "h-10 w-10        rounded",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  external?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, external, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (href) {
      const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
      return (
        <Link href={href} className={classes} {...linkProps}>
          {props.children}
        </Link>
      );
    }

    const Comp = asChild ? Slot : "button";
    return <Comp className={classes} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
