import { View, Text } from "react-native";
import React from "react";
import { GradientView } from "../../UI_Common/Gradients/GradientView";

export default function AnalysisDetailItem({ detail }) {
  const { label, value, locations, description } = detail;

  // Helper function to capitalize first letter
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Determine value color based on content
  const getValueColor = () => {
    if (
      value === "mild" ||
      value === "low" ||
      value === "no" ||
      value === "Not present"
    )
      return "text-success-600";
    if (value === "medium" || value === "average" || value === "uncertain")
      return "text-primary-600";
    if (
      value === "high" ||
      value === "severe" ||
      value === "yes" ||
      value === "Present"
    )
      return "text-error-600";
    return "text-textPrimary";
  };

  return (
    <View className="mb-2">
      <View className="flex-row justify-between">
        <Text className="text-textSecondary text-sm">{label}:</Text>
        <Text className={`font-medium text-sm ${getValueColor()}`}>
          {typeof value === "string" ? capitalize(value) : value}
        </Text>
      </View>

      {locations && locations.length > 0 && (
        <View className="flex-row flex-wrap mt-1">
          {locations.map((location, idx) => (
            <View key={idx} className="mr-1 mb-1 overflow-hidden rounded-full">
              <GradientView preset="lightPurple" className="rounded-full">
                <Text className="text-textLight text-xs py-1 px-2">
                  {capitalize(location)}
                </Text>
              </GradientView>
            </View>
          ))}
        </View>
      )}

      {description && (
        <Text className="text-textTertiary text-xs mt-1 italic">
          {description}
        </Text>
      )}
    </View>
  );
}
