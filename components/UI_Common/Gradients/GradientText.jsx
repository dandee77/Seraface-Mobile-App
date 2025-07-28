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
  numberOfLines,
  centerText = false,
}) => {
  const gradientPreset =
    preset || (focused ? (preset ? preset : "purpleToPink") : "lightPurple");

  const fontSize = style?.fontSize || 18;
  const estimatedWidth = Math.max(text.length * 9, 40);

  const containerClasses = centerText
    ? "items-center justify-center"
    : "items-start justify-center";
  const textClasses = centerText
    ? "font-bold text-center"
    : "font-bold text-left";
  const textContainerClasses = centerText
    ? "flex-1 bg-transparent items-center justify-center w-full"
    : "flex-1 bg-transparent items-start justify-center w-full";

  return (
    <View
      className={containerClasses}
      style={{ height: fontSize * 1.25, width: estimatedWidth * 1.5 }}
    >
      <MaskedView
        className="overflow-hidden"
        style={{ height: fontSize * 1.25, width: estimatedWidth * 1.65 }}
        maskElement={
          <View className={textContainerClasses}>
            <Text
              className={textClasses}
              style={[{ fontSize }, style]}
              numberOfLines={numberOfLines}
            >
              {text}
            </Text>
          </View>
        }
      >
        <GradientView
          preset={gradientPreset}
          direction={direction}
          className="absolute inset-0 w-full h-full"
        />
      </MaskedView>
    </View>
  );
};
