import TextInputRequired from "@/components/inputs/TextInputRequired";
import { useForm } from "@/hooks/interaction/use-form";
import useImagePicker from "@/hooks/interaction/use-image-picker";
import { useBoolean } from "@/hooks/primitive/use-boolean";
import useString from "@/hooks/primitive/use-string";
import useCreateProductReview from "@/hooks/product/use-create-product-review";
import { validateReview } from "@/utils/products/validators";
import { useUserContext } from "@/utils/user/user-context";
import React from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DualRowRating from "../../components/products/Rating";

export default function Review() {
  const {username, firstName, lastName} = useUserContext();
  const {onCreateReview, isLoading} = useCreateProductReview();

  const isRecommended = useBoolean(true);
  const apiResult = useString("");
  const {
    values,
    handleBlur,
    handleChange,
    resetForm,
    isValid,
    errors,
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
        const validImages = images.filter(img => img.uri).map(img => ({ uri: img.uri! }));
        await onCreateReview(values.title, values.description, parseInt(values.rating), isRecommended.value, validImages);
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

  const {profileImageUri} = useUserContext();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 32}}>
      <Text style={styles.header}>New Review</Text>
      <View style={styles.profileRow}>
        <Image
          source={{uri: profileImageUri || require("../../assets/images/profile-default.png")}}
          style={styles.avatar}
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.username}>@{username}</Text>
        </View>
      </View>

      <TextInputRequired
        style={styles.prodBox}
        value={values.title}
        onChangeText={handleChange('title')}
        onBlur={handleBlur("title")}
        placeholder="Enter product name..."
      />
      <TextInputRequired
        style={styles.reviewBox}
        value={values.description}
        onChangeText={handleChange('description')}
        onBlur={handleBlur("description")}
        placeholder="Please write your review..."
        multiline
        numberOfLines={6}
      />
      <Text style={styles.charCount}>100,000 Characters</Text>

      <Text style={{fontSize: width * 0.033, fontWeight: 300, color: "#696363", marginBottom: width * 0.02, marginTop: width * -0.018, marginHorizontal: 7}}>
        Add images
      </Text>
      <TouchableOpacity style={styles.addMediaCircle} onPress={handlePickImages}>
        <Icon name="add" size={height * 0.045} color="#FFC107"/>
      </TouchableOpacity>
      {images.length > 0 && (
        <FlatList
          horizontal
          data={images}
          keyExtractor={(item) => item.uri || `image-${Math.random()}`}
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
        marginTop: width * 0.01,
        marginBottom: width * 0.02,
        justifyContent: "space-between",
      }}>
        <Text style={styles.recLabel}>Would you recommend?</Text>

        <View style={{flexDirection: "row", alignItems: "center", gap: 25}}>
          <TouchableOpacity
            onPress={isRecommended.onTrue}
            style={[
              styles.recBtn,
              isRecommended.value && styles.thumbsBtnSelectedPositive,
            ]}
          >
            <Image
              source={require("../../assets/images/thumbsup.png")}
              style={{width: height * 0.047, height: height * 0.047}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={isRecommended.onFalse}
            style={[
              styles.recBtn,
              !isRecommended.value && styles.thumbsBtnSelectedNegative,
            ]}
          >
            <Image
              source={require("../../assets/images/thumbsdown.png")}
              style={{width: height * 0.047, height: height * 0.047}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: width * 0.07,
        marginBottom: height * 0.04,
        alignSelf: "center",
        width: "100%",
      }}>
        <View>
          <Text style={styles.overallLabel}>Overall Rating</Text>
        </View>

        <View>
          <DualRowRating onChangeRating={(rating: number) => handleChange('rating')(rating)}/>

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
const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "white", paddingTop: 24, paddingHorizontal: 20},
  header: {fontWeight: "bold", fontSize: height * 0.03, marginTop: 7, marginBottom: height * 0.015},
  profileRow: {flexDirection: "row", alignItems: "center", marginBottom: height * 0.022},
  avatar: {width: height * 0.045, height: height * 0.045, borderRadius: 30},
  name: {fontWeight: "bold", fontSize: height * 0.022, color: "#222"},
  username: {color: "#888", fontSize: height * 0.018},
  prodBox: {
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    paddingHorizontal: height * 0.007,
    paddingVertical: height * 0.008,
    fontSize: height * 0.018,
    marginBottom: 10,
  },
  reviewBox: {
    backgroundColor: "#f6f6f6",
    minHeight: 110,
    textAlignVertical: "top",
    borderRadius: 8,
    paddingVertical: height * 0.008,
    paddingHorizontal: height * 0.007,
    fontSize: height * 0.018,
    marginBottom: height * 0.006,
  },
  addMediaCircle: {
    width: height * 0.056, height: height * 0.056, borderRadius: 21,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    justifyContent: "center", alignItems: "center",
    marginBottom: 5,
  },
  recBtn: {
    width: height * 0.05, height: height * 0.05, borderRadius: 40,
    backgroundColor: "#f6f6f6",
    justifyContent: "center", alignItems: "center",
  },
  charCount: {
    color: "#888",
    fontSize: height * 0.015,
    marginRight: 2,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  recLabel: {fontSize: height * 0.018, fontWeight: 300, color: "#696363", marginHorizontal: 7},
  overallLabel: {fontSize: height * 0.018, fontWeight: 300, color: "#696363", marginHorizontal: 7},
  ratingTextRow: {
    flexDirection: "row", justifyContent: "space-between", gap: 20
  },
  negativeRating: {color: "#F44336", fontSize: height * 0.017, fontWeight: 300},
  positiveRating: {color: "#FFC107", fontSize: height * 0.017, fontWeight: 300},
  ratingArrowRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 2,
  },
  postBtn: {
    alignSelf: "center",
    backgroundColor: "#FFC107",
    paddingHorizontal: 50,
    paddingVertical: height * 0.015,
    borderRadius: 23,
    shadowColor: "black",
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
    elevation: 4,
  },
  inputError: {color: "#F44336", fontSize: 13},
  postBtnText: {color: "#fff", fontWeight: "bold", fontSize: height * 0.022},
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
    backgroundColor: "#FFF8E1",
  },
  thumbsBtnSelectedNegative: {
    borderColor: "#F44336",
    backgroundColor: "#FFEBEE",
  },
});
