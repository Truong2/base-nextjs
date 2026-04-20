"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/Select";

interface FormSelectProps {
  name: string;
  placeholder?: string;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
  field?: {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
    name: string;
  };
}

export const FormSelect = ({
  name: _name,
  placeholder,
  options,
  disabled,
  field,
  ...props
}: FormSelectProps) => {
  return (
    <Select
      value={field?.value}
      onValueChange={field?.onChange}
      disabled={disabled}
      {...props}
    >
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
