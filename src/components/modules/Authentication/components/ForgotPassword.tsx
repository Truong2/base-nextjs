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
import { MODE } from "../constants";
import {
  FORM,
  ForgotPasswordFormData,
  ResetPasswordFormData,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../constants/schema";
import {
  FORGOT_PASSWORD_DEFAULTS,
  RESET_PASSWORD_DEFAULTS,
  FORM_MODES,
  REVALIDATION_MODES,
} from "../constants";
import useForgotPassword from "../hooks/useForgotPassword";
import useOTP from "../hooks/useOTP";
import OTPForm from "./OTP";

export default function FormForgotPassword() {
  const router = useRouter();
  const [mode, setMode] = useState<(typeof MODE)[keyof typeof MODE]>(
    MODE.FORGOT_PASSWORD
  );
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const {
    forgotPassword,
    isPending: isForgotPending,
    resetPassword,
  } = useForgotPassword();
  const { verifyOTP, isVerifying, isResending, resendOTPForgotPassword } =
    useOTP();

  const forgotPasswordContext = useForm<ForgotPasswordFormData>({
    defaultValues: FORGOT_PASSWORD_DEFAULTS,
    mode: FORM_MODES.ON_CHANGE,
    reValidateMode: REVALIDATION_MODES.ON_CHANGE,
    resolver: zodResolver(forgotPasswordSchema()),
  });

  const { handleSubmit: handleEmailSubmit } = forgotPasswordContext;

  const resetPasswordContext = useForm<ResetPasswordFormData>({
    defaultValues: RESET_PASSWORD_DEFAULTS,
    mode: FORM_MODES.ON_CHANGE,
    reValidateMode: REVALIDATION_MODES.ON_CHANGE,
    resolver: zodResolver(resetPasswordSchema()),
  });

  const { handleSubmit } = resetPasswordContext;

  const onForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword({
        data: { email: data[FORM.EMAIL] },
      });
      console.log("response_onForgotPassword", response);
      if (response.data) {
        setMode(MODE.OTP);
        setEmail(data[FORM.EMAIL]);
      }
    } catch (error) {
      console.error("Forgot password failed:", error);
    }
  };

  const onOTPSubmit = async (data: any) => {
    try {
      const response = await verifyOTP({
        data: {
          email,
          code: data.otpCode,
        },
      });
      if (response.data.data) {
        setMode(MODE.RESET_PASSWORD);
        setCode(response.data.data.code);
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTPForgotPassword({ data: { email } });
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  };

  const handleBackToEmail = () => {
    setMode(MODE.FORGOT_PASSWORD);
  };

  const onResetPassword = async (data: ResetPasswordFormData) => {
    try {
      const response = await resetPassword({
        data: {
          email,
          code,
          password: data[FORM.PASSWORD],
        },
      });
      if (response.data) {
        router.push(ROUTE_URL.LOGIN);
      }
    } catch (error) {
      console.error("Reset password failed:", error);
    }
  };

  if (mode === MODE.RESET_PASSWORD) {
    return (
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-primary">
              Reset Password
            </h1>
            <p className="text-sm text-gray-500">
              Enter your new password below
            </p>
          </div>

          <FormProvider {...resetPasswordContext}>
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onResetPassword)}
            >
              <div className="space-y-4">
                <FormItem name={FORM.PASSWORD} label="New Password*" required>
                  <FormInput
                    name={FORM.PASSWORD}
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormItem>

                <FormItem
                  name={FORM.CONFIRM_PASSWORD}
                  label="Confirm Password*"
                  required
                >
                  <FormInput
                    name={FORM.CONFIRM_PASSWORD}
                    type="password"
                    placeholder="Confirm new password"
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 pr-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </FormItem>
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition-colors hover:bg-primary/90"
                variant="primary"
                size="normal"
              >
                Reset Password
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    );
  }

  if (mode === MODE.OTP) {
    return (
      <div className="w-full max-w-lg">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-primary">
              Verify Your Email
            </h1>
            <p className="text-sm text-gray-500">
              We've sent a verification code to {email}
            </p>
          </div>

          <OTPForm
            email={email}
            onSubmit={onOTPSubmit}
            onResend={handleResendOTP}
            isLoading={isVerifying || isResending}
          />

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleBackToEmail}
              className="font-medium text-primary hover:text-primary/80"
            >
              ← Back to email
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-primary">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-500">
            Enter your email address and we'll send you a reset link
          </p>
        </div>

        <FormProvider {...forgotPasswordContext}>
          <form
            className="space-y-6"
            onSubmit={handleEmailSubmit(onForgotPassword)}
          >
            <FormItem name={FORM.EMAIL} label="Email*" required>
              <FormInput
                name={FORM.EMAIL}
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </FormItem>

            <Button
              type="submit"
              disabled={isForgotPending}
              className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition-colors hover:bg-primary/90"
              variant="primary"
              size="normal"
            >
              {isForgotPending ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center text-sm text-gray-500">
              Remember your password?{" "}
              <Link
                href={ROUTE_URL.LOGIN}
                className="font-medium text-primary hover:text-primary/80"
              >
                Back to login
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
