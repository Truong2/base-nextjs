// Form field constants
export const FORM = {
  NAME: "name",
  EMAIL: "email",
  PASSWORD: "password",
  CONFIRM_PASSWORD: "confirmPassword",
  OTP_CODE: "otpCode",
} as const;

export const MODE = {
  FORGOT_PASSWORD: "forgot_password",
  OTP: "otp",
  RESET_PASSWORD: "reset_password",
} as const;

// Gender options
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

// Login form default values
export const LOGIN_DEFAULTS = {
  [FORM.EMAIL]: "",
  [FORM.PASSWORD]: "",
};

// Register form default values
export const REGISTER_DEFAULTS = {
  [FORM.NAME]: "",
  [FORM.EMAIL]: "",
  [FORM.PASSWORD]: "",
};

// Forgot password form default values
export const FORGOT_PASSWORD_DEFAULTS = {
  [FORM.EMAIL]: "",
};

// Reset password form default values
export const RESET_PASSWORD_DEFAULTS = {
  [FORM.PASSWORD]: "",
  [FORM.CONFIRM_PASSWORD]: "",
};

// OTP form default values
export const OTP_DEFAULTS = {
  [FORM.OTP_CODE]: "",
};

// Profile setup default values
export const PROFILE_SETUP_DEFAULTS = {
  name: "",
  yearOfBirth: "",
  gender: "",
  height: "",
  weight: "",
};

// Form validation modes
export const FORM_MODES = {
  ON_SUBMIT: "onSubmit",
  ON_CHANGE: "onChange",
} as const;

// Form revalidation modes
export const REVALIDATION_MODES = {
  ON_SUBMIT: "onSubmit",
  ON_CHANGE: "onChange",
} as const;
