"use client";

import React from "react";
import Input from "~/components/ui/Input";
import { InputProps } from "~/components/ui/Input/Input";

interface FormInputProps extends InputProps {
  name: string;
  field?: {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    value: string;
    name: string;
  };
}

export const FormInput: React.FC<FormInputProps> = ({ field, ...props }) => {
  return <Input {...props} {...field} />;
};
