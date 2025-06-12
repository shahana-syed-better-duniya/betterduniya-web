import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {Alert} from "react-native";
import {productApi} from "@/api/product/product";
import mime from 'mime';

const useProductReviewCreate = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest();

  const onCreateReview = async (title: string, description: string, rating: number, images: { uri: string }[]) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('rating', `${rating}`);
    for (let idx = 0; idx < images.length; idx++) {
      const image = images[idx];

      if (image.uri.startsWith('data')) { // web
        const response = await fetch(image.uri);
        const blob = await response.blob();
        // Guess the extension/type - customize as needed
        const fileType = blob.type || "image/jpeg";
        const fileName = `photo_${idx}.${fileType.split('/')[1] || "jpg"}`;
        const file = new File([blob], fileName, {type: fileType});
        // formData.append("fileUpload", file);
      } else { // mobile
        Alert.alert('uploading file in mobile');
        const uri = image.uri;
        const type = mime.getType(image.uri) || 'image/jpeg';
        const name = image.fileName || 'photo.jpg';
        formData.append('fileUpload', {
          uri,
          type,
          name,
        });
        Alert.alert(uri);
        Alert.alert(type);
        Alert.alert(name);
      }

    }
    console.log(formData)
    try {
      const response = await onRequest(productApi.createReview, [], formData, false);
      Alert.alert(`e1=${response?.response?.data?.errors}`)
      Alert.alert(`e2=${response?.response?.data?.errors?.FileUpload}`)
    } catch (error) {
      Alert.alert(`e=${error}`)
      console.error("Sign-up failed:", error);
      Alert.alert("An error occurred. Please try again later.");
    }
  };

  return {onCreateReview, isLoading}
}

export default useProductReviewCreate;
