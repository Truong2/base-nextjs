"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";

import { cn } from "~/utils/utils";

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  error?: boolean;
  indeterminate?: boolean;
  showError?: boolean;
}

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, error, indeterminate = false, ...props }, _ref) => {
  const internalRef = React.useRef<HTMLButtonElement>(null);

  // Handle indeterminate state
  React.useEffect(() => {
    if (internalRef.current) {
      (internalRef.current as any).indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <CheckboxPrimitive.Root
      ref={internalRef}
      className={cn(
        "border-title-neutral-400 peer h-5 w-5 shrink-0 rounded border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button-main focus-visible:ring-offset-2  disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-button-main data-[state=checked]:bg-button-main data-[state=checked]:text-white",
        props.disabled && "border-neutral-300 bg-input-neutral-600",
        indeterminate && !props.checked && "bg-button-main text-neutral-50",
        error && "border-notification-red",
        className
      )}
      {...props}
    >
      {/* Show Minus icon when indeterminate and not checked */}
      {indeterminate && !props.checked && (
        <div className="flex items-center justify-center text-current">
          <Minus className="h-4 w-4" />
        </div>
      )}

      {/* Show Check icon when checked */}
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
