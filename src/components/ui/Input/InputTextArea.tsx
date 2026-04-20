import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { cn } from "~/utils/utils";

// Types
export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  showCount?: boolean;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      value,
      defaultValue = "",
      placeholder = "Enter your text",
      maxLength,
      rows = 4,
      autoSize = false,
      disabled = false,
      showCount = false,
      className = "",
      style,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    forwardedRef
  ) => {
    const [internalValue, setInternalValue] = useState(
      (defaultValue as string) ?? ""
    );
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Expose inner ref to parent safely
    useImperativeHandle(
      forwardedRef,
      () => textareaRef?.current as HTMLTextAreaElement
    );

    // Controlled vs uncontrolled
    const isControlled = value !== undefined;
    const textValue = (isControlled ? value : internalValue) as string;

    // Auto resize effect
    useEffect(() => {
      if (autoSize && textareaRef.current) {
        autoResizeTextarea();
      }
    }, [textValue, autoSize]);

    const autoResizeTextarea = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      textarea.style.height = "auto";

      if (typeof autoSize === "object") {
        const { minRows = 2, maxRows } = autoSize;
        const minHeight = minRows * 22;
        const maxHeight = maxRows ? maxRows * 22 : undefined;

        let newHeight = Math.max(textarea.scrollHeight, minHeight);
        if (maxHeight) {
          newHeight = Math.min(newHeight, maxHeight);
        }

        textarea.style.height = `${newHeight}px`;
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(event);
    };

    const currentLength = textValue.length;
    const isOverLimit = maxLength && currentLength > maxLength;

    return (
      <div className="relative w-full">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={textValue}
            placeholder={placeholder}
            rows={autoSize ? undefined : rows}
            maxLength={maxLength}
            disabled={disabled}
            className={cn(
              "bg-background placeholder-13 flex min-h-[40px] w-full rounded-[8px] border px-3 py-[10px] text-content-neutral-800" +
                "file:border-0 file:bg-transparent file:font-semibold " +
                "placeholder:text-content-neutral-700 focus-visible:outline-none " +
                "disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-input-neutral-600 disabled:opacity-50",
              "hover:border-button-main focus:border-button-main",
              "text-secondary font-medium",
              className
            )}
            style={{
              resize: (props as any).resize ?? "vertical",
              ...style,
            }}
            onChange={handleChange}
            {...props}
          />

          {/* Resize Handle */}
          {(props as any).resize !== "none" && !autoSize && (
            <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4">
              <div className="absolute inset-0 opacity-20">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M16 0v16H0L16 0zM14 2L2 14v-2L14 0v2zm0 4L6 14H4L14 4v2z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Character Count */}
        {(showCount || maxLength) && (
          <div className="mt-1 flex justify-end">
            <span
              className={`text-xs ${
                isOverLimit ? "text-red-500" : "text-gray-400"
              }`}
            >
              {maxLength ? `${currentLength}/${maxLength}` : currentLength}
            </span>
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
