import { productApi } from "@/api/product/product";
import SearchBar from "@/components/layouts/SearchBar";
import useInit from "@/hooks/api/use-init";
import useInitObject from "@/hooks/api/use-init-object";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import { ProductReview } from "@/interfaces/products/productReview";
import { ProductReviewSummary } from "@/interfaces/products/productReviewSummary";
import { useUserContext } from "@/utils/user/user-context";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ReviewCard from "../../components/products/ReviewCard";

const FILTERS = ["All", "Recommended", "Not Recommended"];

export default function ProductPage() {
  const { userId } = useUserContext();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [searchValue, setSearchValue] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Load all reviews
  const { 
    valueHook: allReviewsHook, 
    onUpdate: updateAllReviews, 
    isLoading: isLoadingAll 
  } = useInitObject<ProductReviewSummary>(productApi.listReviews, []);
  
  const allReviews = allReviewsHook.value;

  // Search functionality  
  const {
    summary: searchResults,
    onSearch,
    isLoading: isSearching,
    searchValue: hookSearchValue
  } = useSearchProductReview();

  // Initialize data on component mount
  useInit(() => {
    updateAllReviews();
  });

  const currentData = searchValue.trim() ? searchResults : allReviews;
  const currentReviews = currentData?.reviews || [];

  // Filter reviews based on selected filter
  const filteredReviews = currentReviews.filter((review: ProductReview) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Recommended") return review.reviewState === 0; // ProductReviewState.Recommended
    if (selectedFilter === "Not Recommended") return review.reviewState === 1; // ProductReviewState.NotRecommended
    return true;
  });

  const handleSearch = useCallback(async () => {
    if (searchValue.trim()) {
      hookSearchValue.onChangeValue(searchValue.trim());
      await onSearch();
    } else {
      await updateAllReviews();
    }
  }, [searchValue, onSearch, updateAllReviews, hookSearchValue]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      if (searchValue.trim()) {
        hookSearchValue.onChangeValue(searchValue.trim());
        await onSearch();
      } else {
        await updateAllReviews();
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [searchValue, onSearch, updateAllReviews, hookSearchValue]);

  const handleCreateReview = () => {
    if (!userId || userId.length === 0) {
      router.push("/auth");
      return;
    }
    router.push("/(tabs)/review");
  };

  const renderReview = ({ item: review }: { item: ProductReview }) => {
    const user = currentData?.userById[review.userId];
    const profileImageUri = currentData?.profileImageUriByUserId[review.userId];
    const reviewImages = review.productImages?.map(img => 
      currentData?.reviewImageUriById[img.id] || ""
    ).filter(Boolean) || [];
    
    // Get first image for the main image display
    const mainImageUri = reviewImages[0] || "";
    
    return (
      <ReviewCard
        key={review.id}
        prodName={review.title}
        desc={review.description}
        imgUrl={mainImageUri}
        username={user?.username || ""}
        displayName={`${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.username || ""}
        userIcon={profileImageUri || ""}
        time={new Date(review.createdAt).toLocaleDateString()}
        recommended={review.reviewState === 0}
        rating={review.rating}
        type="feed"
      />
    );
  };

  const renderFilterPill = (filter: string) => (
    <TouchableOpacity
      key={filter}
      style={[
        styles.filterPill,
        selectedFilter === filter && styles.selectedPill,
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <Text
        style={[
          styles.pillText,
          selectedFilter === filter && styles.selectedPillText,
        ]}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );

  const isLoading = isLoadingAll || isSearching;

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        searchValue={searchValue}
        onChangeText={setSearchValue}
        placeholder="Search product reviews..."
        icon="search"
        onSearch={handleSearch}
      />

      {/* Filter Pills */}
      <View style={styles.filterRow}>
        <FlatList
          data={FILTERS}
          renderItem={({ item }) => renderFilterPill(item)}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Reviews List */}
      {isLoading && !isRefreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFC107" />
          <Text style={styles.loadingText}>Loading reviews...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredReviews}
          renderItem={renderReview}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="chatbubbles-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>
                {searchValue.trim() 
                  ? "No reviews found for your search"
                  : "No product reviews yet"
                }
              </Text>
              <Text style={styles.emptySubtext}>
                Be the first to share your product experience!
              </Text>
            </View>
          }
          contentContainerStyle={filteredReviews.length === 0 ? styles.emptyList : undefined}
        />
      )}

      {/* Floating Action Button to Create Review */}
      <TouchableOpacity style={styles.fab} onPress={handleCreateReview}>
        <Icon name="add" size={28} color="#FFC107" />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
});
