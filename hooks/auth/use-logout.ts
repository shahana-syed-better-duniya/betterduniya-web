import useAuthTokens from "@/hooks/auth/use-auth-tokens";
import {useUserContext} from "@/utils/user/user-context";
import {router} from "expo-router";

const useLogout = () => {
  const {setUserContext} = useUserContext();
  const {onClearTokens} = useAuthTokens();

  const onLogout = async () => {
    await onClearTokens();
    setUserContext({
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      bio: '',
      userRole: '',
      profileImageUri: '',
    });
    router.replace('/')
  }

  return {
    onLogout,
  }
}

export default useLogout;
