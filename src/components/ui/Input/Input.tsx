"use client";

import * as React from "react";
import { cn } from "~/utils/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  disabled?: boolean;
  suffix?: React.ReactNode;
  isEditInline?: boolean;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      placeholder,
      disabled,
      suffix,
      maxLength,
      onInput,
      isEditInline,
      value,
      ...props
    },

    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === "password";

    const inputType = isPassword && showPassword ? "text" : type;

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      if (maxLength && e.currentTarget.value.length > maxLength) {
        e.currentTarget.value = e.currentTarget.value.slice(0, maxLength);
      }
      onInput?.(e);
    };

    return (
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          value={value ?? ""}
          className={cn(
            "bg-background placeholder-13 flex h-10 w-full rounded-[8px] border px-3 py-[10px] text-content-neutral-800 " +
              "file:border-0 file:bg-transparent file:font-semibold " +
              "placeholder:text-content-neutral-700 focus-visible:outline-none " +
              "disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-input-neutral-600 disabled:opacity-50",
            "hover:border-button-main focus:border-button-main",
            "text-secondary font-medium",
            isPassword && "pr-10",
            type === "number" &&
              "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&[type=number]]:appearance-none",
            isEditInline && "pr-20",
            className
          )}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          onInput={handleInput}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
          >
            {showPassword ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
        )}
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
