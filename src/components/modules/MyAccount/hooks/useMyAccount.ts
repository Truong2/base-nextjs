// import { useMessage } from "~/components/ui/Message";
import { UserService } from "~/services";
import { MyAccount } from "../constants/dto";
// import { ErrorCode } from "~/types/error";

const useMyAccount = () => {
  //   const message = useMessage();
  const { data: currentAccount, isLoading } = UserService.useGet<MyAccount>({
    url: "/me",
  });

  return {
    currentAccount,
    isLoading,
  };
};

export default useMyAccount;
