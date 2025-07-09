import {useState} from "react";
import {launchImageLibrary} from "react-native-image-picker";

const useImagePicker = (selectionLimit = 1) => {

  const [images, setImages] = useState([]); // Store picked images
  const handlePickImages = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: false,
      selectionLimit,
    });

    if (result.assets && result.assets.length > 0) {
      setImages(result.assets); // Save selected images array
      return result.assets;
    }
  };

  return {
    images,
    setImages,
    handlePickImages,
  }
}

export default useImagePicker;
