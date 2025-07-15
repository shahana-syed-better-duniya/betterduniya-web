import TextInputRequired from "@/components/inputs/TextInputRequired";
import SearchBar from "@/components/layouts/SearchBar";
import AlertPromptModal from "@/components/products/AlertPromptModal";
import ProfileImage from "@/components/users/ProfileImage";
import {useForm} from "@/hooks/interaction/use-form";
import useImagePicker from "@/hooks/interaction/use-image-picker";
import {useBoolean} from "@/hooks/primitive/use-boolean";
import useEditUserProfile from "@/hooks/user/use-edit-user-profile";
import useUploadProfileImage from "@/hooks/user/use-upload-profile-image";
import {validateBio} from "@/utils/products/validators";
import {useUserContext} from "@/utils/user/user-context";
import {router} from "expo-router";
import React, {useState} from "react";
import {Dimensions, GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import useListUserProductReviews from "@/hooks/user/use-list-user-product-reviews";
import ProductReviewList from "@/components/products/ProductReviewList";

const {width, height} = Dimensions.get("window");


export default function Profile() {
  const {username, firstName, lastName, bio, profileImageUri, setUserContext} = useUserContext();

  const {onUpload} = useUploadProfileImage();
  const {handlePickImages} = useImagePicker();

  const {
    summary,
    onUpdate,
  } = useListUserProductReviews();

  const handleUploadProfileImage = async (e: GestureResponderEvent) => {
    const imagesLocal = await handlePickImages();

    if (imagesLocal != null && imagesLocal?.length > 0) {
      const response = await onUpload(imagesLocal.filter(img => img.uri).map(img => ({uri: img.uri!})));
      const remoteImageUri = response.result;
      setUserContext({profileImageUri: remoteImageUri || ''});
    }
  };

  const {onEditBio} = useEditUserProfile();
  const {
    values,
    handleBlur,
    handleChange,
    touched,
    isValid,
  } = useForm({
    initialValues: {
      bio,
    },
    validate: validateBio,
  });

  const handleSaveBio = async () => {
    if (isValid) {
      await onEditBio(values.bio);
    }
  };


  const [isEditingBio, setIsEditingBio] = useState(false);

  const handleEditBio = () => {
    setIsEditingBio(prev => !prev);
  };


  const isClickedComingSoonButtons = useBoolean(false);


  return (
    <View style={styles.container}>
      {/* Search Bar: match Feed page alignment */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          zIndex: 1,
          marginBottom: height * 0.02,
          backgroundColor: 'white',
          width: '100%',
          paddingBottom: 5,
          paddingTop: height * 0.02,

        }}
      >
        <SearchBar
          searchValue={username}
          icon={'at-outline'}
          placeholder={username}
          onSearch={async () => {
          }}
          onChangeText={() => {
          }}
        />
      </View>

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleUploadProfileImage}>
          <ProfileImage style={styles.avatar}/>
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={styles.displayName}>{firstName} {lastName}</Text>
          <Text style={styles.username}>@{username}</Text>
          <View style={{flexDirection: "row", marginTop: 2}}>
            {/*<Text style={styles.mutedText}>100 Interests</Text>*/}
            {/*<Text style={styles.mutedText}> 50 Followers</Text>*/}
          </View>
        </View>
      </View>

      {/* Bio Section: always visible title and edit button */}
      <View style={{marginHorizontal: 14}}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 12,
          marginBottom: 0
        }}>
          <Text style={styles.bioTitle}>Bio</Text>
          <TouchableOpacity onPress={handleEditBio} style={{padding: 4}}>
            <Icon name="create-outline" size={22} color="#222"/>
          </TouchableOpacity>
        </View>
        {isEditingBio ? (
          <View>
            <TextInputRequired
              style={styles.bioBox}
              value={values.bio}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur("bio")}
              placeholder="Please enter your bio"
              multiline
              numberOfLines={4}
            />
            <Text style={styles.charCount}>{values.bio?.length}/1500 Characters</Text>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: -2, marginBottom: 5}}>
              <TouchableOpacity
                onPress={() => setIsEditingBio(false)}
                style={[styles.cancelBtn]}
              >
                <Icon name="close" size={20} color="#fff"/>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
                onPress={async () => {
                  await handleSaveBio();
                  setIsEditingBio(false);
                }}
                disabled={!isValid}
              >
                <Icon name="checkmark" size={20} color="#fff"/>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text
            style={values.bio ? styles.bioBox : styles.noBio}>{values.bio ? values.bio : 'User does not have bio'}</Text>
        )}
      </View>

      {summary != null && <ProductReviewList summary={summary}/>}

      {/* Quick Actions */}
      <AlertPromptModal
        visible={isClickedComingSoonButtons.value}
        onCancel={isClickedComingSoonButtons.onFalse}
        desc={''} title={'Coming Soon!'}/>
      <View style={styles.quickActionsRow}>
        <View style={styles.quickAction}>
          <View style={styles.quickImgContainer}>
            <TouchableOpacity onPress={isClickedComingSoonButtons.onTrue}
                              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require("../../assets/images/arrowicon.png")}
                     style={{width: 35, height: 35, opacity: 0.95}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.quickLabel}>better duniya</Text>
        </View>
        <View style={styles.quickAction}>
          <View style={styles.quickImgContainer}>
            <TouchableOpacity onPress={isClickedComingSoonButtons.onTrue}
                              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require("../../assets/images/lightbulbicon.png")}
                     style={{width: 50, height: 50, opacity: 0.95}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.quickLabel}>Interests</Text>
        </View>
        <View style={styles.quickAction}>
          <View style={styles.quickImgContainer}>
            <TouchableOpacity onPress={isClickedComingSoonButtons.onTrue}
                              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={require("../../assets/images/hearticon.png")}
                     style={{marginTop: 2.5, width: 40, height: 40, opacity: 0.95}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.quickLabel}>Followers</Text>
        </View>
      </View>

      {/* Floating Buttons */}
      <View style={styles.fabStack}>
        <View style={styles.fabWithBadge}>
          <TouchableOpacity style={styles.fab} onPress={isClickedComingSoonButtons.onTrue}>
            <Icon name="mail-outline" size={24} color="#222"/>
          </TouchableOpacity>
          {/*<View style={styles.badge}><Text style={styles.badgeText}></Text></View>*/}
        </View>
        <View style={styles.fabWithBadge}>
          <TouchableOpacity style={styles.fab} onPress={isClickedComingSoonButtons.onTrue}>
            <MaterialIcon name="flash-outline" size={24} color="#222"/>
          </TouchableOpacity>
          {/*<View style={styles.badge}><Text style={styles.badgeText}></Text></View>*/}
        </View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('/(pages)/settings')}>
          <Icon name="settings-outline" size={24} color="#222"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#fff", paddingTop: 30},

  goButton: {
    backgroundColor: "#FFC107",
    height: 38,
    paddingHorizontal: 16,
    marginLeft: 10,
    borderRadius: 18,
    justifyContent: "center", alignItems: "center",
    elevation: 2,
  },
  goButtonText: {fontWeight: "bold", color: "#fff", fontSize: 16},
  headerRow: {flexDirection: "row", alignItems: "center", marginBottom: 10, marginTop: 75, marginHorizontal: 14},
  avatar: {width: height * 0.08, height: height * 0.08, borderRadius: 31,},
  displayName: {fontWeight: "bold", fontSize: height * 0.019, color: "#222"},
  username: {color: "#888", fontSize: height * 0.015,},
  mutedText: {color: "#999", fontSize: height * 0.014, marginRight: 12},
  bioTitle: {fontWeight: "bold", fontSize: height * 0.017},
  bioBox: {
    backgroundColor: "#F4F4F4",
    borderRadius: 7,
    padding: 14,
    marginBottom: height * 0.008,
    marginTop: height * 0.005
  },
  noBio: {
    backgroundColor: "#F4F4F4",
    color: "#3c3c3c",
    borderRadius: 7,
    padding: 14,
    marginBottom: height * 0.008,
    marginTop: height * 0.005
  },
  bioText: {fontSize: 15, color: "#222"},
  charCount: {alignSelf: "flex-end", fontSize: height * 0.015, color: "#999", marginBottom: height * 0.01},
  quickActionsRow: {flexDirection: "row", justifyContent: "center", gap: 20, marginTop: height * 0.05,},
  quickAction: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: height * 0.11,
    height: height * 0.11,
  },
  quickImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: height * 0.11,
    height: height * 0.11,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
    borderRadius: 100,
    backgroundColor: 'white'
  },
  quickLabel: {fontSize: height * 0.014, color: "#888", marginTop: 6, marginBottom: 2, textAlign: 'center'},
  fabStack: {
    position: "absolute", right: 18, bottom: 32, alignItems: "flex-end", zIndex: 10,
  },
  fabWithBadge: {marginBottom: 22},
  fab: {
    backgroundColor: "#fff", borderRadius: 22, width: 44, height: 44,
    justifyContent: "center", alignItems: "center", elevation: 3,
    shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 3,
  },
  badge: {
    position: "absolute", top: -7, right: -7,
    backgroundColor: "#bdbdbd", borderRadius: 10, minWidth: 20, height: 20,
    justifyContent: "center", alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {color: "#fff", fontSize: 12, fontWeight: "bold"},
  navBar: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-around",
    borderTopWidth: 1, borderTopColor: "#eee",
    height: 58, backgroundColor: "#fff", position: "absolute", bottom: 0, left: 0, right: 0,
  },
  navAvatar: {width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: "#fff"},
  saveButton: {
    backgroundColor: '#ffc107',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },
  cancelBtn: {
    backgroundColor: '#BDBDBD',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 4},
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
});
