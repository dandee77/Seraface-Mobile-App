import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

export default function SegmentedControl({
  options = [
    { label: "Morning", icon: "sunny" },
    { label: "Evening", icon: "moon" },
  ],
  selectedIndex = 0,
  onChange,
  containerStyle = {},
}) {
  return (
    <View className="my-4">
      <View
        className="flex-row bg-gray-100 rounded-xl p-1 mx-4"
        style={containerStyle}
      >
        {options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isDisabled = option.disabled;

          return (
            <TouchableOpacity
              key={index}
              className={`flex-1 py-3 px-2 rounded-lg mx-0.5 ${
                isSelected ? "bg-white shadow-sm" : "bg-transparent"
              }`}
              onPress={() => !isDisabled && onChange && onChange(index)}
              activeOpacity={isDisabled ? 1 : 0.7}
              disabled={isDisabled}
              style={{
                opacity: isDisabled ? 0.4 : 1,
                shadowColor: isSelected ? "#000" : "transparent",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: isSelected ? 0.1 : 0,
                shadowRadius: isSelected ? 2 : 0,
                elevation: isSelected ? 2 : 0,
              }}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons
                  name={isSelected ? option.icon : `${option.icon}-outline`}
                  size={18}
                  color={
                    isSelected
                      ? index === 0
                        ? Colors.morningIcon
                        : index === 1
                          ? Colors.eveningIcon
                          : Colors.primary600
                      : Colors.inactiveIcon
                  }
                  style={{ marginRight: 4 }}
                />
                <Text
                  className={`text-center ${
                    isSelected
                      ? "text-textPrimary font-semibold"
                      : "text-textSecondary font-medium"
                  }`}
                  style={{ fontSize: 14 }}
                  numberOfLines={1}
                >
                  {option.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
