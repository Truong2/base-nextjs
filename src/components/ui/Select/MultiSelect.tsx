"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "~/utils/utils";

// Types
export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  maxSelected?: number;
  searchable?: boolean;
  clearable?: boolean;
}

const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options = [],
      value = [],
      onChange = () => {},
      placeholder = "Select options...",
      disabled = false,
      className,
      name,
      maxSelected,
      searchable = true,
      clearable = true,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const containerRef = React.useRef<HTMLDivElement>(null);
    const searchInputRef = React.useRef<HTMLInputElement>(null);

    // Filter options based on search term
    const filteredOptions = React.useMemo(() => {
      if (!searchTerm) return options;
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [options, searchTerm]);

    // Get selected options
    const selectedOptions = React.useMemo(() => {
      return options.filter(option => value.includes(option.value));
    }, [options, value]);

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when dropdown opens
    React.useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, [isOpen, searchable]);

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchTerm("");
      }
    };

    const handleSelect = (optionValue: string) => {
      const isSelected = value.includes(optionValue);
      let newValue: string[];

      if (isSelected) {
        // Remove from selection
        newValue = value.filter(v => v !== optionValue);
      } else {
        // Add to selection (check max limit)
        if (maxSelected && value.length >= maxSelected) {
          return;
        }
        newValue = [...value, optionValue];
      }

      onChange(newValue);
      setSearchTerm("");

      // Keep dropdown open for multi-select
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    };

    const handleRemove = (optionValue: string, event: React.MouseEvent) => {
      event.stopPropagation();
      const newValue = value.filter(v => v !== optionValue);
      onChange(newValue);
    };

    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      onChange([]);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setSearchTerm("");
      } else if (event.key === "Enter") {
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (filteredOptions.length === 1 && filteredOptions[0]) {
          handleSelect(filteredOptions[0].value);
        }
      } else if (
        event.key === "Backspace" &&
        searchTerm === "" &&
        value.length > 0
      ) {
        // Remove last selected item when backspace is pressed and search is empty
        const lastValue = value[value.length - 1];
        if (lastValue) {
          handleRemove(lastValue, event as any);
        }
      }
    };

    const renderSelectedItems = () => {
      if (selectedOptions.length === 0) {
        return <span className="text-neutral-500">{placeholder}</span>;
      }

      // Show count if too many selected
      if (selectedOptions.length > 3) {
        return (
          <div className="flex items-center gap-1">
            <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">
              {selectedOptions.length} selected
            </span>
          </div>
        );
      }

      return (
        <div className="flex flex-wrap items-center gap-1">
          {selectedOptions.map(option => (
            <span
              key={option.value}
              className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
            >
              {option.label}
              {!disabled && (
                <button
                  type="button"
                  onClick={e => handleRemove(option.value, e)}
                  className="rounded-full p-0.5 hover:bg-blue-200"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      );
    };

    return (
      <div ref={containerRef} className={cn("relative", className)} {...props}>
        {/* Hidden input for form submission */}
        {name && (
          <input type="hidden" name={name} value={JSON.stringify(value)} />
        )}

        {/* Trigger */}
        <div
          ref={ref}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex min-h-10 w-full cursor-pointer items-center justify-between rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2",
            disabled && "cursor-not-allowed opacity-50",
            isOpen && "ring-2 ring-neutral-950 ring-offset-2",
            "gap-2"
          )}
          tabIndex={disabled ? -1 : 0}
        >
          <div className="min-w-0 flex-1">{renderSelectedItems()}</div>

          <div className="flex flex-shrink-0 items-center gap-1">
            {clearable && value.length > 0 && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-full p-1 hover:bg-neutral-100"
              >
                <X className="h-4 w-4 text-neutral-500" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "h-4 w-4 text-neutral-500 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-hidden rounded-md border border-neutral-200 bg-white shadow-md">
            {/* Search input */}
            {searchable && (
              <div className="border-b border-neutral-200 p-2">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search options..."
                  className="w-full rounded border border-neutral-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-950"
                />
              </div>
            )}

            {/* Options list */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-neutral-500">
                  {searchTerm ? "No options found" : "No options available"}
                </div>
              ) : (
                <>
                  {/* Select All option */}
                  {filteredOptions.length > 1 && (
                    <div
                      onClick={() => {
                        if (value.length === filteredOptions.length) {
                          // Deselect all
                          onChange([]);
                        } else {
                          // Select all
                          const allValues = filteredOptions
                            .filter(opt => !opt.disabled)
                            .map(opt => opt.value);
                          onChange(allValues);
                        }
                      }}
                      className="relative flex w-full cursor-pointer select-none items-center rounded-sm border-b border-neutral-100 py-2 pl-8 pr-2 text-sm outline-none hover:bg-neutral-100"
                    >
                      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                        {value.length ===
                          filteredOptions.filter(opt => !opt.disabled)
                            .length && <Check className="h-4 w-4" />}
                      </span>
                      <span className="font-medium">
                        {value.length ===
                        filteredOptions.filter(opt => !opt.disabled).length
                          ? "Deselect All"
                          : "Select All"}
                      </span>
                    </div>
                  )}

                  {/* Individual options */}
                  {filteredOptions.map(option => {
                    const isSelected = value.includes(option.value);
                    const isDisabled =
                      option.disabled ||
                      (maxSelected &&
                        !isSelected &&
                        value.length >= maxSelected);

                    return (
                      <div
                        key={option.value}
                        onClick={() =>
                          !isDisabled && handleSelect(option.value)
                        }
                        className={cn(
                          "relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none hover:bg-neutral-100",
                          isDisabled && "cursor-not-allowed opacity-50",
                          isSelected && "bg-blue-50 text-blue-900"
                        )}
                      >
                        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                          {isSelected && <Check className="h-4 w-4" />}
                        </span>
                        <span>{option.label}</span>
                        {maxSelected &&
                          !isSelected &&
                          value.length >= maxSelected && (
                            <span className="ml-auto text-xs text-neutral-400">
                              Max {maxSelected}
                            </span>
                          )}
                      </div>
                    );
                  })}
                </>
              )}
            </div>

            {/* Footer info */}
            {value.length > 0 && (
              <div className="border-t border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-500">
                {value.length} of {options.length} selected
                {maxSelected && ` (max ${maxSelected})`}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

MultiSelect.displayName = "MultiSelect";

export { MultiSelect };
