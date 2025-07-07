import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface RatingProps {
  onChangeRating: (rating: number) => void;
}

const Rating: React.FC<RatingProps> = ({onChangeRating}) => {
  const [leftRating, setLeftRating] = useState(0);   // Red stars
  const [rightRating, setRightRating] = useState(0); // Yellow stars

  const handleLeftPress = (i: number) => {
    setLeftRating(i);
    setRightRating(0);
    onChangeRating(-i);
  };

  const handleRightPress = (i: number) => {
    setRightRating(i);
    setLeftRating(0);
    onChangeRating(i);
  };

  return (
    <View style={styles.container}>
      {/* Red Stars Row */}
      <View style={styles.ratingRow}>
        {[5, 4, 3, 2, 1].map((i) => (
          <TouchableOpacity key={`red-${i}`} onPress={() => handleLeftPress(i)}>
            <Icon
              name={i <= leftRating ? "star" : "star-outline"}
              size={18}
              color="#F44336"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Yellow Stars Row */}
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={`yellow-${i}`} onPress={() => handleRightPress(i)}>
            <Icon
              name={i <= rightRating ? "star" : "star-outline"}
              size={18}
              color="#FFC107"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
});

