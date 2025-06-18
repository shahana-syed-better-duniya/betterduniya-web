import {Image} from "react-native";
import React from "react";

const BetterDuniyaLogo = ({size = 64}) => (
  <Image source={require("../../assets/images/duniya.png")} style={{width: size, height: size}}/>

)

export default BetterDuniyaLogo;
