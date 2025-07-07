import useRequest from "@/hooks/api/use-request";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import {productApi} from "@/api/product/product";
import useObject from "@/hooks/primitive/use-object";

const useFeedList = () => {
  const summary = useObject<ProductReviewSummary>({reviews: [], userById: {}, imageUriById: {}});
  const {onRequest, isLoading} = useRequest<ProductReviewSummary>();

  const onUpdate = async () => {
    const response = await onRequest(productApi.listReviews, [], null, false)
    if (response.result != null) {
      summary.onChangeValue(response.result)
    }
  }

  return {
    summary: summary.value,
    onUpdate,
    isLoading,
  }
}

export default useFeedList;
