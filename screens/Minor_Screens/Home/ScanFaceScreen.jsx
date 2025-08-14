import { View, ScrollView, Alert, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TitleContainer from "../../../components/UI_Common/Commons/TitleContainer";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import SemiFlatButton from "../../../components/UI_Common/Buttons/SemiFlatButton";
import ImagePreview from "../../../components/Home_Screen/Phase2_ScanFace/ImagePreview";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Redux imports
import {
  setImageData,
  clearError,
  setError,
} from "../../../store/slices/skincareSlice";
import { setCurrentPhase } from "../../../store/slices/authSlice";
import { useSubmitImageAnalysisMutation } from "../../../store/api/skincareApi";

const ScanFaceScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // Redux state
  const sessionId = useSelector((state) => state.auth.sessionId);
  const imageError = useSelector((state) => state.skincare.errors.image);

  // RTK Query mutation
  const [
    submitImageAnalysis,
    { isLoading, error: mutationError, isSuccess, data: responseData },
  ] = useSubmitImageAnalysisMutation();

  const handleImageSelect = (imageUri, imageData) => {
    console.log("📸 Image selected in ScanFaceScreen:", {
      imageUri,
      imageData,
    });
    setSelectedImage(imageUri);
    setSelectedImageData(imageData);

    // Store image data in Redux
    if (imageUri && imageData) {
      dispatch(setImageData(imageData));
    } else {
      dispatch(setImageData(null));
    }
  };

  const handleUploadPhoto = () => {
    // This will trigger the ImagePreview component to show the image picker
    // The actual image picking is handled in the ImagePreview component
  };

  // Handle image analysis success
  useEffect(() => {
    if (isSuccess && responseData) {
      console.log("✅ Image analysis successful:", responseData);

      // Update phase
      dispatch(setCurrentPhase("results"));

      // Navigate to result screen with analysis data
      navigation.navigate("Result", {
        imageUri: selectedImage,
        analysisData: responseData,
      });
    }
  }, [isSuccess, responseData, dispatch, navigation, selectedImage]);

  // Handle errors
  useEffect(() => {
    if (mutationError) {
      console.error("❌ Image analysis error:", mutationError);

      let errorMessage = "Failed to analyze image. Please try again.";

      // Show more specific error if available
      if (mutationError.details) {
        console.error("❌ Detailed errors:", mutationError.details);

        // Format error details for user
        const errorDetails = mutationError.details
          .map((detail) => `${detail.loc.join(".")}: ${detail.msg}`)
          .join("\n");

        errorMessage = `Request failed:\n${errorDetails}`;
      }

      Alert.alert("Analysis Error", errorMessage, [
        { text: "OK", onPress: () => dispatch(clearError("image")) },
      ]);
    }
  }, [mutationError, dispatch]);

  const validateImageSubmission = () => {
    if (!selectedImage || !selectedImageData) {
      Alert.alert("No Image", "Please upload a photo before continuing");
      return false;
    }

    if (!sessionId) {
      Alert.alert(
        "Session Error",
        "No active session found. Please start from the beginning."
      );
      dispatch(setError({ type: "image", message: "No session ID found" }));
      return false;
    }

    // Validate image data structure
    if (
      !selectedImageData.uri ||
      !selectedImageData.type ||
      !selectedImageData.name
    ) {
      Alert.alert(
        "Invalid Image",
        "Image data is incomplete. Please select the image again."
      );
      return false;
    }

    return true;
  };

  const handleContinuePress = async () => {
    // Clear any previous errors
    dispatch(clearError("image"));

    // Validate before submission
    if (!validateImageSubmission()) {
      return;
    }

    console.log("📸 Starting image analysis with validated data:", {
      sessionId,
      imageData: {
        uri: selectedImageData.uri,
        type: selectedImageData.type,
        name: selectedImageData.name,
        size: selectedImageData.fileSize,
      },
    });

    try {
      await submitImageAnalysis({
        imageFile: selectedImageData,
        sessionId: sessionId,
      }).unwrap();
    } catch (error) {
      console.error("❌ Image analysis failed:", error);
      // Error handling is done in useEffect above
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

        {/* Error Display */}
        {(imageError || mutationError) && (
          <View className="bg-error-100 border border-error-300 rounded-xl p-4 mb-4">
            <Text className="text-error-700 text-center">
              {imageError || mutationError?.message}
            </Text>
          </View>
        )}

        <View className="mt-4">
          {!selectedImage ? (
            <SemiFlatButton
              text="Upload Photo"
              icon="cloud-upload-outline"
              onPress={handleUploadPhoto}
            />
          ) : null}

          <NextButton
            text={isLoading ? "Analyzing..." : "Analyze Face"}
            icon={isLoading ? "hourglass-outline" : "scan-outline"}
            onPress={handleContinuePress}
            disabled={isLoading || !selectedImage}
          />
        </View>

        {/* Debug Info (remove in production) */}
        {/* {__DEV__ && (
          <View className="mt-4 p-4 bg-gray-100 rounded-xl">
            <Text className="text-sm text-gray-600">Debug Info:</Text>
            <Text className="text-sm text-gray-600">
              Session ID: {sessionId || "Not found"}
            </Text>
            {selectedImage && (
              <Text className="text-sm text-gray-600">Image Selected: ✓</Text>
            )}
            {selectedImageData && (
              <>
                <Text className="text-sm text-gray-600">
                  File Name: {selectedImageData.name}
                </Text>
                <Text className="text-sm text-gray-600">
                  File Type: {selectedImageData.type}
                </Text>
                <Text className="text-sm text-gray-600">
                  File Size:{" "}
                  {selectedImageData.fileSize
                    ? Math.round(selectedImageData.fileSize / 1024) + " KB"
                    : "Unknown"}
                </Text>
              </>
            )}
          </View>
        )} */}
      </View>
    </ScrollView>
  );
};

export default ScanFaceScreen;
