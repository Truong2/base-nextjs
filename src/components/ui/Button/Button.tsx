import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/utils/utils";

const buttonVariants = cva(
  "inline-flex flex-shrink-0 items-center justify-center truncate rounded-[40px] text-[16px] font-medium shadow-sm ring-offset-white transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: ["border border-button-main bg-button-main text-white"],
        secondary: [
          "btn rounded-[40px] border border-line-neutral-400 text-button-second ",
        ],
        "outline-white": [
          "border border-white bg-transparent text-white",
          "hover:bg-white hover:text-blue-600",
          "focus-visible:ring-white",
          "dark:hover:bg-white/10",
        ],
        outline: [
          "border border-emerald-600 bg-transparent text-emerald-600",
          "hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-700",
          "focus-visible:border-emerald-800 focus-visible:ring-emerald-800",
          "dark:hover:bg-emerald-900/20",
        ],
        ghost: [
          "border border-transparent bg-transparent text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          "focus-visible:border-gray-300 focus-visible:ring-gray-300",
          "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
        ],
        destructive: [
          "border border-red-600 bg-red-600 text-white",
          "hover:border-red-700 hover:bg-red-700",
          "focus-visible:border-red-800 focus-visible:bg-red-800 focus-visible:ring-red-800",
          "active:bg-red-800",
        ],
        success: [
          "border border-green-600 bg-green-600 text-white",
          "hover:border-green-700 hover:bg-green-700",
          "focus-visible:border-green-800 focus-visible:bg-green-800 focus-visible:ring-green-800",
          "active:bg-green-800",
        ],
        warning: [
          "border border-amber-500 bg-amber-500 text-white",
          "hover:border-amber-600 hover:bg-amber-600",
          "focus-visible:border-amber-700 focus-visible:bg-amber-700 focus-visible:ring-amber-700",
          "active:bg-amber-700",
        ],
        text: [
          "border border-transparent bg-transparent text-button-main outline-none",
          "hover:border-transparent hover:bg-transparent hover:text-button-main",
          "focus-visible:border-transparent focus-visible:bg-transparent focus-visible:outline-none",
          "box-shadow-none active:bg-transparent",
        ],
      },
      size: {
        small: "h-8 gap-1.5 px-3 py-1.5 text-xs font-medium leading-4",
        normal: "h-10 gap-2 px-4 py-2 text-sm font-medium leading-5",
        large: "h-11 gap-2.5 px-6 py-2.5 text-base font-medium leading-6",
        icon: "size-7",
      },
      disabled: {
        true: "cursor-not-allowed opacity-40 hover:opacity-40",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "normal",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      disabled,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, disabled }))}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {isLoading ? (
          <svg
            className="mr-2 size-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : null}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
