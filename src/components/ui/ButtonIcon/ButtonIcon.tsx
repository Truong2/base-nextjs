import * as React from "react";
import Button from "../Button";

import { cn } from "~/utils/utils";
import { type ButtonProps } from "../Button/Button";
import { cva } from "class-variance-authority";

const buttonIconVariants = cva("", {
  variants: {
    layout: {
      leftOnly: "pl-3",
      rightOnly: "pr-3",
      both: "px-3",
    },
  },
  defaultVariants: {
    layout: "both",
  },
});

type IconOptions =
  | { type: "iconOnly"; icon: React.ReactNode }
  | {
      type: "iconWithLabel";
      iconLeft?: React.ReactNode;
      iconRight?: React.ReactNode;
    };

const ButtonIcon = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { iconOptions: IconOptions }
>(({ className, children, iconOptions, size, ...props }, ref) => {
  switch (iconOptions.type) {
    case "iconOnly":
      return (
        <Button
          className={cn("p-3", className)}
          ref={ref}
          {...props}
          size={size}
        >
          {iconOptions.icon}
        </Button>
      );
    case "iconWithLabel": {
      const layout =
        iconOptions.iconLeft && iconOptions.iconRight
          ? "both"
          : iconOptions.iconLeft
            ? "leftOnly"
            : iconOptions.iconRight
              ? "rightOnly"
              : "noIcon";
      if (layout === "noIcon") {
        return (
          <Button ref={ref} {...props} size={size}>
            {children}
          </Button>
        );
      }
      return (
        <Button
          className={cn(buttonIconVariants({ layout, className }))}
          size={size}
          ref={ref}
          {...props}
        >
          {iconOptions.iconLeft}
          {children}
          {iconOptions.iconRight}
        </Button>
      );
    }
  }
});
ButtonIcon.displayName = "ButtonIcon";

export { ButtonIcon };
