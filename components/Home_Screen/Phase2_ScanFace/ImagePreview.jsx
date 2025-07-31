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
      mediaTypes: "images", // Fixed: Changed from MediaTypeOptions.Images to string 'images'
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setPickedImage(result.assets[0].uri);
      if (onImageSelect) {
        onImageSelect(result.assets[0].uri);
      }
    }
  };

  const removeImage = () => {
    setPickedImage(null);
    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  if (pickedImage) {
    return (
      <View className="items-center justify-center my-6 px-8 rounded-xl">
        <View className="relative">
          {/* Gradient glow around image */}

          <GradientView
            direction="diagonal"
            preset="purpleToPink3"
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

        <Text className="text-center text-textSecondary  mb-12">
          Upload a clear photo of your face{"\n"}for AI analysis
        </Text>
      </TouchableOpacity>
    </View>
  );
}
