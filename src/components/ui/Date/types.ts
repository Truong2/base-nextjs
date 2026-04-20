import { Ref } from "react";

// Types for DatePicker component
export interface DatePickerProps {
  value?: Date | Date[] | null;
  onChange?: (value: Date | Date[] | null) => void;
  onClear?: (e: React.MouseEvent) => void;
  onBlur?: () => void;
  format?: string;
  placeholder?: string;
  locale?: "en";
  showTime?: boolean;
  rangeMode?: boolean;
  disabled?: boolean;
  className?: string;
  name?: string;
  weekMode?: boolean;
  disabledDate?: (date: Date) => boolean;
  isEditInline?: boolean;
  inputRef?: Ref<HTMLInputElement>;
}

export interface CalendarProps {
  value?: Date | null;
  onChange: (date: Date) => void;
  locale?: "en";
  showTime?: boolean;
  rangeMode?: boolean;
  rangeValue?: Date[];
  onRangeChange?: (range: Date[]) => void;
  weekMode?: boolean; // New prop for week selection
  disabledDate?: (date: Date) => boolean; // New prop for custom date disabling
}

export interface TimePickerProps {
  value?: Date | null;
  onChange: (date: Date) => void;
  locale?: "en";
}

export interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  day: number;
}

export type ViewMode = "calendar" | "month" | "year";
