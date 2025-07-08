import mime from "mime";

export const onAddFileToForm = async (formData: FormData, images: {
  uri: string
}[]) => {
  for (let idx = 0; idx < images.length; idx++) {
    const image = images[idx];

    if (image.uri.startsWith('data')) { // web
      const response = await fetch(image.uri);
      const blob = await response.blob();
      // Guess the extension/type - customize as needed
      const fileType = blob.type || "image/jpeg";
      const fileName = `photo_${idx}.${fileType.split('/')[1] || "jpg"}`;
      const file = new File([blob], fileName, {type: fileType});
      formData.append("fileUpload", file);
    } else { // mobile
      const uri = image.uri;
      const type = mime.getType(image.uri) || 'image/png';
      const name = image.fileName || 'photo.jpg';
      formData.append('fileUpload', {
        uri,
        type,
        name,
      });
    }
  }

}
