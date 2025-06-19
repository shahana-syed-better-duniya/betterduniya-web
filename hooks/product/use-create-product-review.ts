import useRequest from "@/hooks/api/use-request";
import {productApi} from "@/api/product/product";
import mime from 'mime';


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
        const uri = image.uri;
        const type = mime.getType(image.uri) || 'image/png';
        const name = image.fileName || 'photo.jpg';
        formData.append('fileUpload', {
          uri,
          type,
          name,
        });
      }
    }
    await onRequest(productApi.createReview, [], formData, false)
  };

  return {onCreateReview, isLoading}
}

export default useCreateProductReview;
