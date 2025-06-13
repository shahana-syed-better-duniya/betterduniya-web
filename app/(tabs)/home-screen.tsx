import React, {useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {productApi} from "@/api/product/product";
import {router} from "expo-router";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import useRequest from "@/hooks/api/use-request";
import {useProductReviewContext} from "@/utils/products/product-review-context";
import {Ionicons} from "@expo/vector-icons";

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
      {/* Logo Section */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Ionicons name="arrow-up-outline" size={70} color={"#FFC107"}/>
        </View>
        <Text style={styles.brandText}>better duniya</Text>
      </View>

      {/* Centered Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#bbb"
            value={search}
            onChangeText={setSearch}
          />
          <Icon name="search" size={22} color="#bbb" style={{marginLeft: 5}}/>
        </View>

        <TouchableOpacity style={styles.goButton} onPress={onSearch}>
          <Text style={styles.goButtonText}>GO !</Text>
        </TouchableOpacity>
      </View>

      {/* Floating Search Button */}
      <TouchableOpacity style={styles.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    backgroundColor: "#F7F6F6",
    alignItems: "center",
  },

  logoWrapper: {
    alignItems: "center",
    marginTop: 70,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 55,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  brandText: {
    fontSize: 36,
    fontWeight: 700,
    fontFamily: "Kanit-Regular.ttf",
    color: "#1B1B1B",
  },

  searchSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: -150,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFCFF",
    borderColor: "#E1E0E6",
    borderWidth: 2,
    borderRadius: 28,
    height: 52,
    paddingHorizontal: 24,
    width: "84%",
    marginBottom: 47,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    color: "#222",
  },

  goButton: {
    backgroundColor: "#FFC107",
    paddingHorizontal: 44,
    paddingVertical: 11,
    borderRadius: 24,
    alignItems: "center",
  },
  goButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
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
