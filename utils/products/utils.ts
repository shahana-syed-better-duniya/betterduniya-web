import {ProductReview, ProductReviewState} from "@/interfaces/products/productReview";
import {User} from "@/interfaces/users/user";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";

export const utcStringWithoutSeconds = (utcString: string) => utcString.replace(/:\d{2}\s/, " ");

export const convertReview = (review: ProductReview, user: User, imageUri: string, profileImageUri: string) => ({
  id: review.id,
  user: {
    name: user.firstName + ' ' + user.lastName,
    username: user.username,
    avatar: profileImageUri,
  },
  reviewTime: `${utcStringWithoutSeconds(new Date(review.createdAt).toUTCString())}`,
  rating: review.rating,
  text: review.title,
  description: review.description,
  image: imageUri,
  liked: review.reviewState === ProductReviewState.Recommended,
})

export const getProductReviewModels = (summary: ProductReviewSummary) => summary?.reviews?.map(review => convertReview(review, summary?.userById[review.userId], summary?.reviewImageUriById[review.id], summary?.profileImageUriByUserId[review.userId])) ?? [];
