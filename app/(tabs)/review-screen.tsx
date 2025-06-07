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

      {/* Title */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Enter a title..."
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

      <View style={styles.rowBetween}>
        <TouchableOpacity style={styles.addMediaBtn}>
          <Icon name="add" size={28} color="#FFC107" />
        </TouchableOpacity>
        <Text style={styles.charCount}>100,000 Characters</Text>
      </View>
      <Text style={styles.addMediaLabel}>Add images, video</Text>

      <View style={styles.hr} />

      {/* Rating */}
      <Text style={styles.ratingLabel}>Overall Rating</Text>
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Icon
              name="star"
              size={28}
              color={i <= rating ? (i <= 3 ? "#F44336" : "#FFC107") : "#ccc"}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.ratingTextRow}>
        <Text style={styles.negativeRating}>-ve Rating</Text>
        <Text style={styles.positiveRating}>+ve Rating</Text>
      </View>
      <View style={styles.ratingArrowRow}>
        <Text style={styles.arrowLeft}>{"<——"}</Text>
        <Text style={styles.arrowRight}>{"——>"}</Text>
      </View>

      <View style={styles.hr} />

      {/* Post Button */}
      <TouchableOpacity style={styles.postBtn}>
        <Text style={styles.postBtnText}>Post !</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingTop: 24, paddingHorizontal: 20 },
  header: { fontWeight: "bold", fontSize: 28, marginBottom: 14 },
  profileRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  name: { fontWeight: "bold", fontSize: 18, color: "#222" },
  username: { color: "#888", fontSize: 15 },
  label: { fontWeight: "500", color: "#555", fontSize: 15, marginBottom: 2 },
  titleInput: {
    borderBottomWidth: 2,
    borderBottomColor: "#ededed",
    fontSize: 16,
    paddingVertical: 4,
    marginBottom: 8,
  },
  reviewBox: {
    backgroundColor: "#f6f6f6",
    minHeight: 110,
    textAlignVertical: "top",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ededed",
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  addMediaBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: "#fff",
    shadowColor: "#000", shadowOpacity: 0.07, shadowRadius: 3, elevation: 2,
    justifyContent: "center", alignItems: "center",
  },
  charCount: { color: "#888", fontSize: 13, marginRight: 2 },
  addMediaLabel: { color: "#888", fontSize: 14, marginTop: 3, marginBottom: 16 },
  hr: {
    height: 2,
    backgroundColor: "#ededed",
    marginVertical: 12,
    borderRadius: 2,
  },
  ratingLabel: { fontSize: 16, fontWeight: "500", color: "#666", marginBottom: 10 },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  ratingTextRow: {
    flexDirection: "row", justifyContent: "space-between", marginHorizontal: 2,
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
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 22,
    shadowColor: "#000", shadowOpacity: 0.14, shadowRadius: 6, elevation: 3,
  },
  postBtnText: { color: "#fff", fontWeight: "bold", fontSize: 20 },
});
