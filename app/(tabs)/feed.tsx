import React, {useState} from "react";
import {FlatList, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ComingSoonCard from "@/components/products/ComingSoonCard";
import SearchBar from "@/components/layouts/SearchBar";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import useFeedList from "@/hooks/product/use-feed-list";
import useInit from "@/hooks/api/use-init";
import ProductReviewList from "@/components/products/ProductReviewList";
import styles from '../../components/products/product-review-list-styles';

const FILTERS = ["All",];

const Feed = () => {
  const {summary: feedSummary, onUpdate} = useFeedList();
  useInit(onUpdate);

  const [selected, setSelected] = useState("All");

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 20}}>
        <SearchBar searchValue={''}
                   icon={"search-outline"}
                   onChangeText={ ()=>{}}
                   placeholder={''}
                   onSearch={async ()=>{}}/>
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
        <ProductReviewList summary={feedSummary ?? {reviews: [], userById: {}, imageUriById: {}}}/>}
      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
};

export default Feed;
