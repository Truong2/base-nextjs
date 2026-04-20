"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormItem from "~/components/FormItem";
import { FormInput, FormSelect } from "~/components/FormItem/components";
import Button from "~/components/ui/Button";
import { ROUTE_URL } from "~/constants";
import {
  FORM_MODES,
  GENDER_OPTIONS,
  PROFILE_SETUP_DEFAULTS,
  REVALIDATION_MODES,
} from "../constants";
import { ProfileSetupFormData, profileSetupSchema } from "../constants/schema";

export default function ProfileSetup() {
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<ProfileSetupFormData>({
    defaultValues: PROFILE_SETUP_DEFAULTS,
    mode: FORM_MODES.ON_CHANGE,
    reValidateMode: REVALIDATION_MODES.ON_CHANGE,
    resolver: zodResolver(profileSetupSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: ProfileSetupFormData) => {
    setIsLoading(true);
    try {
      console.log("Profile data:", data);
      // TODO: Implement profile setup API call
      // await setupProfile({ data });
    } catch (error) {
      console.error("Profile setup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate years from 1950 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => currentYear - i
  );

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-primary mb-2 text-2xl font-bold">
            Welcome to Source base
          </h1>
          <p className="text-sm text-gray-500">
            Your journey to better health starts here!
          </p>
        </div>

        {/* Introduction */}
        <div className="mb-8 text-center">
          <p className="text-gray-700">
            Before we start, tell us about your profile! This helps us analyze
            your health data more accurately.
          </p>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field - Full Width */}
            <FormItem name="name" label="Name" required>
              <FormInput
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter name"
              />
            </FormItem>

            {/* Two Column Layout for Other Fields */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Year of Birth Field */}
              <FormItem name="yearOfBirth" label="Year of birth" required>
                <FormSelect
                  name="yearOfBirth"
                  placeholder="Select year"
                  options={years.map(year => ({
                    value: year.toString(),
                    label: year.toString(),
                  }))}
                />
              </FormItem>

              {/* Gender Field */}
              <FormItem name="gender" label="Gender" required>
                <FormSelect
                  name="gender"
                  placeholder="Select gender"
                  options={GENDER_OPTIONS}
                />
              </FormItem>

              {/* Height Field */}
              <FormItem name="height" label="Height" required>
                <div className="relative">
                  <FormInput
                    name="height"
                    type="number"
                    placeholder="Enter height"
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    cm
                  </span>
                </div>
              </FormItem>

              {/* Weight Field */}
              <FormItem name="weight" label="Weight" required>
                <div className="relative">
                  <FormInput
                    name="weight"
                    type="number"
                    placeholder="Enter weight"
                    className="pr-12"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    kg
                  </span>
                </div>
              </FormItem>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 w-full rounded-lg px-4 py-3 font-medium text-white transition-colors"
              variant="primary"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>

            {/* Back to Login Link */}
            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href={ROUTE_URL.LOGIN}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Sign in
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
