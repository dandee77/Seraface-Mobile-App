import { View, Text } from "react-native";
import React from "react";
import { GradientView } from "../../UI_Common/Gradients/GradientView";

export default function AnalysisDetailItem({ detail }) {
  const { label, value, locations, description } = detail;

  // Helper function to capitalize first letter
  const capitalize = (str) => {
    if (!str || typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Helper function to process locations - handle both string and array
  const processLocations = (locations) => {
    if (!locations) return [];

    // If it's already an array, return it
    if (Array.isArray(locations)) {
      return locations.filter((loc) => loc && loc.trim() !== "");
    }

    // If it's a string, split by comma and clean up
    if (typeof locations === "string") {
      return locations
        .split(",")
        .map((loc) => loc.trim())
        .filter((loc) => loc !== "");
    }

    return [];
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

  const processedLocations = processLocations(locations);

  return (
    <View className="mb-2">
      <View className="flex-row justify-between">
        <Text className="text-textSecondary text-sm">{label}:</Text>
        <Text className={`font-medium text-sm ${getValueColor()}`}>
          {typeof value === "string" ? capitalize(value) : value}
        </Text>
      </View>

      {/* Display locations only if they exist and have content */}
      {processedLocations.length > 0 && (
        <View className="flex-row flex-wrap mt-1">
          {processedLocations.map((location, idx) => (
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
