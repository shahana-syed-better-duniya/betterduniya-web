import {ProductReview} from "./productReview";
import {User} from "../users/user";

export interface ProductReviewSummary {
  reviews: ProductReview[];
  userById: { [key: string]: User; };
  imageUriById: { [key: string]: string; };
}
