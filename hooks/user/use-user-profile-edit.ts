import useRequest from "@/hooks/api/use-request";
import {userProfileApi} from "@/api/user/userProfile";

const useUserProfileEdit = () => {
  const {onRequest, isLoading} = useRequest();

  const onEditBio = async (bio: string) => {
    const body = {
      bio
    }
    await onRequest(userProfileApi.editBio, [], body, false);
  }
  return {
    onEditBio,
    isLoading
  }
}

export default useUserProfileEdit;
