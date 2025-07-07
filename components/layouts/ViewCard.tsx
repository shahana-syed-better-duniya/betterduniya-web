import {View, StyleSheet, Dimensions} from "react-native";
import React from "react";
import {CARD_WIDTH} from "@/constants/themes";

const { height } = Dimensions.get('window');

interface ViewCardProps {
  children: React.ReactNode;
}

const ViewCard:React.FC<ViewCardProps> = ({children}) => (
  <View style={stylesLocal.card}>
    {children}
  </View>
)

export default ViewCard;

const stylesLocal = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: height * 0.55,
    backgroundColor: "#fff",
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: "center",
    alignSelf: "center",
    minHeight: 340,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 8}, // more height to push shadow down only
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5, // slightly higher for thicker shadow on Android
  }
})
