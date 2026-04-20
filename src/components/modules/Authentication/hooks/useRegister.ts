import { useMessage } from "~/components/ui/Message";
import { AuthService } from "~/services";
import { ErrorCode } from "~/types/error";

const useRegister = () => {
  const message = useMessage();

  const { mutateAsync: register, data: registerData } = AuthService.usePost<{
    data: { user: any; accessToken: string; refreshToken: string };
  }>(
    { url: "/register" },
    {
      onSuccess: async response => {
        return response?.data;
      },
      onError: error => {
        if (error.meta.errorCode === ErrorCode.E_EMAIL_ALREADY_EXISTS) {
          message.error(error.meta.msg);
        }
      },
    }
  );

  return {
    register: register,
    isPending: false,
    registerData,
  };
};

export default useRegister;
