import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
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
  const translateX = useRef(new Animated.Value(0)).current;
  const tabWidth = (Dimensions.get("window").width - 64) / options.length;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: selectedIndex * tabWidth,
      damping: 15,
      mass: 1,
      stiffness: 150,
      overshootClamping: false,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <View className="my-3 relative">
      <View
        className="bg-gray-50 rounded-xl border border-gray-200 p-[3px] flex-row relative"
        style={containerStyle}
      >
        <Animated.View
          className="absolute bg-white rounded-lg shadow-sm"
          style={{
            width: `${100 / options.length}%`,
            height: "100%",
            transform: [{ translateX }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
            top: 3,
            bottom: 3,
            left: 0,
          }}
        />

        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className="flex-1 py-2 flex-row items-center justify-center z-10"
            onPress={() => onChange && onChange(index)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={
                selectedIndex === index ? option.icon : `${option.icon}-outline`
              }
              size={20}
              color={
                selectedIndex === index
                  ? selectedIndex === 0
                    ? Colors.morningIcon
                    : Colors.eveningIcon
                  : Colors.inactiveIcon
              }
              style={{ marginRight: 6 }}
            />
            <Text
              className={
                selectedIndex === index
                  ? "text-textPrimary font-medium text-[15px]"
                  : "text-textTertiary font-normal text-[15px]"
              }
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
