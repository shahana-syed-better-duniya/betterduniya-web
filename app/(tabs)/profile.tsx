import React from "react";
import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import {useUserContext} from "@/utils/user/user-context";
import SearchBar from "@/components/layouts/SearchBar";
import useEditUserProfile from "@/hooks/user/use-edit-user-profile";
import {useForm} from "@/hooks/interaction/use-form";
import {validateBio} from "@/utils/products/validators";
import TextInputRequired from "@/components/inputs/TextInputRequired";
import {useBoolean} from "@/hooks/primitive/use-boolean";
import AlertPromptModal from "@/components/products/AlertPromptModal";
import useImagePicker from "@/hooks/interaction/use-image-picker";
import useUploadProfileImage from "@/hooks/user/use-upload-profile-image";
import ProfileImage from "@/components/users/ProfileImage";


export default function Profile() {
  const {username, firstName, lastName, bio, profileImageUri, setUserContext} = useUserContext();

  const {onUpload} = useUploadProfileImage();
  const {handlePickImages} = useImagePicker();

  const handleUploadProfileImage = async (e: GestureResponderEvent) => {
    const imagesLocal = await handlePickImages();

    if (imagesLocal != null && imagesLocal?.length > 0) {
      const response = await onUpload(imagesLocal);
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

  const isClickedComingSoonButtons = useBoolean(false);


  return (
    <View style={styles.container}>
      <SearchBar searchValue={username} placeholder={username} onSearch={async () => {
      }}/>

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handleUploadProfileImage}>
          <ProfileImage
            style={styles.avatar}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: 12}}>
          <Text style={styles.displayName}>{firstName} {lastName}</Text>
          <Text style={styles.username}>@{username}</Text>
          <View style={{flexDirection: "row", marginTop: 2}}>
            {/*<Text style={styles.mutedText}>100 Interests</Text>*/}
            {/*<Text style={styles.mutedText}> 50 Followers</Text>*/}
          </View>
        </View>
        <TouchableOpacity>
          <Icon name="create-outline" size={22} color="#222"/>
        </TouchableOpacity>
      </View>

      {/* Bio */}
      <Text style={styles.bioTitle}>Bio</Text>

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
        {touched.bio && (
          <TouchableOpacity
            style={[
              styles.saveButton,
              !isValid && styles.saveButtonDisabled
            ]}
            onPress={handleSaveBio}
            disabled={!isValid}
          >
            <Icon name="checkmark" size={20} color="#fff"/>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.charCount}>{values.bio?.length}/1500 Characters</Text>

      {/* Quick Actions */}
      <AlertPromptModal
        visible={isClickedComingSoonButtons.value}
        onCancel={isClickedComingSoonButtons.onFalse}
        desc={''} title={'Coming Soon!'}/>
      <View style={styles.quickActionsRow}>
        <View style={styles.quickAction}>
          <View style={styles.quickImg}>
            <TouchableOpacity onPress={isClickedComingSoonButtons.onTrue}>
              <Image source={require("../../assets/images/arrowicon.png")}
                     style={{width: 35, height: 35, opacity: 0.7}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.quickLabel}>better duniya</Text>
        </View>
        <View style={styles.quickAction}>
          <View style={styles.quickImg}>
            <TouchableOpacity onPress={isClickedComingSoonButtons.onTrue}>
              <Image source={require("../../assets/images/lightbulbicon.png")}
                     style={{width: 50, height: 50, opacity: 0.7}}/>
            </TouchableOpacity>
          </View>
          <Text style={styles.quickLabel}>Interests</Text>

        </View>
        <View style={styles.quickAction}>
          <View style={styles.quickImg}>
            <TouchableOpacity onPress={isClickedComingSoonButtons.onTrue}>
              <Image source={require("../../assets/images/hearticon.png")}
                     style={{marginTop: 2.5, width: 40, height: 40, opacity: 0.7}}/>
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
        <TouchableOpacity style={styles.fab} onPress={isClickedComingSoonButtons.onTrue}>
          <Icon name="settings-outline" size={24} color="#222"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#fff", paddingTop: 30, paddingHorizontal: 14,},

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
  headerRow: {flexDirection: "row", alignItems: "center", marginBottom: 10,},
  avatar: {width: 62, height: 62, borderRadius: 31,},
  displayName: {fontWeight: "bold", fontSize: 18, color: "#222"},
  username: {color: "#888", fontSize: 14,},
  mutedText: {color: "#999", fontSize: 13, marginRight: 12},
  bioTitle: {fontWeight: "bold", fontSize: 16, marginTop: 12, marginBottom: 4},
  bioBox: {backgroundColor: "#F4F4F4", borderRadius: 7, padding: 14, marginBottom: 4},
  bioText: {fontSize: 15, color: "#222"},
  charCount: {alignSelf: "flex-end", fontSize: 12, color: "#999", marginBottom: 14},
  quickActionsRow: {flexDirection: "row", justifyContent: "center", gap: 20, marginTop: 12,},
  quickAction: {alignItems: "center", width: 100, height: 100, justifyContent: 'center'},
  quickImg: {
    borderWidth: 2,
    borderColor: '#84838f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    width: 75,
    height: 75
  },
  quickLabel: {fontSize: 13, color: "#888", marginTop: 5},
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
    backgroundColor: '#4CAF50',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  saveButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
});
