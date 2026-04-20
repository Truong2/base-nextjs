"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "~/utils/utils";

const textClassName =
  "font-medium text-[20px] lg:text-[18px] leading:text-[24px] lg:leading-[22px] text-secondary-light";

const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    bg?: string;
    indicatorBg?: string;
    _prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    mobilePrefix?: React.ReactNode;
    mobileSuffix?: React.ReactNode;
  }
>(
  (
    {
      className,
      bg = "#F2F2F2",
      indicatorBg = "linear-gradient(90deg, #258DA2 -4.78%, #8CE6E0 122.61%)",
      value,
      _prefix: prefix,
      suffix,
      mobilePrefix,
      mobileSuffix,
      ...props
    },
    ref
  ) => (
    <div className="flex w-full flex-col-reverse lg:flex-col">
      {(prefix ?? suffix) && (
        <div className="mx-[-12px] mt-[16px] flex justify-between lg:mb-[24px] lg:mt-0">
          {(prefix ?? mobilePrefix) && (
            <>
              <div className={cn("hidden px-[12px] lg:block", textClassName)}>
                {prefix ?? mobilePrefix}
              </div>
              <div className={cn("block px-[12px] lg:hidden", textClassName)}>
                {mobilePrefix ?? prefix}
              </div>
            </>
          )}
          {(suffix ?? mobileSuffix) && (
            <>
              <div
                className={cn(
                  "hidden px-[12px] text-right lg:block",
                  textClassName
                )}
              >
                {suffix ?? mobileSuffix}
              </div>
              <div
                className={cn(
                  "block px-[12px] text-right lg:hidden",
                  textClassName
                )}
              >
                {mobileSuffix ?? suffix}
              </div>
            </>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-[14px] w-full overflow-hidden rounded-[60px] lg:h-[16px]",
          className
        )}
        style={{ background: bg }}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full w-full flex-1 rounded-[60px] transition-all"
          style={{
            transform: `translateX(-${100 - (value ?? 0)}%)`,
            background: indicatorBg,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
);

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
