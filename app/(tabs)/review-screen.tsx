import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DualRowRating from "../../components/ui/Rating";

export default function ReviewScreen() {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* Header */}
      <Text style={styles.header}>New Review</Text>

      {/* User Info */}
      <View style={styles.profileRow}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.name}>Ben Parker</Text>
          <Text style={styles.username}>@benparker</Text>
        </View>
      </View>

      {/* Product Name */}
      <TextInput
        style={styles.prodBox}
        placeholder="Enter product name..."
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#bbb"
      />

      {/* Review */}
      <TextInput
        style={styles.reviewBox}
        multiline
        numberOfLines={6}
        placeholder="Please write your review..."
        value={review}
        onChangeText={setReview}
        placeholderTextColor="#bbb"
      />
      <Text style={styles.charCount}>100,000 Characters</Text>

      <Text style={{fontSize: 14, fontWeight: 300, color: "#696363", marginBottom: 7 }}>Add images, video</Text>
      <TouchableOpacity style={styles.addMediaCircle}>
        <Icon name="add" size={28} color="#FFC107" />
      </TouchableOpacity>
        
      


      <View style={{flexDirection: "row", alignItems: "center", alignSelf: "center", width: "100%", backgroundColor: "#fcfcfc", padding: 12, borderRadius: 15, marginBottom: 16, justifyContent: "space-between",}}>
        <Text style={styles.recLabel}>Would you recommend?</Text>

        <View style={{flexDirection: "row", gap: 10}}>
          <TouchableOpacity style={styles.thumbsBtn}>
            <Image
            source={require("../../assets/images/thumbsup.png")}
            style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.thumbsBtn}>
            <Image
            source={require("../../assets/images/thumbsdown.png")}
            style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Rating */}
      <View style={{justifyContent: "center", alignItems: "center", alignSelf: "center", width: "100%", backgroundColor: "#fcfcfc", padding: 12, borderRadius: 15}}>
        <Text style={styles.overallLabel}>Overall Rating</Text>
        <DualRowRating/>

        <View style={styles.ratingTextRow}>

          <Text style={styles.negativeRating}>
            -ve Rating
            <Text style={{marginLeft: 5, fontSize: 16, lineHeight: 18, fontFamily: 'monospace', fontWeight: 900}}>
              &#10229;
            </Text>
          </Text>


          
          <Text style={styles.positiveRating}>
            <Text style={{marginRight: 5, fontSize: 16, lineHeight: 18, fontFamily: 'monospace', fontWeight: 900}}>
              &#10230;
            </Text>
            +ve Rating</Text>

        </View>

      </View>



      {/* Post Button */}
      <TouchableOpacity style={styles.postBtn}>
        <Text style={styles.postBtnText}>Post !</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", paddingTop: 24, paddingHorizontal: 20 },
  header: { fontWeight: "bold", fontSize: 24, marginBottom: 16 },
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  name: { fontWeight: "bold", fontSize: 17, color: "#222" },
  username: { color: "#888", fontSize: 14 },
  label: { fontWeight: "500", color: "#555", fontSize: 15, marginBottom: 2 },
  prodBox: {
    backgroundColor: "#f6f6f6",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  
  reviewBox: {
    backgroundColor: "#f6f6f6",
    minHeight: 110,
    textAlignVertical: "top",
    borderRadius: 15,
    padding: 12,
    fontSize: 16,
    marginBottom: 5,
  },
  thumbsBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#696363",
    justifyContent: "center", alignItems: "center",
    
  },
    addMediaCircle: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: "white",
    borderWidth: 1.5,
    borderColor: "#696363",
    shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
    justifyContent: "center", alignItems: "center",
    marginBottom: 5,
  },
  charCount: { color: "#888", fontSize: 13, marginRight: 2, flexDirection: "row", alignSelf: "flex-end", marginBottom: -10},
  recLabel: { fontSize: 14, fontWeight: 300, color: "#696363"},
  overallLabel: { fontSize: 14, fontWeight: 300, color: "#696363", marginBottom: 12 },
  ratingTextRow: {
    flexDirection: "row", justifyContent: "space-between", gap: 20
  },
  negativeRating: { color: "#F44336", fontSize: 14, fontWeight: "600" },
  positiveRating: { color: "#FFC107", fontSize: 14, fontWeight: "600" },
  ratingArrowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 2,
    marginBottom: 10,
  },
  arrowLeft: { color: "#F44336", fontSize: 14 },
  arrowRight: { color: "#FFC107", fontSize: 14 },
  postBtn: {
    marginTop: 22,
    alignSelf: "center",
    backgroundColor: "#FFC107",
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 23,
    borderWidth: 2.5,
    borderColor: "#FFAE00"
  },
  postBtnText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
});
