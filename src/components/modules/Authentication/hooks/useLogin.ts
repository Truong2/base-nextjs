import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMessage } from "~/components/ui/Message";
import { AuthService } from "~/services";
import { useGetAuthenticationActions } from "~/store/authentication/selector";

const useLogin = () => {
  const router = useRouter();
  const message = useMessage();
  const [isMockPending, setIsMockPending] = useState(false);
  const { setUser, setAuthenticationToken, setRefreshToken } =
    useGetAuthenticationActions();
  const useMockLogin =
    process.env.NEXT_PUBLIC_USE_MOCK_LOGIN === "true" ||
    process.env.NEXT_PUBLIC_ENV === "development";

  const {
    mutate: loginMutation,
    isPending: isLoginMutationPending,
    data: loginData,
  } = AuthService.usePost<{
    data: { user: any; accessToken: string; refreshToken: string };
  }>(
    { url: "/login" },
    {
      onSuccess: async response => {
        const { user, accessToken, refreshToken } = response.data;
        setUser(user);
        setAuthenticationToken(accessToken);
        setRefreshToken(refreshToken);
        message.success("Login successful");
        router.push("/dashboard");
      },
      onError: error => {
        message.error(error.meta.msg);
      },
    }
  );

  const login = async ({ data }: { data: { email: string; password: string } }) => {
    if (useMockLogin) {
      try {
        setIsMockPending(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        const mockUser = {
          id: "mock-user-1",
          name: "Mock User",
          email: data.email,
          role: "admin",
        };
        const accessToken = "mock-access-token";
        const refreshToken = "mock-refresh-token";

        setUser(mockUser);
        setAuthenticationToken(accessToken);
        setRefreshToken(refreshToken);
        message.success("Login successful (mock)");
        router.push("/dashboard");
      } catch (error) {
        message.error("Mock login failed");
        throw error;
      } finally {
        setIsMockPending(false);
      }
      return;
    }

    await loginMutation({ data });
  };

  return {
    login,
    isPending: isLoginMutationPending || isMockPending,
    loginData,
  };
};

export default useLogin;
