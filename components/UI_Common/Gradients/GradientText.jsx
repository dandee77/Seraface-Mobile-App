import React from "react";
import { Text, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { GradientView } from "./GradientView";

export const GradientText = ({
  text,
  style,
  preset,
  direction = "leftToRight",
  focused = false,
  size = 14,
}) => {
  const gradientPreset = preset || (focused ? "purpleToPink" : "lightPurple");
  const estimatedWidth = Math.max(text.length * size * 0.7, 40);

  const viewHeight = size * 1.5;

  return (
    <View
      className="items-center justify-center"
      style={{ height: viewHeight, minWidth: estimatedWidth }}
    >
      <MaskedView
        style={{ height: viewHeight, minWidth: estimatedWidth }}
        maskElement={
          <View className="flex-1 bg-transparent items-center justify-center">
            <Text
              className="font-bold text-center"
              style={[{ fontSize: size, paddingTop: 2 }, style]}
              numberOfLines={1}
            >
              {text}
            </Text>
          </View>
        }
      >
        <GradientView
          preset={gradientPreset}
          direction={direction}
          className="flex-1"
        />
      </MaskedView>
    </View>
  );
};
