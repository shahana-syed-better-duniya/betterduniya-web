import useInitObject from "@/hooks/api/use-init-object";
import {productApi} from "@/api/product/product";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";

const useListUserProductReviews = () => {
  const {valueHook: summary, onUpdate} = useInitObject<ProductReviewSummary>(productApi.listReviewByUser, []);

  return {
    summary: summary.value,
    onUpdate,
  }
}

export default useListUserProductReviews;
