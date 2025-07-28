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
  const gradientPreset = preset || (focused ? "purpleToPink" : "lightPurple");

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
      style={{ height: 24, width: estimatedWidth }}
    >
      <MaskedView
        className="overflow-hidden"
        style={{ height: 24, width: estimatedWidth * 1.21 }}
        maskElement={
          <View className={textContainerClasses}>
            <Text
              className={textClasses}
              style={[{ fontSize: 18 }, style]}
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
