import {Image} from "react-native";
import React from "react";

const AppLogo = ({size = 74}) => (
  <Image source={require("../../assets/images/main.png")} style={{width: size, height: size}}/>

)

export default AppLogo;
