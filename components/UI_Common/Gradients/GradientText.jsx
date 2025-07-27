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
  adjustsFontSizeToFit = false,
}) => {
  const gradientPreset = preset || (focused ? "purpleToPink" : "lightPurple");

  const estimatedWidth = Math.max(text.length * 9, 40);

  return (
    <View style={{ height: 24, minWidth: 500 }}>
      <MaskedView
        style={{ height: 24, minWidth: 500 }}
        maskElement={
          <View className="flex-1 bg-transparent ">
            <Text
              className="font-bold"
              style={[{ fontSize: 18 }, style]}
              adjustsFontSizeToFit={adjustsFontSizeToFit}
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
