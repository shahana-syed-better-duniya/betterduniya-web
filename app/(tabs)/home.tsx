import React from "react";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BetterDuniyaLogo from "@/components/layouts/BetterDuniyaLogo";
import useSearchProductReview from "@/hooks/product/use-search-product-review";

export default function Home() {
  const {
    onSearch,
    isLoading,
    searchValue,
  } = useSearchProductReview();
  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.logoWrapper}>
        <View style={stylesLocal.logoCircle}>
          <BetterDuniyaLogo/>
        </View>
        <Text style={stylesLocal.brandText}>Better Duniya</Text>
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
