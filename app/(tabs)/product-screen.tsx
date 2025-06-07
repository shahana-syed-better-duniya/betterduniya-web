import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

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
  const [selected, setSelected] = useState("All");

  return (
    <View style={styles.container}>
      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterPill,
              selected === f && styles.selectedPill,
            ]}
            onPress={() => setSelected(f)}
          >
            <Text
              style={[
                styles.pillText,
                selected === f && styles.selectedPillText,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Feed */}
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Floating Search Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107" />
      </TouchableOpacity>
    </View>
  );
}

function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.logo }} style={styles.logo} />
        <View style={{ flex: 1, marginLeft: 8 }}>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.handle}>{item.handle}</Text>
        </View>
        <Icon name="arrow-forward-outline" size={22} color="#222" />
      </View>
      {/* Review */}
      <Text style={styles.review}>
        {item.review}
        <Text style={{ color: "#888" }}> more</Text>
      </Text>
      {/* Image */}
      <Image source={{ uri: item.image }} style={styles.productImg} />
      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity>
          <Icon name="heart-outline" size={24} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: 18 }}>
          <Icon name="repeat-outline" size={24} color="#222" />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <TouchableOpacity>
          <Icon name="ellipsis-horizontal" size={24} color="#222" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  filterRow: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 18,
    backgroundColor: "#f5f5f5",
    borderRadius: 19,
    marginRight: 10,
    elevation: 2,
  },
  selectedPill: {
    backgroundColor: "#ddd",
    elevation: 4,
  },
  pillText: {
    color: "#888",
    fontWeight: "500",
    fontSize: 16,
  },
  selectedPillText: {
    color: "#222",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fafafa",
    marginHorizontal: 12,
    marginBottom: 20,
    borderRadius: 15,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 7,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: "#FFC107",
    backgroundColor: "#fff",
    resizeMode: "contain",
  },
  brand: { fontWeight: "bold", fontSize: 16, color: "#222" },
  handle: { color: "#888", fontSize: 13, marginTop: 1 },
  review: { fontSize: 15, color: "#222", marginBottom: 8 },
  productImg: {
    width: "100%",
    height: 130,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    marginBottom: 8,
    resizeMode: "cover",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowRadius: 8,
  },
});
