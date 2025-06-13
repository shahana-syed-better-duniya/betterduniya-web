import React, {useState} from "react";
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useProductReviewContext} from "@/utils/products/product-review-context";
import {fTimeAgo} from "@/utils/date";

const FILTERS = ["All", "Sony", "iPhone 14", "Laptops", "Resume"];

const FEED = [
  {
    id: "1",
    user: {
      name: "Vicky Hladynets",
      username: "@vickyh",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    reviewTime: "Reviewed 1d ago",
    rating: 5,
    text:
      "I really loved the sony earbuds xb700. The bass was awesome. The highs and lows hit the ...",
    image:
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    liked: true,
  },
  {
    id: "2",
    user: {
      name: "Vicky Hladynets",
      username: "@vickyh",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    reviewTime: "Reviewed 1d ago",
    rating: 2,
    text:
      "The build quality is not good. It is all plastic. The battery backup is very poor, didn't last ev ...",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    liked: false,
  },
];

const FeedScreen = () => {
  const {summary} = useProductReviewContext();

  const feedItems = [
    ...(summary?.reviews?.map(review => ({
      id: review.id,
      user: {
        name: summary?.userById[review.userId].personalName,
        username: summary?.userById[review.userId].username,
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      reviewTime: `Reviewed ${fTimeAgo(review.createdAt)}`,
      rating: review.rating,
      text: review.title,
      description: review.description,
      image: summary?.imageUriById[review.id],
      liked: false,
    })) ?? []),
    ...FEED,
  ]
  const [selectedFilter, setSelectedFilter] = useState("Sony");

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterPill,
              selectedFilter === f && styles.selectedPill,
            ]}
            onPress={() => setSelectedFilter(f)}
          >
            <Text
              style={[
                styles.pillText,
                selectedFilter === f && styles.selectedPillText,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Feed List */}
      <FlatList
        data={feedItems}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <FeedItem item={item}/>}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 80}}
      />
      {/* Search button (floating) */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
};

const FeedItem = ({item}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    (
      <View style={styles.feedItem}>
        {/* User Info */}
        <View style={{flexDirection: "row", alignItems: "center", marginBottom: 4}}>
          <Image source={{uri: item.user.avatar}} style={styles.avatar}/>
          <View style={{flex: 1, marginLeft: 8}}>
            <Text style={styles.username}>{item.user.name}</Text>
            <Text style={styles.handle}>{item.user.username}</Text>
          </View>
          <View style={{alignItems: "flex-end"}}>
            <Text style={styles.reviewTime}>{item.reviewTime}</Text>
            <View style={{flexDirection: "row", marginTop: 2}}>
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Icon
                    key={i}
                    name={i < item.rating ? "star" : "star-outline"}
                    size={16}
                    color="#FFC107"
                    style={{marginLeft: 1}}
                  />
                ))}
            </View>
          </View>
        </View>
        {/* Content */}
        <Text numberOfLines={expanded ? undefined : 2} style={styles.feedText}>
          {item.text}
          {!expanded && !!item.description && (
            <Text
              style={{ color: "#888" }}
              onPress={() => setExpanded(true)}
            > ... more</Text>
          )}
        </Text>
        {expanded && !!item.description && (
          <Text style={styles.feedText}>{item.description}</Text>
        )}
        <Image source={{uri: item.image}} style={styles.feedImage}/>
        {/* Actions */}
        <View style={styles.feedActions}>
          <TouchableOpacity>
            <Icon name="heart-outline" size={22} color="#888"/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="repeat-outline" size={22} color="#888" style={{marginLeft: 16}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="share-social-outline" size={22} color="#888" style={{marginLeft: 16}}/>
          </TouchableOpacity>
          <View style={{flex: 1}}/>
          <TouchableOpacity>
            <Icon name="ellipsis-horizontal" size={22} color="#888"/>
          </TouchableOpacity>
        </View>
      </View>
    )
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 30,
    paddingHorizontal: 12,
  },
  title: {
    color: "#C1C1C1",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 6,
  },
  filterScroll: {
    flexGrow: 0,
    marginVertical: 8,
    marginBottom: 10,
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
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  username: {
    fontWeight: "bold",
    fontSize: 15,
  },
  handle: {
    color: "#888",
    fontSize: 12,
    marginTop: 1,
  },
  reviewTime: {
    color: "#888",
    fontSize: 11,
  },
  feedText: {
    fontSize: 14,
    color: "#222",
    marginVertical: 6,
  },
  feedImage: {
    width: "100%",
    height: 110,
    borderRadius: 7,
    marginVertical: 7,
  },
  feedActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    bottom: 80,
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

export default FeedScreen;
