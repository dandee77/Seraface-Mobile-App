import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";

export default function SemiFlatButton({ text, icon, onPress }) {
  return (
    <View className="mt-4 overflow-hidden rounded-xl border border-primary-300 bg-white">
      <Pressable
        onPress={onPress}
        android_ripple={{ color: Colors.primary100 }}
      >
        <View className="flex-row justify-center items-center gap-3 p-4">
          <Ionicons name={icon} color={Colors.primary600} size={20} />
          <Text className="font-semibold text-primary-600 text-lg">{text}</Text>
        </View>
      </Pressable>
    </View>
  );
}
