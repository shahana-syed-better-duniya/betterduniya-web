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
import DualRowRating from "../../components/ui/Rating";
import {useUserContext} from "@/utils/user/user-context";
import useImagePicker from "@/hooks/interaction/use-image-picker";
import {validateReview} from "@/app/validators";
import {useForm} from "@/hooks/interaction/use-form";
import useProductReviewCreate from "@/hooks/product/use-product-review-create";
import useString from "@/hooks/primitive/use-string";
import {useBoolean} from "@/hooks/primitive/use-boolean";

export default function ReviewScreen() {
  const {username, firstName, lastName} = useUserContext();
  const {onCreateReview, isLoading} = useProductReviewCreate();

  const isRecommended = useBoolean(true);
  const apiResult = useString("");
  const {
    values,
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

  const handleCreateReview = async () => {
    if (images.length === 0) {
      Alert.alert('Please upload an image for product review.');
      return;
    }

    apiResult.onClear();
    if (isValid) {
      try {
        await onCreateReview(values.title, values.description, parseInt(values.rating), isRecommended.value, images);
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

  const {
    images,
    setImages,
    handlePickImages,
  } = useImagePicker();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 32}}>
      <Text style={styles.header}>New Review</Text>
      <View style={styles.profileRow}>
        <Image
          source={{uri: "https://randomuser.me/api/portraits/men/32.jpg"}}
          style={styles.avatar}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
      </View>

      <TextInput
        style={styles.prodBox}
        placeholder="Enter product name..."
        value={values.title}
        onChangeText={handleChange('title')}
        onBlur={handleBlur("title")}
        placeholderTextColor="#bbb"
      />

      <TextInput
        style={styles.reviewBox}
        multiline
        numberOfLines={6}
        placeholder="Please write your review..."
        value={values.description}
        onChangeText={handleChange('description')}
        onBlur={handleBlur("description")}
        placeholderTextColor="#bbb"
      />
      <Text style={styles.charCount}>100,000 Characters</Text>

      <Text style={{fontSize: 14, fontWeight: 300, color: "#696363", marginBottom: 7}}>Add images, video</Text>
      <TouchableOpacity style={styles.addMediaCircle} onPress={handlePickImages}>
        <Icon name="add" size={28} color="#FFC107"/>
      </TouchableOpacity>
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

      <View style={{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        backgroundColor: "#fcfcfc",
        padding: 12,
        borderRadius: 15,
        marginBottom: 16,
        justifyContent: "space-between",
      }}>
        <Text style={styles.recLabel}>Would you recommend?</Text>

        <View style={{flexDirection: "row", gap: 10}}>
          <TouchableOpacity
            style={[
              styles.thumbsBtn,
              isRecommended.value && styles.thumbsBtnSelectedPositive,
            ]}
            onPress={isRecommended.onTrue}
          >
            <Image
              source={require("../../assets/images/thumbsup.png")}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.thumbsBtn,
              !isRecommended.value && styles.thumbsBtnSelectedNegative,
            ]}
            onPress={isRecommended.onFalse}
          >
            <Image
              source={require("../../assets/images/thumbsdown.png")}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        width: "100%",
        backgroundColor: "#fcfcfc",
        padding: 12,
        borderRadius: 15
      }}>
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

      {isLoading ? (
        <ActivityIndicator size="large" color="#000"/>
      ) : (
        <TouchableOpacity
          style={[
            styles.postBtn,
            !isValid && {backgroundColor: "#ccc"},
          ]}
          onPress={handleCreateReview}
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
  container: {flex: 1, backgroundColor: "white", paddingTop: 24, paddingHorizontal: 20},
  header: {fontWeight: "bold", fontSize: 24, marginBottom: 16},
  profileRow: {flexDirection: "row", alignItems: "center", marginBottom: 24},
  avatar: {width: 60, height: 60, borderRadius: 30},
  name: {fontWeight: "bold", fontSize: 17, color: "#222"},
  username: {color: "#888", fontSize: 14},
  label: {fontWeight: "500", color: "#555", fontSize: 15, marginBottom: 2},
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
  charCount: {
    color: "#888",
    fontSize: 13,
    marginRight: 2,
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: -10
  },
  recLabel: {fontSize: 14, fontWeight: 300, color: "#696363"},
  overallLabel: {fontSize: 14, fontWeight: 300, color: "#696363", marginBottom: 12},
  ratingTextRow: {
    flexDirection: "row", justifyContent: "space-between", gap: 20
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
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 23,
    borderWidth: 2.5,
    borderColor: "#FFAE00"
  },
  inputError: {color: "#F44336", fontSize: 13},
  postBtnText: {color: "#fff", fontWeight: "bold", fontSize: 20},
  successMessage: {color: "#4CAF50", fontSize: 16, marginTop: 10},
  previewImageContainer: {
    position: "relative",
    marginRight: 10,
  },
  previewImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  removeBtn: {
    position: "absolute",
    top: 0,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 1,
    elevation: 3,
  },
  thumbsBtnSelectedPositive: {
    borderColor: "#FFC107",
    backgroundColor: "#FFF8E1",
    shadowColor: "#FFC107",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 4,
  },
  thumbsBtnSelectedNegative: {
    borderColor: "#F44336",
    backgroundColor: "#FFEBEE",
    shadowColor: "#F44336",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    elevation: 4,
  },
});
