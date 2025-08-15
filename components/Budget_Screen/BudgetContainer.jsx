import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import Colors from "../../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Gradients } from "../../constants/gradients";

const MIN_BUDGET = 50;
const MAX_BUDGET = 800;

export default function BudgetContainer({
  budget,
  onBudgetChange,
  spentAmount = 0,
}) {
  // Use local state to track the input value as a string
  const [inputValue, setInputValue] = useState(budget.toString());

  // Update local input value when budget prop changes
  useEffect(() => {
    setInputValue(budget.toString());
  }, [budget]);

  const handleBudgetChange = (value) => {
    // Always update the input field to show what the user is typing
    setInputValue(value);

    // Only proceed if the input is a valid number format
    if (/^\d*\.?\d*$/.test(value)) {
      if (value === "") return;

      let newBudget = Math.round(parseFloat(value));

      if (!isNaN(newBudget)) {
        onBudgetChange(newBudget); // Let parent decide what to do
      }
    }
  };

  // Handle blur event to ensure final value is valid
  const handleBlur = () => {
    let finalBudget = parseFloat(inputValue);

    if (isNaN(finalBudget)) {
      finalBudget = Math.max(MIN_BUDGET, spentAmount);
    } else {
      finalBudget = Math.round(finalBudget);
      finalBudget = Math.max(Math.max(MIN_BUDGET, spentAmount), finalBudget);
      finalBudget = Math.min(finalBudget, MAX_BUDGET);
    }

    setInputValue(finalBudget.toString());
    onBudgetChange(finalBudget);
  };

  // Calculate percentage based on spent amount or minimum budget
  const gradientPercentage =
    ((Math.max(spentAmount, MIN_BUDGET) - MIN_BUDGET) /
      (MAX_BUDGET - MIN_BUDGET)) *
    100;

  // For the actual budget value
  const budgetPercentage =
    ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  return (
    <View className="bg-white rounded-2xl px-5 py-4 my-2 shadow-sm">
      <View className="flex-row items-center gap-3 mb-4">
        <View className="bg-success-500 w-12 h-12 rounded-full items-center justify-center">
          <Text className="text-textLight text-3xl">₱</Text>
        </View>
        <View>
          <Text className="font-bold text-lg">Adjust Your Budget</Text>
          <Text className="text-textSecondary text-sm">
            Set your monthly limit
          </Text>
        </View>
      </View>

      <View className="bg-gray-50 rounded-xl p-4 mb-4">
        <Text className="text-textSecondary text-sm mb-3">
          Monthly skincare budget
        </Text>
        <View className="flex-row items-center justify-center">
          <Text className="font-bold text-success-500 text-xl mr-1">₱</Text>
          <TextInput
            className="border border-gray-300 bg-white rounded-lg py-2 px-3 text-center font-bold text-success-500 text-lg"
            style={{
              width: 100,
              minWidth: 80,
              maxWidth: 120,
            }}
            keyboardType="numeric"
            value={inputValue}
            onChangeText={handleBudgetChange}
            onBlur={handleBlur}
            placeholder={MIN_BUDGET.toString()}
            placeholderTextColor={Colors.textTertiary}
            selectTextOnFocus={true}
          />
        </View>
      </View>

      <View className="flex-row justify-between mt-1">
        <View className="flex-row items-center">
          <Text className="text-textSecondary text-sm">Min: ₱{MIN_BUDGET}</Text>
          {spentAmount > MIN_BUDGET && (
            <Text className="text-success-500 text-xs ml-2">
              (₱{spentAmount} spent)
            </Text>
          )}
        </View>
        <Text className="text-textSecondary text-sm">Max: ₱{budget}</Text>
      </View>
    </View>
  );
}
