export interface ApiErrorResponse {
  msg: string;
  errorCode: string;
  extraInfo?: Record<string, any>;
  code: number;
}

export enum ErrorCode {
  // Authentication errors
  E_PASSWORD_INCORRECT = "E7",
  E_EMAIL_ALREADY_EXISTS = "E3",
  E_INVALID_OTP = "E6",
  E_EMAIL_NOT_FOUND = "E8",
  E_INVALID_TOKEN = "E9",
}
