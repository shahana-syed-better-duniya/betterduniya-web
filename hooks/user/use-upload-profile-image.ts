import useRequest from "@/hooks/api/use-request";
import {userProfileApi} from "@/api/user/userProfile";
import {onAddFileToForm} from "@/utils/blob";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUploadProfileImage = () => {
  const {onRequest, isLoading} = useRequest<string>();

  const onUpload = async (images: {
    uri: string
  }[]) => {
    const formData = new FormData();
    await onAddFileToForm(formData, images);

    return await onRequest(userProfileApi.uploadProfileImage, [], formData, false);
  }

  return {
    onUpload,
    isLoading
  }
}

export default useUploadProfileImage;
