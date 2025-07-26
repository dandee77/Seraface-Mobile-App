import { View, Text, Pressable } from "react-native";
import React from "react";
import { GradientView } from "../../GradientView";
import { Ionicons } from "@expo/vector-icons";

export default function NextButton({ text, icon }) {
  return (
    <GradientView>
      <Pressable>
        <View className="flex-row">
          <Text>{text}</Text>
          <Ionicons name={icon} />
        </View>
      </Pressable>
    </GradientView>
  );
}
