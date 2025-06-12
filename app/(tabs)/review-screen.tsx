import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {useForm} from "@/hooks/interaction/use-form";
import useString from "@/hooks/primitive/use-string";
import {validateReview} from "@/app/(tabs)/validators";
import useProductReviewCreate from "@/hooks/product/use-product-review-create";
import {useUserContext} from "@/utils/user/user-context";
import useImagePicker from "@/hooks/interaction/use-image-picker";

export default function ReviewScreen() {
  const apiResult = useString("");
  const {onCreateReview, isLoading} = useProductReviewCreate();
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
    isValid,
    setErrors,
  } = useForm({
    initialValues: {
      title: "",
      description: "",
      rating: '0',
    },
    validate: validateReview,
  });

  const handlePostReview = async () => {
    Alert.alert('upload');
    if (images.length === 0) {
      Alert.alert('Please upload an image for product review.');
      return;
    }
    Alert.alert('apiResult');
    Alert.alert(`${isValid}`);
    Alert.alert(`${errors.title}`);
    Alert.alert(`${errors.description}`);
    Alert.alert(`${errors.rating}`);

    apiResult.onClear();
    if (isValid) {
      try {
        await onCreateReview(values.title, values.description, parseInt(values.rating), images);
        apiResult.onChangeValue("Review submitted successfully!");
        resetForm();
        setImages([]);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          title: "Something went wrong. Please try again.",
        }));
      }
    }
  };

  const {username, personalName} = useUserContext();

  const {
    images,
    setImages,
    handlePickImages,
  } = useImagePicker();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 32}}
    >
      <Text style={styles.header}>New Review</Text>

      <View style={styles.profileRow}>
        <Image
          source={{uri: "https://randomuser.me/api/portraits/men/32.jpg"}}
          style={styles.avatar}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.name}>{personalName}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
      </View>

      {/* Title Input */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.titleInput}
        placeholder="Enter a title..."
        value={values.title}
        onChangeText={handleChange("title")}
        onBlur={handleBlur("title")}
        placeholderTextColor="#bbb"
      />
      {touched.title && errors.title && (
        <Text style={styles.inputError}>{errors.title}</Text>
      )}

      {/* Review Input */}
      <TextInput
        style={styles.reviewBox}
        multiline
        numberOfLines={6}
        placeholder="Please write your review..."
        value={values.description}
        onChangeText={handleChange("description")}
        onBlur={handleBlur("description")}
        placeholderTextColor="#bbb"
      />
      {touched.description && errors.description && (
        <Text style={styles.inputError}>{errors.description}</Text>
      )}

      {/* Add Media Section */}
      <View style={styles.rowBetween}>
        <TouchableOpacity style={styles.addMediaBtn} onPress={handlePickImages}>
          <Icon name="add" size={28} color="#FFC107"/>
        </TouchableOpacity>
        <Text style={styles.charCount}>5000 Characters</Text>
      </View>
      <Text style={styles.addMediaLabel}>Add images, video</Text>
      {images.length > 0 && (
        <FlatList
          horizontal
          data={images}
          keyExtractor={(item) => item.uri}
          renderItem={({item}) => (
            <View style={styles.previewImageContainer}>
              <Image
                source={{uri: item.uri}}
                style={styles.previewImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => setImages(images => images.filter(img => img.uri !== item.uri))}
              >
                <Icon name="close-circle" size={22} color="#F44336"/>
              </TouchableOpacity>
            </View>
          )}
          style={{marginBottom: 14}}
        />
      )}


      <View style={styles.hr}/>

      {/* Rating Section */}
      <Text style={styles.ratingLabel}>Overall Rating</Text>
      <View style={styles.ratingRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handleChange("rating")(i)}
          >
            <Icon
              name="star"
              size={28}
              color={i <= parseInt(values.rating) ? (i <= 3 ? "#F44336" : "#FFC107") : "#ccc"}
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

      <View style={styles.hr}/>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000"/>
      ) : (
        <TouchableOpacity
          style={[
            styles.postBtn,
            !isValid && {backgroundColor: "#ccc"},
          ]}
          onPress={handlePostReview}
          disabled={!isValid}
        >
          <Text style={styles.postBtnText}>Post!</Text>
        </TouchableOpacity>
      )}

      {!apiResult.isEmpty && (
        <Text style={styles.successMessage}>{apiResult.value}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#fff", paddingTop: 24, paddingHorizontal: 20},
  header: {fontWeight: "bold", fontSize: 28, marginBottom: 14},
  profileRow: {flexDirection: "row", alignItems: "center", marginBottom: 24},
  avatar: {width: 60, height: 60, borderRadius: 30},
  name: {fontWeight: "bold", fontSize: 18, color: "#222"},
  username: {color: "#888", fontSize: 15},
  label: {fontWeight: "500", color: "#555", fontSize: 15, marginBottom: 2},
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  charCount: {color: "#888", fontSize: 13, marginRight: 2},
  addMediaLabel: {color: "#888", fontSize: 14, marginTop: 3, marginBottom: 16},
  hr: {
    height: 2,
    backgroundColor: "#ededed",
    marginVertical: 12,
    borderRadius: 2,
  },
  ratingLabel: {fontSize: 16, fontWeight: "500", color: "#666", marginBottom: 10},
  ratingRow: {flexDirection: "row", alignItems: "center", marginBottom: 2},
  ratingTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 2,
  },
  negativeRating: {color: "#F44336", fontSize: 14, fontWeight: "600"},
  positiveRating: {color: "#FFC107", fontSize: 14, fontWeight: "600"},
  ratingArrowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 2,
    marginBottom: 10,
  },
  arrowLeft: {color: "#F44336", fontSize: 14},
  arrowRight: {color: "#FFC107", fontSize: 14},
  postBtn: {
    marginTop: 22,
    alignSelf: "center",
    backgroundColor: "#FFC107",
    paddingHorizontal: 36,
    paddingVertical: 12,
    borderRadius: 22,
    shadowColor: "#000",
    shadowOpacity: 0.14,
    shadowRadius: 6,
    elevation: 3,
  },
  postBtnText: {color: "#fff", fontWeight: "bold", fontSize: 20},
  inputError: {color: "#F44336", fontSize: 13, marginTop: 4},
  successMessage: {color: "#4CAF50", fontSize: 16, marginTop: 10},
  previewImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  previewImageContainer: {
    position: "relative",
    marginRight: 10,
  },
  removeBtn: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 1,
    elevation: 3,
  },
});
