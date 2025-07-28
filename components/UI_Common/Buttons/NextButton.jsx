import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { GradientView } from "../Gradients/GradientView";

export default function NextButton({ text, icon, onPress }) {
  return (
    <Pressable onPress={onPress}>
      <View>
        <GradientView preset="purpleToPink3" style={{ borderRadius: 12 }}>
          <View className="flex-row justify-center items-center gap-3 p-4 ">
            <Text className="font-semibold text-textLight text-lg">{text}</Text>
            <Ionicons name={icon} color={"white"} size={20} />
          </View>
        </GradientView>
      </View>
    </Pressable>
  );
}
