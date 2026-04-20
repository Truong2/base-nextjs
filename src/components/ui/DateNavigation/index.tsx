"use client";

import { addDays, subDays, isSameDay, addWeeks } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "~/utils/utils";
import Button from "../Button";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Calendar } from "../Calendar";
import IconCalendar from "~/assets/svg/IconCalendar";
import {
  useFormatter,
  useTranslations,
  DateTimeFormatOptions,
} from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { FC, memo, useMemo, useState } from "react";

export type DateNavigationMode = "single" | "range";

interface DateNavigatorProps {
  mode?: DateNavigationMode;
  value: Date | DateRange | undefined;
  onValueChange: (newValue: Date | DateRange | undefined) => void;
  minDate: Date;
  maxDate: Date;
  className?: string;
}

const DateNavigator: FC<DateNavigatorProps> = ({
  mode = "single",
  value,
  onValueChange,
  minDate,
  maxDate,
  className,
}) => {
  const t = useTranslations();
  const { dateTime } = useFormatter();

  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const handlePrevious = () => {
    if (mode === "single" && value instanceof Date) {
      onValueChange(subDays(value, 1));
    }
    if (mode === "range" && (value as DateRange)?.from) {
      const currentFrom = (value as DateRange).from!;
      const newStart = subDays(currentFrom, 7);
      const newEnd = addDays(newStart, 6);
      onValueChange({ from: newStart, to: newEnd });
    }
  };

  const handleNext = () => {
    if (mode === "single" && value instanceof Date) {
      onValueChange(addDays(value, 1));
    }
    if (mode === "range" && (value as DateRange)?.from) {
      const currentFrom = (value as DateRange).from!;
      const newStart = addDays(currentFrom, 7);
      const newEnd = addDays(newStart, 6);
      onValueChange({ from: newStart, to: newEnd });
    }
  };

  const isPreviousDisabled = useMemo(() => {
    if (!value) return true;
    if (mode === "single") {
      return isSameDay(value as Date, minDate);
    }
    if (mode === "range" && (value as DateRange)?.from) {
      const currentFrom = (value as DateRange).from!;
      const prevWeekEnd = subDays(currentFrom, 1);
      return prevWeekEnd < minDate;
    }

    return false;
  }, [value, minDate, mode]);

  const isNextDisabled = useMemo(() => {
    if (!value) return true;
    if (mode === "single") {
      return isSameDay(value as Date, maxDate);
    }
    if (mode === "range" && (value as DateRange)?.to) {
      const nextDay = addWeeks((value as DateRange).to!, 1);
      return nextDay > maxDate;
    }
    return false;
  }, [value, maxDate, mode]);

  const displayValue = () => {
    const createUtcDate = (localDate: Date): Date => {
      return new Date(
        Date.UTC(
          localDate.getFullYear(),
          localDate.getMonth(),
          localDate.getDate()
        )
      );
    };

    const options: DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    };

    if (
      mode === "range" &&
      (value as DateRange)?.from &&
      (value as DateRange)?.to
    ) {
      const range = value as DateRange;
      if (range.from && range.to) {
        return `${dateTime(createUtcDate(range.from), options)} ~ ${dateTime(createUtcDate(range.to), options)}`;
      }
    }

    if (mode === "single" && value instanceof Date) {
      return dateTime(createUtcDate(value), options);
    }

    return t("common.select_date");
  };

  return (
    <div
      className={cn(
        "px- flex h-10 w-fit items-center justify-between gap-1 rounded-full bg-white px-1 py-[6px]",
        className
      )}
    >
      <Button
        variant="secondary"
        size="icon"
        className="size-7 rounded-full"
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
      >
        <ChevronLeft className="h-5 w-5 text-title-neutral-900" />
      </Button>

      <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 justify-center gap-x-1 px-2 text-center text-sm font-semibold text-gray-700 shadow-none"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={displayValue()}
                className="text-content-neutral-800"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
              >
                {displayValue()}
              </motion.span>
            </AnimatePresence>
            <IconCalendar />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            mode="single"
            selected={
              mode === "single" ? (value as Date) : (value as DateRange)?.to
            }
            defaultMonth={
              mode === "single" ? (value as Date) : (value as DateRange)?.to
            }
            onSelect={day => {
              if (day) {
                if (mode === "single") {
                  onValueChange(day);
                } else {
                  onValueChange({ from: subDays(day, 6), to: day });
                }
              }
              setCalendarOpen(false);
            }}
            disabled={{
              before: minDate,
              after: maxDate,
            }}
          />
        </PopoverContent>
      </Popover>

      <Button
        variant="secondary"
        size="icon"
        className="size-7 rounded-full"
        onClick={handleNext}
        disabled={isNextDisabled}
      >
        <ChevronRight className="h-5 w-5 text-title-neutral-900" />
      </Button>
    </div>
  );
};

export default memo(DateNavigator);
