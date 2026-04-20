"use client";

import React, { memo } from "react";
import { cn } from "~/utils/utils";

interface Option {
  label: string;
  value: string;
}

interface SegmentProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export const Segment: React.FC<SegmentProps> = ({
  options,
  value,
  onValueChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative flex h-10 w-fit items-center justify-center rounded-full bg-white p-1",
        className
      )}
    >
      {options.map(option => (
        <button
          key={option.value}
          className={cn(
            "subtitle-12 z-1 relative h-8 flex-1 whitespace-nowrap rounded-full px-[18.5px] py-1.5 transition-colors duration-300",
            value === option.value
              ? "bg-button-main text-white"
              : "text-gray-600 hover:bg-gray-100"
          )}
          onClick={() => onValueChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default memo(Segment);
