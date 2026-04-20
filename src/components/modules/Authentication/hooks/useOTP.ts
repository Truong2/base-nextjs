import { useMessage } from "~/components/ui/Message";
import { AuthService } from "~/services";
import { ErrorCode } from "~/types/error";

const useOTP = () => {
  const message = useMessage();
  const {
    mutateAsync: verifyOTP,
    isPending: isVerifying,
    data: verifyData,
  } = AuthService.usePost(
    { url: "/verify/reset-password" },
    {
      onSuccess: (response: any) => {
        return response?.data;
      },
      onError: error => {
        if (error.meta.errorCode === ErrorCode.E_PASSWORD_INCORRECT) {
          message.error(error.meta.msg);
        }
      },
    }
  );

  const {
    mutateAsync: verifyOTPRegister,
    isPending: isVerifyingRegister,
    data: verifyDataRegister,
  } = AuthService.usePost(
    { url: "/verify" },
    {
      onSuccess: (response: any) => {
        message.success("OTP verified successfully");
        return response?.data;
      },
      onError: error => {
        if (error.meta.errorCode === ErrorCode.E_INVALID_OTP) {
          message.error(error.meta.msg);
        }
      },
    }
  );

  const { mutateAsync: resendOTPRegister } = AuthService.usePost(
    { url: "/register/resend-code" },
    {
      onSuccess: (response: any) => {
        return response?.data;
      },
      onError: error => {
        message.error(error.meta.msg);
      },
    }
  );

  const { mutate: resendOTP, isPending: isResending } = AuthService.usePost(
    { url: "/forgot-password" },
    {
      onSuccess: () => {
        message.success("OTP resent successfully");
      },
      onError: error => {
        message.error(error.meta.msg);
      },
    }
  );

  return {
    verifyOTP: verifyOTP,
    verifyOTPRegister: verifyOTPRegister,
    resendOTPRegister: resendOTPRegister,
    resendOTPForgotPassword: resendOTP,
    isVerifying,
    isVerifyingRegister,
    isResending,
    verifyData,
    verifyDataRegister,
  };
};

export default useOTP;
