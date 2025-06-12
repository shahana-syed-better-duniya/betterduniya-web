import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {Alert} from "react-native";
import {productApi} from "@/api/product/product";

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
        formData.append("fileUpload", file);
      } else { // mobile
        formData.append('fileUpload', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.fileName || 'photo.jpg',
        });
      }

    }
    console.log(formData)
    try {
      await onRequest(productApi.createReview, [], formData, false);
    } catch (error) {
      console.error("Sign-up failed:", error);
      Alert.alert("An error occurred. Please try again later.");
    }
  };

  return {onCreateReview, isLoading}
}

export default useProductReviewCreate;
