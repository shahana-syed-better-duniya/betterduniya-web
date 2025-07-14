import {ProductReview} from "./productReview";
import {User} from "../users/user";

export interface ProductReviewSummary {
  reviews: ProductReview[];
  userById: { [key: string]: User; };
  profileImageUriByUserId: { [key: string]: string; };
  reviewImageUriById: { [key: string]: string; };
}
