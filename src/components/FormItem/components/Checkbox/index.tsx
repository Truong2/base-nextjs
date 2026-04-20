"use client";

import React from "react";
import { Checkbox } from "~/components/ui/Checkbox/Checkbox";

interface FormCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  name: string;
  label?: string;
  disabled?: boolean;
  field?: {
    onChange: (checked: boolean) => void;
    onBlur: () => void;
    value: boolean;
    name: string;
  };
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({
  field,
  label,
  disabled,
  ...props
}) => {
  return (
    <label className="inline-flex items-center gap-2">
      <Checkbox
        checked={!!field?.value}
        onCheckedChange={val => field?.onChange(Boolean(val))}
        disabled={disabled}
        {...props}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};
