import React, {useState} from "react";
import {Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import useRequest from "@/hooks/api/use-request";
import {productApi} from "@/api/product/product";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import {router} from "expo-router";
import {useProductReviewContext} from "@/utils/products/product-review-context";

export default function HomeScreen() {
  const {setProductReviewContext} = useProductReviewContext();
  const {onRequest} = useRequest<ProductReviewSummary>();
  const [search, setSearch] = useState("");

  const onSearch = async () => {
    if (search.length === 0) {
      Alert.alert('Please search for a product name.')
      return;
    }
    const response = await onRequest(productApi.searchReview, [search], null, false);
    if (response.result != null) {
      setProductReviewContext({summary: response.result});
      router.replace('/(tabs)/feed-screen');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Icon name="arrow-up-outline" size={52} color="#FFC107"/>
        </View>
        <Text style={styles.brandText}>better duniya</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#bbb"
          value={search}
          onChangeText={setSearch}
        />
        <Icon name="search" size={22} color="#bbb" style={{marginLeft: 6}}/>
      </View>

      <TouchableOpacity style={styles.goButton} onPress={onSearch}>
        <Text style={styles.goButtonText}>Go !</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#fff", alignItems: "center"},

  logoWrapper: {alignItems: "center", marginTop: 86, marginBottom: 64},
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.09,
    shadowRadius: 16,
    marginBottom: 18,
  },
  brandText: {
    fontSize: 36,
    fontWeight: "400",
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    letterSpacing: 1.2,
    color: "#222",
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 28,
    width: "84%",
    height: 52,
    paddingHorizontal: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    marginBottom: 18,
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    color: "#222",
  },

  goButton: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 44,
    paddingVertical: 13,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
    marginTop: 6,
  },
  goButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 19,
  },

  fab: {
    position: "absolute",
    bottom: 32,
    right: 22,
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#fff",
    elevation: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 8,
  },
});
