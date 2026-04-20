"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormItem from "~/components/FormItem";
import Button from "~/components/ui/Button";
import { OTPInput } from "~/components/ui/OTPInput";
import { FORM, OTPFormData, otpSchema } from "../constants/schema";
import { OTP_DEFAULTS, FORM_MODES, REVALIDATION_MODES } from "../constants";

const OTP_COUNTDOWN_TIME = 60;
const OTP_LENGTH = 6;

interface OTPFormProps {
  email: string;
  onSubmit: (data: OTPFormData) => Promise<void>;
  onResend: () => Promise<void>;
  isLoading?: boolean;
}

export default function OTPForm({
  email: _email,
  onSubmit,
  onResend,
  isLoading = false,
}: OTPFormProps) {
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const [countdownTime, setCountdownTime] = useState(OTP_COUNTDOWN_TIME);
  const [otpValue, setOtpValue] = useState("");

  const isResendDisabled = countdownTime > 0;

  const methods = useForm<OTPFormData>({
    defaultValues: OTP_DEFAULTS,
    mode: FORM_MODES.ON_CHANGE,
    reValidateMode: REVALIDATION_MODES.ON_CHANGE,
    resolver: zodResolver(otpSchema()),
  });

  const { handleSubmit, setValue } = methods;

  const startCountdown = () => {
    if (interval.current) {
      return;
    }
    interval.current = setInterval(() => {
      setCountdownTime(prev => {
        const seconds = prev - 1;

        if (interval.current && seconds === 0) {
          clearInterval(interval.current);
          interval.current = null;
          return 0;
        }

        return seconds;
      });
    }, 1000);
  };

  const handleResendOTP = async () => {
    if (interval.current) return;
    try {
      setCountdownTime(OTP_COUNTDOWN_TIME);
      await onResend();
      startCountdown();
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  };

  const handleOTPChange = (otp: string) => {
    setOtpValue(otp);
    setValue(FORM.OTP_CODE, otp);
  };

  const handleFormSubmit = async (data: OTPFormData) => {
    if (data[FORM.OTP_CODE].length === OTP_LENGTH) {
      await onSubmit(data);
    }
  };

  useEffect(() => {
    startCountdown();

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="space-y-4">
          <FormItem name={FORM.OTP_CODE} label="Verification Code*" required>
            <OTPInput
              value={otpValue}
              onChange={handleOTPChange}
              length={OTP_LENGTH}
              disabled={isLoading}
              autoFocus
            />
          </FormItem>

          <div className="space-y-4 text-center">
            <div className="text-sm text-gray-600">
              <p className="mb-2 font-medium">Instructions:</p>
              <ul className="space-y-1 text-left text-xs">
                <li>• Enter the 6-digit code sent to your email</li>
                <li>• The code will expire in 10 minutes</li>
                <li>• Check your spam folder if you don't see it</li>
                <li>• You can request a new code after 60 seconds</li>
              </ul>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isResendDisabled || isLoading}
                className={`
                  text-sm font-medium transition-colors
                  ${
                    isResendDisabled || isLoading
                      ? "cursor-not-allowed text-gray-400"
                      : "cursor-pointer text-primary hover:text-primary/80"
                  }
                `}
              >
                Resend Code
                {countdownTime > 0 && (
                  <span className="ml-1">({countdownTime}s)</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading || otpValue.length !== OTP_LENGTH}
          className="w-full rounded-lg bg-primary px-4 py-3 font-medium text-white transition-colors hover:bg-primary/90"
          variant="primary"
          size="normal"
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </FormProvider>
  );
}
