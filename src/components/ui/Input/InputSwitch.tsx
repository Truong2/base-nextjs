// components/ui/InputSwitch.tsx
"use client";
import React, { useEffect, useState } from "react";
import { cn } from "~/utils/utils";

export interface SwitchProps {
  className?: string;
  checked?: boolean; // controlled
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
}

export const InputSwitch = ({
  className,
  checked,
  onCheckedChange,
  disabled,
  label,
}: SwitchProps) => {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(!!checked);

  useEffect(() => {
    if (isControlled) setInternal(!!checked);
  }, [isControlled, checked]);

  const value = isControlled ? !!checked : internal;

  const toggle = () => {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  };

  return (
    <label
      className={cn(
        "flex cursor-pointer select-none items-center gap-2",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      onMouseDown={e => e.preventDefault()}
    >
      <div
        onClick={toggle}
        role="switch"
        aria-checked={value}
        className={cn(
          "relative inline-flex h-[22px] w-10 items-center rounded-full  border-[2px] border-input-neutral-600 transition-colors",
          value ? "bg-button-main" : "bg-input-neutral-600"
        )}
      >
        <span
          className={cn(
            "inline-block h-[17.42px] w-[17.42px] transform rounded-full bg-button-white transition-transform",
            value
              ? "translate-x-[18px] bg-button-white"
              : "translate-x-[1px] bg-[#404040]"
          )}
        />
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};
