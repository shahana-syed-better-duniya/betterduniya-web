import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ComingSoonCard = () => {
  return (
    <View style={stylesLocal.container}>
        <Text style={stylesLocal.title}>Coming Soon</Text>
        <Text style={stylesLocal.subtitle}>Stay tuned for exciting updates!</Text>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    padding: 20,
    borderRadius: 28,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  card: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default ComingSoonCard;
