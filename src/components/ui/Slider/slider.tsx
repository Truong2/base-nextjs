"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "~/utils/utils";

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="bg-secondary-light relative h-[7px] w-full grow overflow-hidden rounded-full ">
      <SliderPrimitive.Range className="bg-primary absolute h-full " />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn([
        "border-secondary bg-primary relative block h-5 w-5 rounded-full  ring-offset-transparent transition-colors disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:ring-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1",
        "after:contents-[''] after:absolute after:left-1/2 after:top-1/2 after:h-[10px] after:w-[10px] after:-translate-x-1/2 after:-translate-y-1/2 after:transform after:rounded-full after:bg-white",
      ])}
    />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
