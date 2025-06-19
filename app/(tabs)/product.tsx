import React, {useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ReviewCard from "../../components/products/ReviewCard"
import {fTimeAgo} from "@/utils/date";
import useInitObject from "@/hooks/api/use-init-object";
import {productApi} from "@/api/product/product";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import ComingSoonCard from "@/components/products/ComingSoonCard";

// Sample Data
const FILTERS = ["All", "Sony", "iPhone 14", "Laptops", "Resume"];
const PRODUCTS = [
  {
    id: 1,
    brand: "Sony",
    handle: "@Sony",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.png",
    review:
      "I really loved the sony earbuds xb700. The bass was awesome. The highs and lows hit the ...",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    brand: "HP",
    handle: "@hp",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/45/HP_logo_2012.svg",
    review:
      "The build quality is not good. It is all plastic. The battery backup is very poor, didn’t last ev ...",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProductPage() {
  const {valueHook: {value: summary}} = useInitObject<ProductReviewSummary>(productApi.listReviews, []);
  const [selected, setSelected] = useState("All");

  const feedItems = summary?.reviews?.map(review => ({
    id: review.id,
    brand: summary?.userById[review.userId].firstName + ' ' + summary?.userById[review.userId].lastName,
    handle: summary?.userById[review.userId].username,
    logo: "https://randomuser.me/api/portraits/women/65.jpg",
    reviewTime: `Reviewed ${fTimeAgo(review.createdAt)}`,
    productName: review.title,
    review: review.description,
    image: summary?.imageUriById[review.id],
  })) ?? [];

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 5}}>
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
      {selected !== 'All' ? <ComingSoonCard/> :

        <FlatList
          data={feedItems}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ReviewCard
              prodName={item.productName}
              desc={item.review}
              imgUrl={item.image}
              username={item.brand}
              displayName={item.handle}
              userIcon={item.logo}
              type="prod"
            />
          )}
        />}

      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 12,
  },
  filterRow: {
    paddingVertical: 16,
    paddingHorizontal: 8,
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
  fab: {
    position: "absolute",
    bottom: 32,
    right: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
});
