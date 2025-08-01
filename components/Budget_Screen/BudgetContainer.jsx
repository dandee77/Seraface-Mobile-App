import { View, Text } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients } from "../../constants/gradients";

const MIN_BUDGET = 50;
const MAX_BUDGET = 300;

export default function BudgetContainer({ budget, onBudgetChange }) {
  const handleValueChange = (value) => {
    const newBudget = Math.round(value);
    onBudgetChange(newBudget);
  };

  const gradientPercentage =
    ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  return (
    <View className="bg-white rounded-2xl px-5 py-4 my-2 shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center gap-3">
          <View className="bg-success-500 w-12 h-12 rounded-full items-center justify-center">
            <Text className="text-textLight text-3xl">₱</Text>
          </View>
          <View>
            <Text className="font-bold text-lg">Your Budget</Text>
            <Text className="text-textSecondary text-sm">
              Set your monthly limit
            </Text>
          </View>
        </View>
        <Text className="text-success500 text-xl font-semibold">₱{budget}</Text>
      </View>

      <View className="my-6 relative">
        <View className="absolute left-0 right-0 h-2 bg-gray-100 rounded-full" />

        <View
          className="absolute left-0 h-2 rounded-full overflow-hidden"
          style={{ width: `${gradientPercentage}%` }}
        >
          <LinearGradient
            colors={Gradients.purpleToPink3}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ width: "100%", height: "100%" }}
          />
        </View>

        <Slider
          style={{ width: "100%", height: 1, marginTop: 3 }}
          minimumValue={MIN_BUDGET}
          maximumValue={MAX_BUDGET}
          value={budget}
          onValueChange={handleValueChange}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor={Colors.primary600}
          step={1}
        />
      </View>

      <View className="flex-row justify-between">
        <Text className="text-textSecondary text-sm">₱{MIN_BUDGET}</Text>
        <Text className="text-textSecondary text-sm">₱{MAX_BUDGET}</Text>
      </View>
    </View>
  );
}
