"use client";

import { localizedNumber } from "~/utils/number";
import { cn } from "~/utils/utils";
import { type Language } from "~/navigation";

interface NumberProps {
  value: number | null | undefined;
  options?: Intl.NumberFormatOptions;
  className?: string;
  locale?: Language;
}

const Number = ({ value, className, options, locale }: NumberProps) => {
  return (
    <span className={cn(className)}>
      {value ? localizedNumber(value, locale ?? "en", options) : "--"}
    </span>
  );
};

export default Number;
