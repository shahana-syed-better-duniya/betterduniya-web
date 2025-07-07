import React, {useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useProductReviewContext} from "@/utils/products/product-review-context";
import {fTimeAgo} from "@/utils/date";
import ReviewCard from "../../components/products/ReviewCard"
import ComingSoonCard from "@/components/products/ComingSoonCard";
import SearchBar from "@/components/layouts/SearchBar";
import useSearchProductReview from "@/hooks/product/use-search-product-review";

const FILTERS = ["All", "Sony", "iPhone 14", "Laptops", "Resume"];

const Feed = () => {
  const {summary} = useProductReviewContext();

  const feedItems = [
    ...(summary?.reviews?.map(review => ({
      id: review.id,
      user: {
        name: summary?.userById[review.userId].firstName + ' ' + summary?.userById[review.userId].lastName,
        username: summary?.userById[review.userId].username,
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      reviewTime: `${fTimeAgo(review.createdAt)}`,
      rating: review.rating,
      text: review.title,
      description: review.description,
      image: summary?.imageUriById[review.id],
      liked: false,
    })) ?? []),
  ]
  const [selected, setSelected] = useState("All");
  const {
    onSearch,
    searchValue,
  } = useSearchProductReview()

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <SearchBar searchValue={searchValue.value} icon={"search-outline"} onChangeText={searchValue.onChangeValue} placeholder={'Search Product...'}
                   onSearch={onSearch}/>
        <View style={{marginLeft: 12}}>
          <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterRow}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.filterPill,
                selected === item && styles.selectedPill,
              ]}
              onPress={() => setSelected(item)}
            >
              <Text
                style={[
                  styles.pillText,
                  selected === item && styles.selectedPillText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
        </View>

      </View>
      {selected !== 'All' ? <ComingSoonCard/> :
        <FlatList
          data={feedItems}
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
        />}
      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  title: {
    color: "#C1C1C1",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 6,
  },
  filterRow: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "#EDEDED",
    borderRadius: 18,
    marginRight: 9,
    
  },
  selectedPill: {
    backgroundColor: "#FFC107",
  },
  pillText: {
    color: "#888",
    fontWeight: "500",
  },
  selectedPillText: {
    color: "#fff",
    fontWeight: "bold",
  },
  feedItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  fab: {
    position: "absolute",
    bottom: 32,
    right: 22,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
});

export default Feed;
