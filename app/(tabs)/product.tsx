import React, {useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ReviewCard from "../../components/products/ReviewCard"
import {fTimeAgo} from "@/utils/date";
import useInitObject from "@/hooks/api/use-init-object";
import {productApi} from "@/api/product/product";
import {ProductReviewSummary} from "@/interfaces/products/productReviewSummary";
import ComingSoonCard from "@/components/products/ComingSoonCard";

export default function ProductPage() {
  return (
    <View style={styles.container}>
      <ComingSoonCard/>
    </View>
  );
}

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
