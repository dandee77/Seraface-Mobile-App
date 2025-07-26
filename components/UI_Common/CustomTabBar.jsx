import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientView } from "../GradientView";

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View className="flex-row border-t border-gray-200">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Define icon based on route name
        let iconName;
        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home-outline";
        } else if (route.name === "Products") {
          iconName = isFocused ? "cube" : "cube-outline";
        } else if (route.name === "Routine") {
          iconName = isFocused ? "time" : "time-outline";
        } else if (route.name === "Budget") {
          iconName = isFocused ? "wallet" : "wallet-outline";
        }

        // Active tab shows a purple indicator
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            className="flex-1 items-center pt-2 pb-3"
          >
            {isFocused && (
              <View className="absolute top-0 w-10 h-0.5 rounded-full bg-primary-600" />
            )}
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#9c4dff" : "#909090"}
            />
            <Text
              className={`text-xs mt-1 ${
                isFocused ? "text-primary-600" : "text-gray-500"
              }`}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
