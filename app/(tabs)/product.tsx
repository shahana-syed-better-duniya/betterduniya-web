import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ProductPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Coming Soon!</Text>
      <Text style={styles.comingSoonText}>Find cool products, amazing deals here!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  boldText: {
    fontSize: 26,
    fontWeight: "700",
    color: "#444", // darker grey for emphasis
    marginBottom: 10,
    textAlign: "center",
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666", // lighter grey for subtext
    textAlign: "center",
  },
});
