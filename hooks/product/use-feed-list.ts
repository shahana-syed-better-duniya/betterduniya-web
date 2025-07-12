import useRequest from "@/hooks/api/use-request";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import {productApi} from "@/api/product/product";
import useObject from "@/hooks/primitive/use-object";
import {useCallback} from "react";

const useFeedList = () => {
  const summary = useObject<ProductReviewSummary>({
    reviews: [],
    userById: {},
    profileImageUriByUserId: {},
    reviewImageUriById: {}
  });
  const {onRequest, isLoading} = useRequest<ProductReviewSummary>();

  const onUpdate = useCallback(async () => {
    const response = await onRequest(productApi.listReviews, [], null, false)
    if (response.result != null) {
      summary.onChangeValue(response.result)
    }
  }, [onRequest, summary.onChangeValue])

  return {
    summary: summary.value,
    onUpdate,
    isLoading,
  }
}

export default useFeedList;
