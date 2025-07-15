import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import {useUserContext} from "@/utils/user/user-context";
import {router} from "expo-router";

const useLogout = () => {
  const {setUserContext} = useUserContext();
  const {onClearTokens} = useAuthTokens();

  const onLogout = async () => {

    await onClearTokens();
    setUserContext({});
    router.push('/')
  }

  return {
    onLogout,
  }
}

export default useLogout;
