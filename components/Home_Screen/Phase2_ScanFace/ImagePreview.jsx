import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { GradientView } from "../../UI_Common/Gradients/GradientView";
import Colors from "../../../constants/colors";

export default function ImagePreview({ onImageSelect }) {
  const [pickedImage, setPickedImage] = useState(null);

  // Request permission and open image picker
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
      base64: false, // We don't need base64 for multipart upload
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];

      // Extract file extension from URI
      const uriParts = selectedAsset.uri.split(".");
      const fileExtension = uriParts[uriParts.length - 1].toLowerCase();

      // Determine MIME type
      let mimeType = "image/jpeg";
      if (fileExtension === "png") {
        mimeType = "image/png";
      } else if (fileExtension === "jpg" || fileExtension === "jpeg") {
        mimeType = "image/jpeg";
      }

      // WEB ONLY: Create proper image data structure and File object
      const imageData = {
        uri: selectedAsset.uri,
        type: mimeType,
        name: `face_image_${Date.now()}.${fileExtension}`,
        width: selectedAsset.width,
        height: selectedAsset.height,
        fileSize: selectedAsset.fileSize || selectedAsset.size,
      };

      // For web, always fetch the blob and create a File object
      console.log("📸 Creating File object for web upload...");
      try {
        const response = await fetch(selectedAsset.uri);
        const blob = await response.blob();
        const file = new File([blob], imageData.name, { type: mimeType });
        imageData.file = file; // Add the File object for web

        console.log("📸 ✅ File object created successfully:", {
          name: file.name,
          type: file.type,
          size: file.size,
          instanceof: file instanceof File,
        });
      } catch (error) {
        console.error("📸 ❌ Error creating File object:", error);
        alert("Error preparing image for upload. Please try again.");
        return;
      }

      console.log("📸 Final image data:", {
        hasUri: !!imageData.uri,
        hasFile: !!imageData.file,
        fileName: imageData.name,
        fileType: imageData.type,
        sizeInKB: imageData.fileSize
          ? Math.round(imageData.fileSize / 1024)
          : "Unknown",
      });

      setPickedImage(selectedAsset.uri);
      if (onImageSelect) {
        onImageSelect(selectedAsset.uri, imageData); // Pass complete image data
      }
    } else {
      console.log("📸 Image selection cancelled");
    }
  };

  const removeImage = () => {
    console.log("📸 Removing selected image");
    setPickedImage(null);
    if (onImageSelect) {
      onImageSelect(null, null);
    }
  };

  if (pickedImage) {
    return (
      <View className="items-center justify-center my-6 px-8 rounded-xl">
        <View className="relative">
          {/* Gradient glow around image */}
          <GradientView
            direction="diagonal"
            preset="logoGradient"
            style={{ borderRadius: 12, padding: 5 }}
          >
            <View className="rounded-xl overflow-hidden">
              <Image
                source={{ uri: pickedImage }}
                className="w-[300px] h-[300px]"
                resizeMode="cover"
              />
            </View>
          </GradientView>

          {/* Close button */}
          <TouchableOpacity
            onPress={removeImage}
            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
          >
            <Ionicons name="close" size={24} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Image info */}
        <Text className="text-center text-textSecondary mt-3 text-sm">
          Photo ready for analysis
        </Text>
      </View>
    );
  }

  return (
    <View className="items-center justify-center my-6 px-8">
      <TouchableOpacity
        onPress={pickImage}
        className="border-2 border-dashed border-primary-300 rounded-xl w-full py-12 px-4 items-center justify-center bg-white/70 gap-2"
      >
        <GradientView
          preset="lightPurple"
          className="rounded-full p-8 mb-2 mt-8"
          style={{ borderRadius: 50 }}
        >
          <Ionicons name="camera-outline" size={42} color={Colors.textLight} />
        </GradientView>

        <Text className="text-center text-textSecondary mb-12">
          Upload a clear photo of your face{"\n"}for AI analysis
        </Text>
      </TouchableOpacity>
    </View>
  );
}
