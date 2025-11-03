import { productApi } from "@/api/product/product";
import useObjectAsync from "@/hooks/base/use-object-async";
import { ProductReviewSummary } from "@/interfaces/products/productReviewSummary";

const useListUserProductReviewsConditional = () => {
  const { isLoading, valueHook, onUpdate } = useObjectAsync<ProductReviewSummary>(productApi.listReviewByUser, []);

  return {
    summary: valueHook.value,
    onUpdate,
    isLoading,
  }
}

export default useListUserProductReviewsConditional;