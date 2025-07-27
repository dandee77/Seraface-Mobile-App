import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function NextButton({ text, icon }) {
  return (
    <Pressable>
      <View className="flex-row">
        <Text>{text}</Text>
        <Ionicons name={icon} />
      </View>
    </Pressable>
  );
}
