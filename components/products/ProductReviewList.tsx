import ReviewCard from "@/components/products/ReviewCard";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import React from "react";
import {FlatList} from "react-native";
import {getProductReviewModels} from "@/utils/products/utils";

interface ProductReviewListProps {
  summary: ProductReviewSummary,
  onScroll?: (event: any) => void,
  scrollEventThrottle?: number,
  contentContainerStyle?: any,
}


const ProductReviewList: React.FC<ProductReviewListProps> = ({
                                                               summary,
                                                               onScroll,
                                                               scrollEventThrottle,
                                                               contentContainerStyle,
                                                             }) => {
  const reviews = getProductReviewModels(summary);
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
