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
    console.log("🔍 [useFeedList] Starting API call to fetch feed data...");
    const response = await onRequest(productApi.listReviews, [], null, false)
    console.log("🔍 [useFeedList] API response:", {
      ok: response.ok,
      hasResult: response.result != null,
      errorMessage: response.errorMessage,
      error: response.error
    });
    if (response.result != null) {
      summary.onChangeValue(response.result)
      console.log("🔍 [useFeedList] Successfully updated feed summary with", response.result.reviews?.length, "reviews");
    } else {
      console.log("🔍 [useFeedList] API call failed or returned null result");
    }
  }, [onRequest, summary.onChangeValue])

  return {
    summary: summary.value,
    onUpdate,
    isLoading,
  }
}

export default useFeedList;
