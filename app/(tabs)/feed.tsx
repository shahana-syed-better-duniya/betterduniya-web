import SearchBar from "@/components/layouts/SearchBar";
import ComingSoonCard from "@/components/products/ComingSoonCard";
import ProductReviewList from "@/components/products/ProductReviewList";
import useInit from "@/hooks/api/use-init";
import useFeedList from "@/hooks/product/use-feed-list";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import { useProductReviewContext } from "@/utils/products/product-review-context";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Animated, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from '../../components/products/product-review-list-styles';

const FILTERS = ["All",];

const HEADER_MAX_HEIGHT = 125; // Max height of your header
const HEADER_MIN_HEIGHT = 60;  // Min height when collapsed
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const {width, height} = Dimensions.get("window");


const Feed = () => {
  const {summary: feedSummary, onUpdate} = useFeedList();
  useInit(onUpdate);

  // Add search logic
  const {
    onSearch,
    isLoading,
    searchValue,
  } = useSearchProductReview();
  const [isSearched, setIsSearched] = useState(false);
  const [selected, setSelected] = useState("All");

  // Use context for search results, like Home
  const { summary, previousSearchValue } = useProductReviewContext();

  // For scroll direction-based header hide/reveal
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHeaderHidden = useRef(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;
    // Only trigger if scroll is significant
    if (Math.abs(diff) > 5) {
      if (diff > 0 && !isHeaderHidden.current && currentY > 0) {
        // Scrolling down, hide header
        Animated.timing(headerTranslateY, {
          toValue: -HEADER_MAX_HEIGHT,
          duration: 250,
          useNativeDriver: true,
        }).start();
        isHeaderHidden.current = true;
      } else if (diff < 0 && isHeaderHidden.current) {
        // Scrolling up, show header
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
        isHeaderHidden.current = false;
      }
    }
    lastScrollY.current = currentY;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1,
          marginBottom: height * 0.02,
          backgroundColor: 'white',
          width: '100%',
          paddingBottom: 5,
          paddingTop: height * 0.02,
          transform: [{ translateY: headerTranslateY }],
        }}
      >
        <SearchBar
          searchValue={searchValue.value}
          icon={"search-outline"}
          onChangeText={searchValue.onChangeValue}
          placeholder={'Search Product...'}
          onSearch={async () => {
            setIsSearched(true);
            await onSearch();
          }}
        />
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filterRow}
          renderItem={({ item }) => (
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
      </Animated.View>
      {/* Render ProductReviewList directly, but pass onScroll and scrollEventThrottle for header animation */}
      {selected !== 'All' ? (
        <ComingSoonCard />
      ) : isLoading ? (
        <View style={{padding: 32, alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FFC107" />
        </View>
      ) : (
        <ProductReviewList
          summary={isSearched ? (summary ?? { reviews: [], userById: {}, imageUriById: {} }) : (feedSummary ?? { reviews: [], userById: {}, imageUriById: {} })}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
        />
      )}
      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107" />
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
