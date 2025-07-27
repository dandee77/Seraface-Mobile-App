import React from "react";
import { View } from "react-native";
import { GradientText } from "../Gradients/GradientText";
import { GradientIcon } from "../Gradients/GradientIcon";

export const GradientHeaderTitle = ({ title, iconName }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {iconName && (
        <GradientIcon
          name={iconName}
          size={24}
          preset="purpleToPink"
          style={{ marginRight: 8 }}
        />
      )}
      <GradientText
        text={title}
        preset="purpleToPink"
        style={{ fontSize: 18 }}
      />
    </View>
  );
};
