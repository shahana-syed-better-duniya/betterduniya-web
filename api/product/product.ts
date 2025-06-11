import {CrudApiFactory} from "@/api/crud-api-factory";
import requestMethods from "@/api/request-methods";

export const productApi = {
  ProductReview: CrudApiFactory('product', 'review'),
  ProductReviewImage: CrudApiFactory('product', 'image'),
  createReview: {
    method: requestMethods.postForm,
    path: () => `/product/review/upload`,
    okMessage: `Product review is created`,
  },
  searchReview: {
    method: requestMethods.get,
    path: (name: string) => `/product/review/search?name=${name}`,
    okMessage: `Product review is searched`,
  },
}
