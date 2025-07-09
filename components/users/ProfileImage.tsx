import {Image} from "react-native";
import React from "react";
import {useUserContext} from "@/utils/user/user-context";

interface ProfileImageProps {
  style: object;
}

const ProfileImage: React.FC<ProfileImageProps> = ({style}) => {
  const {profileImageUri,} = useUserContext();

  return (
    <Image
      source={profileImageUri.length > 0 ? {uri: profileImageUri} : require("../../assets/images/profile-default.png")}
      style={style}
    />
  )
}

export default ProfileImage;
