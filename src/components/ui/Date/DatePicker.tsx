import React, { forwardRef } from "react";
import { Calendar } from "lucide-react";
import { DatePickerProps } from "./types";
import { useDatePicker } from "./hooks";
import { CalendarComponent, TimePicker } from "./components";
import { locales } from "./constants";
import { cn } from "~/utils/utils";

// Main DatePicker component
const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      value,
      onChange = () => {},
      onBlur,
      format = "DD/MM/YYYY",
      placeholder,
      locale = "en",
      showTime = false,
      rangeMode = false,
      disabled = false,
      className = "",
      name,
      weekMode = false,
      disabledDate,
      isEditInline = false,
      onClear,
      inputRef,
      ...props
    },
    ref
  ) => {
    const t = locales.en;
    const {
      isOpen,
      setIsOpen,
      inputValue,
      showAbove,
      containerRef,
      handleInputChange,
      handleDateChange,
      handleRangeChange,
      handleClear,
    } = useDatePicker({
      value,
      onChange,
      format,
      rangeMode,
      showTime,
      disabled,
      className,
      name,
      weekMode,
      disabledDate,
      onClear,
      ...props,
    });

    const getPlaceholder = (): string => {
      if (placeholder) return placeholder;
      if (rangeMode) return t.rangePlaceholder.join(" - ");
      return t.placeholder;
    };

    return (
      <div ref={containerRef} className="relative">
        <div className="relative">
          <input
            ref={ref}
            name={name}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={onBlur}
            onClick={() => !disabled && setIsOpen(true)}
            placeholder={getPlaceholder()}
            disabled={disabled}
            autoComplete="off"
            className={cn(
              "placeholder-13 h-10 w-full rounded-md border border-gray-200 px-3 py-2 pr-16 placeholder:text-content-neutral-700 ",
              "focus:border-button-main focus:outline-none",
              "disabled:bg-input-neutral-600 disabled:opacity-50 ",
              className
            )}
            {...props}
          />

          <div
            className={cn(
              "absolute inset-y-0 right-0 flex items-center space-x-1 pr-3",
              isEditInline && "pr-[72px]"
            )}
          >
            {inputValue && !disabled && !isEditInline && (
              <button
                onClick={handleClear}
                className="text-lg leading-none text-gray-400 hover:text-gray-600"
                type="button"
              >
                ×
              </button>
            )}

            <Calendar
              className={cn(
                "h-4 w-4 text-gray-400",
                isEditInline && disabled && "hidden"
              )}
            />
          </div>
        </div>

        {isOpen && (
          <div
            className={`absolute z-50 ${showAbove ? "bottom-full mb-1" : "top-full mt-1"}`}
          >
            <CalendarComponent
              value={rangeMode ? null : Array.isArray(value) ? null : value}
              onChange={(date: Date) => {
                handleDateChange(date);
                if (!showTime && !rangeMode) {
                  onBlur?.();
                }
              }}
              locale={locale}
              showTime={showTime}
              rangeMode={rangeMode}
              rangeValue={rangeMode ? (Array.isArray(value) ? value : []) : []}
              onRangeChange={(range: Date[]) => {
                handleRangeChange(range);
                onBlur?.();
              }}
              weekMode={weekMode}
              disabledDate={disabledDate}
            />
            {showTime && !rangeMode && (
              <TimePicker
                value={Array.isArray(value) ? null : value}
                onChange={(date: Date) => {
                  handleDateChange(date);
                  onBlur?.();
                }}
                locale={locale}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
