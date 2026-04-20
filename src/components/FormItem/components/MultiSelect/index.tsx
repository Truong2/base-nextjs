"use client";

import React from "react";
import {
  MultiSelect,
  MultiSelectOption,
} from "~/components/ui/Select/MultiSelect";

interface FormMultiSelectProps
  extends React.ComponentProps<typeof MultiSelect> {
  name: string;
  options: MultiSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  maxSelected?: number;
  searchable?: boolean;
  clearable?: boolean;
  field?: {
    onChange: (value: string[]) => void;
    onBlur: () => void;
    value: string[];
    name: string;
  };
}

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  field,
  options,
  placeholder,
  disabled,
  maxSelected,
  searchable,
  clearable,
  ...props
}) => {
  return (
    <MultiSelect
      options={options}
      value={field?.value ?? []}
      onChange={field?.onChange}
      placeholder={placeholder}
      disabled={disabled}
      maxSelected={maxSelected}
      searchable={searchable}
      clearable={clearable}
      {...props}
    />
  );
};
