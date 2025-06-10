import {useNavigation} from "expo-router";
import useRequest from "@/hooks/api/use-request";
import {RegistrationResult} from "@/interfaces/users/registrationResult";
import {Alert} from "react-native";
import {productApi} from "@/api/product/product";

const useProductReviewCreate = () => {
  const navigation = useNavigation();
  const {onRequest, isLoading} = useRequest<RegistrationResult>();

  const onCreateReview = async (title: string, description: string, rating: number) => {
    const body = {
      title,
      description,
      rating,
    }
    try {
      const response = await onRequest(productApi.ProductReview.createEntity, [], body, false);
    } catch (error) {
      console.error("Sign-up failed:", error);
      Alert.alert("An error occurred. Please try again later.");
    }
  };

  return {onCreateReview, isLoading}
}

export default useProductReviewCreate;
