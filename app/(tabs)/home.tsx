import React from "react";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
<<<<<<< HEAD:app/(tabs)/home-screen.tsx
import {productApi} from "@/api/product/product";
import {router} from "expo-router";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import useRequest from "@/hooks/api/use-request";
import {useProductReviewContext} from "@/utils/products/product-review-context";
import Feather from 'react-native-vector-icons/Feather';
import { Shadow } from 'react-native-shadow-2';

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
=======
import AppLogo from "@/components/layouts/AppLogo";
import useSearchProductReview from "@/hooks/product/use-search-product-review";
import {AppConfigs} from "@/constants/app-configs";
>>>>>>> b0f807f818e79cecc41536bff2da71b75014629e:app/(tabs)/home.tsx

export default function Home() {
  const {
    onSearch,
    isLoading,
    searchValue,
  } = useSearchProductReview();
  return (
<<<<<<< HEAD:app/(tabs)/home-screen.tsx
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoWrapper}>
        <View style={styles.logoCircle}>
          <Feather  name="arrow-up-right" size={100} color={"#FFC107"}/>
=======
    <View style={stylesLocal.container}>
      <View style={stylesLocal.logoWrapper}>
        <View style={stylesLocal.logoCircle}>
          <AppLogo/>
>>>>>>> b0f807f818e79cecc41536bff2da71b75014629e:app/(tabs)/home.tsx
        </View>
        <Text style={stylesLocal.brandText}>{AppConfigs.APP_NAME}</Text>
      </View>

      <View style={stylesLocal.searchSection}>
        <View style={stylesLocal.searchBar}>
          <TextInput
            style={stylesLocal.searchInput}
            placeholder="Search..."
            placeholderTextColor="#bbb"
            value={searchValue.value}
            onChangeText={searchValue.onChangeValue}
          />
          <Icon name="search" size={22} color="#bbb" style={{marginLeft: 5}}/>
        </View>

        <TouchableOpacity style={stylesLocal.goButton} onPress={onSearch}>
          {isLoading ? (
            <ActivityIndicator color="#fff"/>
          ) : (
            <Text style={stylesLocal.goButtonText}>GO !</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={stylesLocal.fab}>
        <Icon name="search" size={28} color="#FFC107"/>
      </TouchableOpacity>
    </View>
  );
}

const stylesLocal = StyleSheet.create({
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
    width: 150,
    height: 150,
    borderRadius: 100,
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
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCFCFF",
    borderRadius: 28,
    height: 52,
    paddingHorizontal: 24,
    width: "84%",
    marginBottom: 47,
    shadowColor: "black",
    shadowRadius: 12,
    shadowOpacity: 0.2,
    elevation: 5,
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
    shadowColor: "black",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    elevation: 5,
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
