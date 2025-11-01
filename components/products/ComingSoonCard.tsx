import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ComingSoonCard = () => {
  return (
    <View style={stylesLocal.container}>
      <View style={stylesLocal.circle}>
        <Text style={stylesLocal.exclamation}>!</Text>
      </View>
        <Text style={stylesLocal.title}>Coming Soon</Text>
        <Text style={stylesLocal.subtitle}>Cool products and amazing deals!!</Text>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
    borderRadius: 28,

  },
  circle:{
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    width: 75,
    borderRadius: 50,
    backgroundColor: '#F5F5F5',
    marginBottom: 15,
  },
  exclamation:{
    top: -1,
    color: "#333",
    fontSize: 50,
    fontWeight: 800,
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
