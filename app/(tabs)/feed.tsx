import SearchBar from "@/components/layouts/SearchBar";
import ComingSoonCard from "@/components/products/ComingSoonCard";
import ProductReviewList from "@/components/products/ProductReviewList";
import useInit from "@/hooks/api/use-init";
import useFeedList from "@/hooks/product/use-feed-list";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import { useProductReviewContext } from "@/utils/products/product-review-context";
import { useUserContext } from "@/utils/user/user-context";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from '../../components/products/product-review-list-styles';

const FILTERS = ["All",];
const HEADER_MAX_HEIGHT = 125;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const {width, height} = Dimensions.get("window");


const Feed = () => {
  const { userId, isLoaded } = useUserContext();
  const {summary: feedSummary, onUpdate} = useFeedList();
  
  // Only initialize if user is logged in
  const isAuthenticated = userId && userId.length > 0;
  
  useInit(() => {
    if (isAuthenticated) {
      onUpdate();
    }
  });

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        onUpdate();
      }
    }, [onUpdate, isAuthenticated])
  );

  // Add search logic
  const {
    onSearch,
    isLoading,
    searchValue,
  } = useSearchProductReview();
  const [isSearched, setIsSearched] = useState(false);
  const [selected, setSelected] = useState("All");

  // Use context for search results, like Home
  const {summary, previousSearchValue} = useProductReviewContext();

  // For scroll direction-based header hide/reveal
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isHeaderHidden = useRef(false);
  const [headerHeight, setHeaderHeight] = useState(HEADER_MAX_HEIGHT);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = event.nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;
    // Only trigger if scroll is significant
    if (Math.abs(diff) > 5) {
      if (diff > 0 && !isHeaderHidden.current && currentY > 0) {
        // Scrolling down, hide header
        Animated.timing(headerTranslateY, {
          toValue: -headerHeight,
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
  // Ref for feed page
  const searchInputRef = useRef<TextInput>(null);

  return (
    <View style={styles.container}>
      <Animated.View
        onLayout={e => setHeaderHeight(e.nativeEvent.layout.height)}
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1,
          marginBottom: height * 0.02,
          backgroundColor: 'white',
          width: '100%',
          paddingBottom: 5,
          paddingTop: height * 0.02,
          transform: [{translateY: headerTranslateY}],
        }}
      >
        <SearchBar
          ref={searchInputRef} // Uses the ref
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
      </Animated.View>
      {/* Render ProductReviewList directly, but pass onScroll and scrollEventThrottle for header animation */}
      {!isLoaded ? (
        <View style={{padding: 32, alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FFC107"/>
        </View>
      ) : !isAuthenticated ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', paddingTop: HEADER_MAX_HEIGHT }}>
          <Text style={{ textAlign: 'center', color: '#888', fontSize: 18, marginBottom: 8 }}>
            Welcome to Better Duniya!
          </Text>
          <Text style={{ textAlign: 'center', color: '#666', fontSize: 16 }}>
            Please log in to view product reviews and connect with the community.
          </Text>
        </View>
      ) : selected !== 'All' ? (
        <ComingSoonCard/>
      ) : isLoading ? (
        <View style={{padding: 32, alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#FFC107"/>
        </View>
      ) : (
        isSearched && summary && Array.isArray(summary.reviews) && summary.reviews.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Text style={{ textAlign: 'center', color: '#888', fontSize: 16 }}>
            No results found
          </Text>
        </View>
        ) : (
          <ProductReviewList
            summary={isSearched ? (summary ?? {
              reviews: [],
              userById: {},
              profileImageUriByUserId: {},
              reviewImageUriById: {}
            }) : (feedSummary ?? {reviews: [], userById: {}, profileImageUriByUserId: {}, reviewImageUriById: {}})}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{paddingTop: HEADER_MAX_HEIGHT}}
          />
        )
      )}
      <TouchableOpacity 
      style={styles.fab}
      onPress={() => {
        // Call ref to interact with search bar input
        if(searchInputRef.current){
          searchInputRef.current.focus()
        }
      }}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
