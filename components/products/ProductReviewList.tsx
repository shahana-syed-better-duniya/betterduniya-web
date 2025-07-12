import ReviewCard from "@/components/products/ReviewCard";
import {ProductReview, ProductReviewState} from "@/interfaces/products/productReview";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import {User} from "@/interfaces/users/user";
import {fTimeAgo} from "@/utils/date";
import React from "react";
import {FlatList} from "react-native";

interface ProductReviewListProps {
  summary: ProductReviewSummary,
  onScroll?: (event: any) => void,
  scrollEventThrottle?: number,
  contentContainerStyle?: any,
}

const convertReview = (review: ProductReview, user: User, imageUri: string, profileImageUri: string) => ({
  id: review.id,
  user: {
    name: user.firstName + ' ' + user.lastName,
    username: user.username,
    avatar: profileImageUri,
  },
  reviewTime: `${new Date(review.createdAt).toUTCString()}`,
  rating: review.rating,
  text: review.title,
  description: review.description,
  image: imageUri,
  liked: review.reviewState === ProductReviewState.Recommended,
})


const ProductReviewList: React.FC<ProductReviewListProps> = ({
                                                               summary,
                                                               onScroll,
                                                               scrollEventThrottle,
                                                               contentContainerStyle
                                                             }) => {
  const reviews = summary?.reviews?.map(review => convertReview(review, summary?.userById[review.userId], summary?.reviewImageUriById[review.id], summary?.profileImageUriByUserId[review.userId]))
  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => (
        <ReviewCard
          prodName={item.text}
          desc={item.description}
          imgUrl={item.image}
          username={item.user.username}
          displayName={item.user.name}
          userIcon={item.user.avatar}
          time={item.reviewTime}
          rating={item.rating}
          recommended={item.liked}
          type="feed"
        />
      )}
      onScroll={onScroll}
      scrollEventThrottle={scrollEventThrottle}
      contentContainerStyle={contentContainerStyle}
    />
  )
}

export default ProductReviewList;
