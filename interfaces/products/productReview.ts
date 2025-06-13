import { ProductImage } from "./productImage";
import { BaseEntity } from "../baseEntity";

export enum ProductReviewState {
  Recommended,
  NotRecommended
}

export interface ProductReview extends BaseEntity {
  title: string;
  description: string;
  rating: number;
  reviewState: ProductReviewState;
  userId: string;
  productImages: ProductImage[];
}
