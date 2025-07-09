import React, {useRef, useState} from "react";
import {Animated, FlatList, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ComingSoonCard from "@/components/products/ComingSoonCard";
import SearchBar from "@/components/layouts/SearchBar";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import useFeedList from "@/hooks/product/use-feed-list";
import useInit from "@/hooks/api/use-init";
import ProductReviewList from "@/components/products/ProductReviewList";
import styles from '../../components/products/product-review-list-styles';

const FILTERS = ["All",];

const HEADER_MAX_HEIGHT = 150; // Max height of your header
const HEADER_MIN_HEIGHT = 60;  // Min height when collapsed
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;



const Feed = () => {
  const {summary: feedSummary, onUpdate} = useFeedList();
  useInit(onUpdate);

  const [selected, setSelected] = useState("All");

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp', // Clamps the output value within the outputRange
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE], // Moves the header up
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{position:'absolute', top:0, zIndex: 1, marginBottom: 20, backgroundColor:'white', width: '100%', paddingBottom: 5, paddingTop: 20}}>
        <SearchBar searchValue={''}
                   icon={"search-outline"}
                   onChangeText={ ()=>{}}
                   placeholder={''}
                   onSearch={async ()=>{}}/>
        <View style={{marginLeft: 12}}>
          <FlatList
            scrollEventThrottle={16} // Optimize performance
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false } // Set to true if no layout animations are involved
            )}
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

      </Animated.View>
      {selected !== 'All' ? <ComingSoonCard/> :
        <ProductReviewList summary={feedSummary ?? {reviews: [], userById: {}, imageUriById: {}}}/>}
      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
