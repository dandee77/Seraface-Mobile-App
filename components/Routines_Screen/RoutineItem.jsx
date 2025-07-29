import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GradientView } from "../UI_Common/Gradients/GradientView";
import Colors from "../../constants/colors";

export default function RoutineItem({
  id,
  title,
  subtitle,
  description,
  duration,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function handleToggle() {
    setIsOpen((prev) => !prev);
  }
  return (
    <Pressable onPress={handleToggle}>
      <View className="flex-col bg-background my-3 rounded-xl">
        <View className="flex-row p-4 justify-between ">
          <View className="flex-row gap-3 items-center">
            <GradientView
              preset="logoGradient"
              direction="topToBottom"
              className="items-center justify-center rounded-full"
              style={{ width: 36, height: 36, borderRadius: 20 }}
            >
              <Text className="text-textLight font-bold text-md">{id}</Text>
            </GradientView>

            <View className="flex-col gap-0 ">
              <Text className="font-semibold text-md ">{title}</Text>
              <Text className="text-textSecondary text-xs">{subtitle}</Text>
            </View>
          </View>

          <View className="flex-row gap-3 items-center">
            <View className="flex-row items-center gap-1">
              <Ionicons
                name="time-outline"
                size={14}
                color={Colors.textTertiary}
              />
              <Text className="text-textTertiary text-xs">
                {duration} seconds
              </Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons
                name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
                size={22}
                color={Colors.textSecondary}
              />
            </View>
          </View>
        </View>

        {isOpen && (
          <View className="flex-row px-4 pb-3 pt-2 border-t border-gray-100 bg-background rounded-xl">
            <Text className="text-textSecondary">{description}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}
