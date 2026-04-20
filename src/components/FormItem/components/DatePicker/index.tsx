"use client";

import React from "react";
import { DatePicker } from "~/components/ui/Date/DatePicker";

interface FormDatePickerProps extends React.ComponentProps<typeof DatePicker> {
  name: string;
  placeholder?: string;
  disabled?: boolean;
  showTime?: boolean;
  format?: string;
  field?: {
    onChange: (value: Date | null) => void;
    onBlur: () => void;
    value: Date | null;
    name: string;
  };
}

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  field,
  placeholder,
  disabled,
  showTime,
  format,
  ...props
}) => {
  return (
    <DatePicker
      value={field?.value ?? null}
      onChange={val => field?.onChange((val as Date) ?? null)}
      placeholder={placeholder}
      disabled={disabled}
      showTime={showTime}
      format={format}
      {...props}
    />
  );
};
