"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormItem from "~/components/FormItem";
import { FormInput } from "~/components/FormItem/components";
import Button from "~/components/ui/Button";
import { ROUTE_URL } from "~/constants";
import { FORM, RegisterFormData, registerSchema } from "../constants/schema";
import {
  REGISTER_DEFAULTS,
  FORM_MODES,
  REVALIDATION_MODES,
} from "../constants";
import useOTP from "../hooks/useOTP";
import useRegister from "../hooks/useRegister";
import OTPForm from "./OTP";

type Mode = "register" | "verify";

export default function FormRegister() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("register");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register, isPending } = useRegister();
  const { verifyOTPRegister, isVerifyingRegister, resendOTPRegister } =
    useOTP();

  const registerMethods = useForm<RegisterFormData>({
    defaultValues: REGISTER_DEFAULTS,
    mode: FORM_MODES.ON_CHANGE,
    reValidateMode: REVALIDATION_MODES.ON_CHANGE,
    resolver: zodResolver(registerSchema()),
  });

  const { handleSubmit: handleRegisterSubmit } = registerMethods;

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await register({ data });
      if (response.data) {
        setEmail(data[FORM.EMAIL]);
        setMode("verify");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (data: { otpCode: string }) => {
    try {
      const response = await verifyOTPRegister({
        data: { email, code: data.otpCode },
      });
      if (response.data) {
        router.push(ROUTE_URL.LOGIN);
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleResendOTP = async () => {
    try {
      const response = await resendOTPRegister({
        data: { email },
      });
      if (response.data) {
        console.log("OTP resent successfully");
      }
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  };

  const handleBackToRegister = () => {
    setMode("register");
  };

  if (mode === "verify") {
    return (
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-primary mb-2 text-2xl font-bold">
              Verify Your Email
            </h1>
            <p className="text-sm text-gray-500">
              We've sent a verification code to {email}
            </p>
          </div>
          <OTPForm
            email={email}
            onSubmit={handleOTPSubmit}
            onResend={handleResendOTP}
            isLoading={isVerifyingRegister}
          />
          <div className="mt-6 text-center">
            <button
              onClick={handleBackToRegister}
              className="text-primary hover:text-primary/80 font-medium"
            >
              ← Back to registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-primary mb-2 text-2xl font-bold">
            Create Account
          </h1>
          <p className="text-sm text-gray-500">
            Join Source base and start your wellness journey today.
          </p>
        </div>

        {/* Form */}
        <FormProvider {...registerMethods}>
          <form
            className="space-y-4"
            onSubmit={handleRegisterSubmit(handleRegister)}
          >
            {/* Name Field */}
            <FormItem name={FORM.NAME} label="Full Name" required>
              <FormInput
                name={FORM.NAME}
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className="focus:ring-primary w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2"
              />
            </FormItem>

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
            <FormItem name={FORM.PASSWORD} label="Password" required>
              <FormInput
                name={FORM.PASSWORD}
                type="password"
                autoComplete="new-password"
                placeholder="Create a password"
                className="focus:ring-primary w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-12 focus:border-transparent focus:outline-none focus:ring-2"
              />
            </FormItem>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || isPending}
              className="bg-primary hover:bg-primary/90 w-full rounded-lg px-4 py-3 font-medium text-white transition-colors"
              variant="primary"
              size="normal"
            >
              {isLoading || isPending
                ? "Creating account..."
                : "Create account"}
            </Button>

            {/* Login Link */}
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
