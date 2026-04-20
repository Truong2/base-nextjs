"use client";

import * as React from "react";
import { cn } from "~/utils/utils";

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

const OTPInput = React.forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      value,
      onChange,
      length = 4,
      className,
      disabled = false,
      autoFocus = false,
    },
    ref
  ) => {
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState(0);

    React.useEffect(() => {
      inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    React.useEffect(() => {
      if (autoFocus && inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, [autoFocus]);

    const handleChange = (index: number, digit: string) => {
      if (disabled) return;

      // Only allow single numeric digit for manual typing
      if (digit && !/^\d$/.test(digit)) {
        return;
      }

      const newValue = value.split("");
      newValue[index] = digit;
      const newOTP = newValue.join("").slice(0, length);

      onChange(newOTP);

      // Move to next input if digit is entered
      if (digit && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (disabled) return;

      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        if (key === "a") {
          e.preventDefault();
          inputRefs.current.forEach(input => input?.select());
          return;
        }
        if (["c", "v", "x"].includes(key)) {
          return;
        }
      }

      // Allow navigation keys and backspace
      if (
        ["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Enter"].includes(e.key)
      ) {
        if (e.key === "Backspace") {
          if (!value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setFocusedIndex(index - 1);
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          inputRefs.current[index - 1]?.focus();
          setFocusedIndex(index - 1);
        } else if (e.key === "ArrowRight" && index < length - 1) {
          inputRefs.current[index + 1]?.focus();
          setFocusedIndex(index + 1);
        }
        return;
      }

      // Only allow numeric keys (0-9)
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
      }
    };

    const handleFocus = (index: number) => {
      setFocusedIndex(index);
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      if (disabled) return;

      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .replace(/\D/g, ""); // Remove all non-numeric characters

      if (!pastedData) return;

      // Create new OTP value directly from pasted data
      const newOTP = pastedData.slice(0, length).padEnd(length, "");
      onChange(newOTP);

      // Focus the next empty input or the last filled input
      const nextIndex = Math.min(pastedData.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
      setFocusedIndex(nextIndex);
    };

    return (
      <div
        ref={ref}
        className={cn("flex justify-center gap-3", className)}
        onPaste={handlePaste}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={el => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={value[index] || ""}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onFocus={() => handleFocus(index)}
            disabled={disabled}
            className={cn(
              "heading-5 h-[52px] w-[52px] rounded-lg border-2 px-2.5 py-3 text-center transition-all duration-200",
              "border-line-neutral-400 bg-white text-content-neutral-700",
              "focus:ring-navy-200 focus:border-navy-500 focus:outline-none focus:ring-2",
              "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
              focusedIndex === index && "ring-navy-200 border-navy-500 ring-2",
              value[index] && "border-primary bg-primary"
            )}
          />
        ))}
      </div>
    );
  }
);

OTPInput.displayName = "OTPInput";

export { OTPInput };
