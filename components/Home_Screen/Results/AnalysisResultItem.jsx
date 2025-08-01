import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import AnalysisDetailItem from "./AnalysisDetailItem";

export default function AnalysisResultItem({ title, description, details }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="mb-6">
      <View className="flex-row">
        <Text className="text-black text-lg font-bold mr-2">•</Text>
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <Text className="text-black font-bold text-base mb-1">{title}</Text>
            {details && (
              <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={expanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color={Colors.primary500}
                />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-textSecondary">{description}</Text>

          {expanded && details && (
            <View className="mt-3 pl-2 border-l-2 border-l-primary-200">
              {details.map((detail, index) => (
                <AnalysisDetailItem key={index} detail={detail} />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
