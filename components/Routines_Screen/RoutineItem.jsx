import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GradientView } from "../UI_Common/Gradients/GradientView";
import { GradientText } from "../UI_Common/Gradients/GradientText";
import Colors from "../../constants/colors";

export default function RoutineItem({
  id,
  title,
  subtitle,
  description,
  duration,
  waiting_time,
  instructions,
  days,
  time,
  showDetails,
}) {
  const [expanded, setExpanded] = useState(showDetails || false);

  // Format duration in minutes to readable time
  const formatDuration = (minutes) => {
    if (!minutes || minutes === 0) return "0 mins";

    if (minutes < 60) {
      return `${minutes} min${minutes !== 1 ? "s" : ""}`;
    } else {
      const hours = Math.floor(minutes / 60);
      const remainingMins = minutes % 60;
      return `${hours} hr${hours !== 1 ? "s" : ""}${remainingMins > 0 ? ` ${remainingMins} min${remainingMins !== 1 ? "s" : ""}` : ""}`;
    }
  };

  // Format waiting time (in seconds) to readable time
  const formatWaitingTime = (seconds) => {
    if (!seconds || seconds === 0) return "No waiting time";

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    } else if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      return `${mins} minute${mins !== 1 ? "s" : ""}`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""}`;
    }
  };

  // Format days of the week
  const formatDays = (daysObj) => {
    if (!daysObj) return "Every day";

    const activeDays = Object.entries(daysObj)
      .filter(([_, isActive]) => isActive)
      .map(
        ([day]) => day.charAt(0).toUpperCase() + day.slice(1).substring(0, 2)
      );

    if (activeDays.length === 7) return "Every day";
    if (activeDays.length === 0) return "No days selected";

    return activeDays.join(", ");
  };

  // Format time of day
  const formatTime = (timeArray) => {
    if (!timeArray || timeArray.length === 0) return "No time specified";

    return timeArray
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
      .join(", ");
  };

  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      className={`bg-white rounded-2xl mb-4 overflow-hidden shadow-sm border ${
        expanded ? "border-primary-300" : "border-transparent"
      }`}
    >
      <View className="p-4">
        {/* Header with title and duration */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="font-bold text-lg text-primary-800">{title}</Text>
            <Text className="text-sm text-primary-600 mt-1">{subtitle}</Text>
          </View>
          <GradientView
            preset="lightPurple"
            className="px-3 py-1 rounded-full ml-2"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="time-outline"
                size={14}
                color={Colors.textLight}
              />
              <Text className="text-xs text-textLight ml-1">
                {formatDuration(duration)}
              </Text>
            </View>
          </GradientView>
        </View>

        {/* Brief Description */}
        <Text
          className="text-textSecondary mt-2"
          numberOfLines={expanded ? 0 : 2}
        >
          {description}
        </Text>

        {/* Schedule Preview */}
        {!expanded && (days || time) && (
          <View className="mt-3 flex-row flex-wrap">
            <View className="flex-row items-center mr-4">
              <Ionicons
                name="calendar-outline"
                size={14}
                color={Colors.textSecondary}
              />
              <Text className="text-xs text-textSecondary ml-1">
                {formatDays(days)}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons
                name="sunny-outline"
                size={14}
                color={Colors.textSecondary}
              />
              <Text className="text-xs text-textSecondary ml-1">
                {formatTime(time)}
              </Text>
            </View>
          </View>
        )}

        {/* Expanded Details */}
        {expanded && (
          <View className="mt-4">
            {/* Detailed Schedule */}
            <View className="bg-gray-50 p-3 rounded-xl mb-3">
              <Text className="font-semibold mb-2">Schedule:</Text>
              <View className="flex-row flex-wrap">
                <View className="flex-row items-center mr-4 mb-2">
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color={Colors.primary600}
                  />
                  <Text className="text-sm text-textSecondary ml-1">
                    {formatDays(days)}
                  </Text>
                </View>
                <View className="flex-row items-center mb-2">
                  <Ionicons
                    name="sunny-outline"
                    size={14}
                    color={Colors.primary600}
                  />
                  <Text className="text-sm text-textSecondary ml-1">
                    {formatTime(time)}
                  </Text>
                </View>
                {waiting_time > 0 && (
                  <View className="flex-row items-center w-full mt-1">
                    <Ionicons
                      name="hourglass-outline"
                      size={14}
                      color={Colors.primary600}
                    />
                    <Text className="text-sm text-textSecondary ml-1">
                      Repeat every {formatWaitingTime(waiting_time)}
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* Instructions */}
            {instructions && instructions.length > 0 && (
              <View className="mb-2">
                <Text className="font-semibold mb-2">Instructions:</Text>
                {instructions.map((instruction, index) => (
                  <View key={index} className="flex-row mb-2">
                    <Text className="text-primary-600 mr-2">{index + 1}.</Text>
                    <Text className="text-textSecondary flex-1">
                      {instruction}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Expand/Collapse Indicator */}
            <View className="items-center mt-2">
              <Text className="text-primary-500 text-xs font-medium">
                Tap to collapse
              </Text>
            </View>
          </View>
        )}

        {/* Expand/Collapse Indicator */}
        {!expanded && (
          <View className="items-center mt-2">
            <Ionicons name="chevron-down" size={16} color={Colors.primary400} />
          </View>
        )}
      </View>
    </Pressable>
  );
}
