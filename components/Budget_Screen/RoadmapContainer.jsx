import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import Colors from "../../constants/colors";

export default function RoadmapContainer({ spentAmount, budget }) {
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    const percentage = Math.min(spentAmount / budget, 1);

    progressWidth.value = withTiming(percentage, {
      duration: 600,
      easing: Easing.in(Easing.quad),
    });
  }, [spentAmount, budget]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value * 100}%`,
    };
  });

  return (
    <View className="bg-white rounded-2xl p-4 my-2 shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="font-bold text-lg">Recommended Roadmap</Text>
        <View className="flex-row gap-2">
          <Text className="text-success-500 font-medium">
            ${spentAmount.toFixed(2)}
          </Text>
          <Text>/ ${budget}</Text>
        </View>
      </View>

      <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <Reanimated.View
          className="h-full bg-success-500 rounded-full"
          style={progressStyle}
        />
      </View>
    </View>
  );
}
