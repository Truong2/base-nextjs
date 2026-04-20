"use client";

import React from "react";
import {
  RadioGroup,
  RadioGroupItem,
} from "~/components/ui/RadioGroup/RadioGroup";

interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface FormRadioGroupProps {
  name: string;
  options: RadioOption[];
  disabled?: boolean;
  field?: {
    onChange: (value: string) => void;
    onBlur: () => void;
    value: string;
    name: string;
  };
}

export const FormRadioGroup: React.FC<FormRadioGroupProps> = ({
  field,
  options,
  disabled,
}) => {
  return (
    <RadioGroup
      value={field?.value}
      onValueChange={field?.onChange}
      disabled={disabled}
    >
      {options.map(opt => (
        <label key={opt.value} className="flex items-center gap-2">
          <RadioGroupItem
            value={opt.value}
            disabled={opt.disabled || disabled}
          />
          <span className="text-sm text-gray-700">{opt.label}</span>
        </label>
      ))}
    </RadioGroup>
  );
};
