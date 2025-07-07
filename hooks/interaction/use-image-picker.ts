import {useState} from "react";
import {launchImageLibrary} from "react-native-image-picker";

const useImagePicker = () => {

  const [images, setImages] = useState([]); // Store picked images
  const handlePickImages = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 4, // Limit to 4 images, change as needed
      includeBase64: false,
    });

    if (result.assets && result.assets.length > 0) {
      setImages(result.assets); // Save selected images array
    }
  };

  return {
    images,
    setImages,
    handlePickImages,
  }
}

export default useImagePicker;
