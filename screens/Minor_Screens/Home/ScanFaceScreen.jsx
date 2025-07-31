import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import TitleContainer from "../../../components/UI_Common/Commons/TitleContainer";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import SemiFlatButton from "../../../components/UI_Common/Buttons/SemiFlatButton";
import ImagePreview from "../../../components/Home_Screen/Phase2_ScanFace/ImagePreview";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScanFaceScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const insets = useSafeAreaInsets();

  const handleImageSelect = (imageUri) => {
    setSelectedImage(imageUri);
  };

  const handleUploadPhoto = () => {
    // This will trigger the ImagePreview component to show the image picker
    // The actual image picking is handled in the ImagePreview component
  };

  const handleContinuePress = () => {
    if (selectedImage) {
      // Navigate to the result screen with the image URI
      navigation.navigate("Result", { imageUri: selectedImage });
    } else {
      // If no image is selected, prompt to select an image
      alert("Please upload a photo before continuing");
    }
  };

  return (
    <ScrollView className="flex-1">
      <View
        className="px-8 py-6"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        <TitleContainer
          title="Scan Your Face"
          description="Upload a clear selfie for skin analysis"
        />

        <ImagePreview onImageSelect={handleImageSelect} />

        <View className="mt-4">
          {!selectedImage ? (
            <SemiFlatButton
              text="Upload Photo"
              icon="cloud-upload-outline"
              onPress={handleUploadPhoto}
            />
          ) : null}

          <NextButton
            text="Continue"
            icon="arrow-forward-outline"
            onPress={handleContinuePress}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ScanFaceScreen;
