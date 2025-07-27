import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { GradientView } from "../Gradients/GradientView";

export const GradientIcon = ({
  name,
  size = 24,
  focused = false,
  preset,
  style,
}) => {
  const gradientPreset = preset || (focused ? "purpleToPink" : "lightPurple");

  return (
    <MaskedView
      style={[{ width: size, height: size }, style]}
      maskElement={
        <View className="bg-transparent">
          <Ionicons name={name} size={size} color="white" />
        </View>
      }
    >
      <GradientView preset={gradientPreset} className="flex-1" />
    </MaskedView>
  );
};
