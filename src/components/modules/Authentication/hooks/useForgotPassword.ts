import { useMessage } from "~/components/ui/Message";
import { AuthService } from "~/services";
import { ErrorCode } from "~/types/error";

const useForgotPassword = () => {
  const message = useMessage();
  const { mutateAsync: forgotPasswordAsync, isPending } = AuthService.usePost(
    { url: "/forgot-password" },
    {
      onSuccess: (response: any) => {
        return response?.data;
      },
      onError: error => {
        if (error.meta.errorCode === ErrorCode.E_EMAIL_NOT_FOUND) {
          message.error(error.meta.msg);
        }
      },
    }
  );

  const {
    mutateAsync: resetPassword,
    isPending: isResetting,
    data: resetPasswordData,
  } = AuthService.usePost(
    { url: "/reset-password" },
    {
      onSuccess: (response: any) => {
        return response?.data;
      },
      onError: error => {
        if (error.meta.errorCode === ErrorCode.E_INVALID_TOKEN) {
          console.log(error.meta.msg);
        }
      },
    }
  );

  return {
    forgotPassword: forgotPasswordAsync,
    isPending,
    resetPassword: resetPassword,
    isResetting,
    resetPasswordData,
  };
};

export default useForgotPassword;
