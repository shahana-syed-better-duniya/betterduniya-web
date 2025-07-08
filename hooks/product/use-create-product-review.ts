import useRequest from "@/hooks/api/use-request";
import {productApi} from "@/api/product/product";
import {onAddFileToForm} from "@/utils/blob";


const useCreateProductReview = () => {
  const {onRequest, isLoading} = useRequest();

  const onCreateReview = async (title: string, description: string, rating: number, isRecommended: boolean, images: {
    uri: string
  }[]) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('rating', `${rating}`);
    formData.append('productReviewState', isRecommended ? 'recommended' : 'notRecommended');

    await onAddFileToForm(formData, images);
    await onRequest(productApi.createReview, [], formData, false)
  };

  return {onCreateReview, isLoading}
}

export default useCreateProductReview;
