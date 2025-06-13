import React, {useState} from "react";
import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ReviewCard from "../../components/ui/ReviewCard"

const FILTERS = ["All", "Sony", "iPhone 14", "Laptops", "Resume"];

const FEED = [
  {
    id: "1",
    user: {
      name: "Vicky Hladynets",
      username: "@vickyh",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    reviewTime: "1d ago",
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
    reviewTime: "1d ago",
    rating: 2,
    text:
      "The build quality is not good. It is all plastic. The battery backup is very poor, didn't last ev ...",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    liked: false,
  },
];

const FeedScreen = () => {
  const [selected, setSelected] = useState("All");

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 5}}>
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
      </View>
      <FlatList
        data={FEED}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ReviewCard
            prodName={"Product Name"}
            desc={item.text}
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
      {/* Search button (floating) */}
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

export default FeedScreen;
