"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Button from "~/components/ui/Button";
import {
  FormInput,
  FormSelect,
  FormMultiSelect,
  FormDatePicker,
  FormCheckbox,
  FormRadioGroup,
} from "~/components/FormItem/components";
import { adminSchema, AdminFormData } from "../constants/schema";
import FormItem from "~/components/FormItem";

interface AdminFormProps {
  defaultValues?: Partial<AdminFormData>;
  onSubmit: (values: AdminFormData) => Promise<void> | void;
  submitting?: boolean;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  defaultValues,
  onSubmit,
  submitting,
}) => {
  const methods = useForm<AdminFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      permissions: [],
      startDate: null,
      isActive: false,
      contactMethod: "email",
      department: "",
      lastLogin: "",
      ...defaultValues,
    },
    resolver: zodResolver(adminSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { handleSubmit, reset, formState } = methods;

  console.log("defaultValues", defaultValues);

  useEffect(() => {
    if (defaultValues) reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem name="name" label="Name">
          <FormInput name="name" placeholder="Name" />
        </FormItem>
        <FormItem name="email" label="Email">
          <FormInput name="email" placeholder="Email" type="email" />
        </FormItem>
        <FormItem name="role" label="Role">
          <FormSelect
            name="role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
        </FormItem>
        <FormItem name="permissions" label="Permissions (MultiSelect)">
          <FormMultiSelect
            name="permissions"
            options={[
              { label: "Read", value: "read" },
              { label: "Write", value: "write" },
              { label: "Delete", value: "delete" },
            ]}
            placeholder="Select permissions"
          />
        </FormItem>
        <FormItem name="startDate" label="Start Date (DatePicker)">
          <FormDatePicker
            name="startDate"
            placeholder="Select date"
            format="DD/MM/YYYY"
          />
        </FormItem>
        <FormItem name="isActive" label="Active (Checkbox)">
          <FormCheckbox name="isActive" label="Is Active" />
        </FormItem>
        <FormItem name="contactMethod" label="Preferred Contact (Radio)">
          <FormRadioGroup
            name="contactMethod"
            options={[
              { label: "Email", value: "email" },
              { label: "SMS", value: "sms" },
              { label: "Phone", value: "phone" },
            ]}
          />
        </FormItem>
        <FormItem name="department" label="Department">
          <FormInput name="department" placeholder="Department" />
        </FormItem>
        <FormItem name="lastLogin" label="Last Login">
          <FormInput name="lastLogin" placeholder="Last login date" />
        </FormItem>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" type="button" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" disabled={!formState.isValid || submitting}>
            {submitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
