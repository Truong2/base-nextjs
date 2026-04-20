"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormItem from "~/components/FormItem";
import { FormInput } from "~/components/FormItem/components";
import Button from "~/components/ui/Button";
import { ROUTE_URL } from "~/constants";
import { FORM, LoginFormData, loginSchema } from "../constants/schema";
import { LOGIN_DEFAULTS, FORM_MODES, REVALIDATION_MODES } from "../constants";
import useLogin from "../hooks/useLogin";

export default function FormLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { login, isPending } = useLogin();

  const methods = useForm<LoginFormData>({
    defaultValues: LOGIN_DEFAULTS,
    mode: FORM_MODES.ON_SUBMIT,
    reValidateMode: REVALIDATION_MODES.ON_SUBMIT,
    resolver: zodResolver(loginSchema()),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    setIsLoading(true);

    try {
      await login({ data });
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-primary mb-2 text-2xl font-bold">
            Sign in Source base
          </h1>
          <p className="text-sm text-gray-500">
            Welcome back! Let's continue your health journey.
          </p>
        </div>

        {/* Form */}
        <FormProvider {...methods}>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <FormItem name={FORM.EMAIL} label="Email" required>
              <FormInput
                name={FORM.EMAIL}
                type="email"
                autoComplete="email"
                placeholder="Enter email address"
                className="focus:ring-primary w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2"
              />
            </FormItem>

            {/* Password Field */}
            <FormItem
              name={FORM.PASSWORD}
              label={
                <div className="flex items-center justify-between">
                  <span>
                    Password <span className="text-red-500">*</span>
                  </span>
                  <Link
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                    href={ROUTE_URL.FORGOT_PASSWORD}
                  >
                    Forgot password?
                  </Link>
                </div>
              }
            >
              <FormInput
                name={FORM.PASSWORD}
                type="password"
                autoComplete="current-password"
                placeholder="Enter password"
                className="focus:ring-primary w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-12 focus:border-transparent focus:outline-none focus:ring-2"
              />
            </FormItem>

            {/* Terms */}
            <div className="text-center text-xs text-gray-500">
              By clicking "Sign in", you are agreeing to Source base's{" "}
              <Link
                href="/terms"
                className="text-primary hover:text-primary/80"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-primary hover:text-primary/80"
              >
                Privacy policy.
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isPending}
              className="hover:bg-primary/90 w-full rounded-lg px-4 py-3 transition-colors"
              variant="primary"
            >
              {isLoading || isPending ? "Signing in..." : "Sign in"}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href={ROUTE_URL.REGISTER}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
