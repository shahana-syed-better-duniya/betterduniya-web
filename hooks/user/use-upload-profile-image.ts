import useRequest from "@/hooks/api/use-request";
import {userProfileApi} from "@/api/user/userProfile";
import {onAddFileToForm} from "@/utils/blob";

const useUploadProfileImage = () => {
  const {onRequest, isLoading} = useRequest<string>();

  const onUpload = async (images: {
    uri: string
  }[]) => {
    const formData = new FormData();
    await onAddFileToForm(formData, images);
    return await onRequest(userProfileApi.uploadProfileImage, [], formData, true);
  }


  return {
    onUpload,
    isLoading
  }
}

export default useUploadProfileImage;
