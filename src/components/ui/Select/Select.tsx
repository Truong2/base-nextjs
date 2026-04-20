"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Check,
  ChevronDown,
  ChevronDownIcon,
  ChevronUp,
  SortDescIcon,
  Search,
  X,
} from "lucide-react";
import * as React from "react";

import { cn } from "~/utils/utils";
import Button from "~/components/ui/Button";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Value
    ref={ref}
    className={cn(
      "text-neutral-300 data-[placeholder]:text-neutral-300",
      className
    )}
    {...props}
  />
));
SelectValue.displayName = SelectPrimitive.Value.displayName;

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    allowClear?: boolean;
    onClear?: () => void;
    value?: string;
    showSearch?: boolean;
    size?: "small" | "middle" | "large";
    loading?: boolean;
    isEditInline?: boolean;
    disabled?: boolean;
    onBlur?: () => void;
  }
>(
  (
    {
      className,
      children,
      allowClear,
      onClear,
      value,
      showSearch,
      size = "middle",
      loading,
      isEditInline,
      disabled,
      onBlur,
      ...props
    },
    ref
  ) => {
    const handleClearClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClear?.();
    };
    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          "placeholder-13 flex w-full items-center justify-between rounded-md border border-neutral-200 bg-white px-3 text-content-neutral-700",
          "[&>span[data-placeholder]]:text-content-neutral-700 [&>span]:line-clamp-1",
          "focus:border-button-main  focus:outline-none",
          "disabled:cursor-not-allowed disabled:bg-input-neutral-600 disabled:opacity-50",
          {
            "h-8 py-1.5 text-xs": size === "small",
            "h-10 py-2": size === "middle",
            "h-12 py-3 text-base": size === "large",
          },
          className
        )}
        onBlur={onBlur}
        {...props}
      >
        <span className="text-content-neutral-800">{children}</span>
        <div className="flex items-center space-x-1">
          {loading && (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          )}

          {value && allowClear && !loading && !isEditInline && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear selection"
              onClick={handleClearClick}
              onPointerDown={handleClearClick}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClearClick(e as unknown as React.MouseEvent);
                }
              }}
              className="relative z-10 cursor-pointer text-lg leading-none text-gray-400 hover:text-gray-600"
              style={{ pointerEvents: "auto" }}
            >
              ×
            </span>
          )}
          {!loading && (
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon
                className={cn(
                  "h-5 w-5",
                  isEditInline && disabled && "hidden",
                  isEditInline && "mr-14"
                )}
              />
            </SelectPrimitive.Icon>
          )}
        </div>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectTriggerButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <Button variant={"outline"} className={cn("group pl-3", className)} asChild>
    <SelectPrimitive.Trigger ref={ref} {...props}>
      <SortDescIcon className="fill-navy group-hover:fill-white" />
      {children}
    </SelectPrimitive.Trigger>
  </Button>
));
SelectTriggerButton.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4 " />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    showSearch?: boolean;
    onSearch?: (value: string) => void;
    searchValue?: string;
    notFoundContent?: React.ReactNode;
    loading?: boolean;
  }
>(
  (
    {
      className,
      children,
      position = "popper",
      showSearch,
      onSearch,
      searchValue,
      notFoundContent,
      loading,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = React.useState(searchValue || "");
    const searchRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      if (showSearch && searchRef.current) {
        searchRef.current.focus();
      }
    }, [showSearch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      onSearch?.(value);
    };

    return (
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white text-neutral-500 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            position === "popper" &&
              "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
            className
          )}
          position={position}
          {...props}
        >
          <SelectScrollUpButton />
          {showSearch && (
            <div className="border-b border-gray-100 p-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full rounded border border-gray-200 py-1.5 pl-8 pr-8 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      onSearch?.("");
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}
          <SelectPrimitive.Viewport
            className={cn(
              "p-1",
              position === "popper" &&
                "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
            )}
          >
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                <span className="ml-2 text-sm text-gray-500">Loading...</span>
              </div>
            ) : (
              children
            )}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn(
      "-mx-1 my-1 h-px bg-neutral-100 dark:bg-neutral-800",
      className
    )}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectTriggerButton,
  SelectValue,
};
