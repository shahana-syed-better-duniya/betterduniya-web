import {Dimensions} from "react-native";

export const THEMES = {
  PRIMARY: "#FFBF00",
}

const {width, height} = Dimensions.get("window");
export const CARD_WIDTH = Math.min(width * 0.92, 420);
