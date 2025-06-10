import {CrudApiFactory} from "@/api/crud-api-factory";

export const productApi = {
  ProductReview: CrudApiFactory('product', 'review'),
}
