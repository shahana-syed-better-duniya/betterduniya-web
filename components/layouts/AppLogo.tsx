import {Image} from "react-native";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";

const {width, height} = Dimensions.get("window");


const AppLogo = ({size = height * 0.12}) => (
  <Image source={require("../../assets/images/main.png")} style={{width: size, height: size}}/>

)

export default AppLogo;
