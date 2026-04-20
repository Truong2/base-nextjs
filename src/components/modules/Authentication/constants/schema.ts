import { z } from "zod";
import { FORM } from ".";

// Login form schema
export const loginSchema = () =>
  z.object({
    [FORM.EMAIL]: z
      .string()
      .min(1, {
        message: "Invalid email",
      })
      .email({ message: "Invalid email address" }),

    [FORM.PASSWORD]: z.string().min(1, {
      message: "Invalid password",
    }),
  });

// Register form schema
export const registerSchema = () =>
  z.object({
    [FORM.NAME]: z
      .string()
      .min(1, {
        message: "Invalid name",
      })
      .min(2, {
        message: "Name must be at least 2 characters",
      }),

    [FORM.EMAIL]: z
      .string()
      .min(1, {
        message: "Invalid email",
      })
      .email({ message: "Invalid email address" }),

    [FORM.PASSWORD]: z
      .string()
      .min(1, {
        message: "Invalid password",
      })
      .min(6, {
        message: "Password must be at least 6 characters",
      }),
  });

// Forgot password form schema
export const forgotPasswordSchema = () =>
  z.object({
    [FORM.EMAIL]: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({ message: "Invalid email address" }),
  });

// Reset password form schema
export const resetPasswordSchema = () =>
  z
    .object({
      [FORM.PASSWORD]: z
        .string()
        .min(1, {
          message: "Invalid new password",
        })
        .min(6, {
          message: "Password must be at least 6 characters",
        }),
      [FORM.CONFIRM_PASSWORD]: z.string().min(1, {
        message: "Please confirm your password",
      }),
    })
    .refine(data => data[FORM.PASSWORD] === data[FORM.CONFIRM_PASSWORD], {
      message: "Passwords do not match",
      path: [FORM.CONFIRM_PASSWORD],
    });

// OTP form schema
export const otpSchema = () =>
  z.object({
    [FORM.OTP_CODE]: z
      .string()
      .min(1, {
        message: "OTP code is required",
      })
      .length(6, {
        message: "OTP code must be 6 characters",
      }),
  });

// Profile setup form schema
export const profileSetupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  yearOfBirth: z.string().min(1, "Year of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  height: z.string().min(1, "Height is required"),
  weight: z.string().min(1, "Weight is required"),
});

export type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;
export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
export type ResetPasswordFormData = z.infer<
  ReturnType<typeof resetPasswordSchema>
>;
export type ResetPasswordBody = {
  email: string;
  code: string;
  password: string;
};

export type OTPFormData = z.infer<ReturnType<typeof otpSchema>>;
export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;

// Re-export FORM
export { FORM };
