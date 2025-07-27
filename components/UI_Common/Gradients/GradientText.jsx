import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { GradientView } from "../Gradients/GradientView";

export const GradientText = ({
  text,
  style,
  preset,
  direction = "leftToRight",
  focused = false,
  size = 14,
}) => {
  const gradientPreset = preset || (focused ? "purpleToPink" : "lightPurple");

  return (
    <MaskedView
      style={{ flexShrink: 1 }}
      maskElement={
        <Text
          style={[
            {
              fontWeight: "bold",
            },
            style,
            { fontSize: size },
          ]}
        >
          {text}
        </Text>
      }
    >
      <GradientView
        preset={gradientPreset}
        direction={direction}
        className="flex-1"
      />
    </MaskedView>
  );
};
