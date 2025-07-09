import {useProductReviewContext} from "@/utils/products/product-review-context";
import useRequest from "@/hooks/api/use-request";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import {Alert} from "react-native";
import {productApi} from "@/api/product/product";
import {router} from "expo-router";
import useString from "@/hooks/primitive/use-string";
import useObject from "@/hooks/primitive/use-object";

const useSearchProductReview = () => {
  const summary = useObject<ProductReviewSummary>({reviews: [], userById: {}, imageUriById: {}});
  const {setProductReviewContext} = useProductReviewContext();
  const {onRequest, isLoading} = useRequest<ProductReviewSummary>();
  const searchValue = useString('');

  const onSearch = async () => {
    if (searchValue.isEmpty) {
      Alert.alert('Please enter a keyword/service you want to search for.')
      return;
    }
    const response = await onRequest(productApi.searchReview, [searchValue.value], null, false);
    if (response.result != null) {
      setProductReviewContext({summary: response.result, previousSearchValue: searchValue.value});
    }
  }

  return {
    summary: summary.value,
    onSearch,
    isLoading,
    searchValue,
  }
}

export default useSearchProductReview;
