import React from "react";
import {fTimeAgo} from "@/utils/date";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import {ProductReview} from "@/interfaces/products/productReview";
import {User} from "@/interfaces/users/user";
import {FlatList} from "react-native";
import ReviewCard from "@/components/products/ReviewCard";

interface ProductReviewListProps {
  summary: ProductReviewSummary
}

const convertReview = (review: ProductReview, user: User, imageUri: string) => ({
  id: review.id,
  user: {
    name: user.firstName + ' ' + user.lastName,
    username: user.username,
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  reviewTime: `${fTimeAgo(review.createdAt)}`,
  rating: review.rating,
  text: review.title,
  description: review.description,
  image: imageUri,
  liked: false,
})


const ProductReviewList: React.FC<ProductReviewListProps> = ({summary}) => {
  const reviews = summary?.reviews?.map(review => convertReview(review, summary?.userById[review.userId], summary?.imageUriById[review.id]))
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
    />
  )
}

export default ProductReviewList;
