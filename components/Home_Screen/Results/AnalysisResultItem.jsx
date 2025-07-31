import { View, Text } from "react-native";
import React from "react";

export default function AnalysisResultItem({ title, description }) {
  return (
    <View className="flex-row mb-6">
      <Text className="text-black text-lg font-bold mr-2">•</Text>
      <View className="flex-1">
        <Text className="text-black font-bold text-base mb-1">{title}</Text>
        <Text className="text-textSecondary">{description}</Text>
      </View>
    </View>
  );
}
