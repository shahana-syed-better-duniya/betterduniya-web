import {useState} from "react";
import * as ImagePicker from 'expo-image-picker';
import {Asset} from "expo-asset";
import * as MediaLibrary from "expo-media-library";
import {Alert} from "react-native";
import useInit from "@/hooks/api/use-init";

const saveSampleImageToGallery = async () => {
  // 1. Load the asset (require returns a module reference)
  const asset = Asset.fromModule(require('../../assets/images/google.png'));
  await asset.downloadAsync(); // Ensure it is local

  // 2. Get the local URI of the asset
  const localUri = asset.localUri || asset.uri;

  // 3. Request media library permissions
  const {status} = await MediaLibrary.requestPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission required', 'Please allow media library access');
    return;
  }

  // 4. Save the image to the gallery
  try {
    const assetInMediaLibrary = await MediaLibrary.createAssetAsync(localUri);
    await MediaLibrary.createAlbumAsync('Sample Images', assetInMediaLibrary, false);
    Alert.alert('Success', 'Sample image saved to gallery!');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};

const useImagePicker = () => {
  const [images, setImages] = useState([]); // Store picked images

  const handlePickImages = async () => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Allow multiple selection (as of expo-image-picker@14+)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Only works in SDK 48+ and some platforms
      selectionLimit: 4, // Only supported on web & iOS 16+ as of SDK 49
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImages(result.assets);
    }
  };

  return {
    images,
    setImages,
    handlePickImages,
  }
}

export default useImagePicker;
