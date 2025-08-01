import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { GradientView } from "../../UI_Common/Gradients/GradientView";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";

export default function ProductExperienceInput({ onAddExperience }) {
  const [product, setProduct] = useState("");
  const [experience, setExperience] = useState("neutral"); // positive, negative, neutral
  const [reason, setReason] = useState("");

  const handleAddExperience = () => {
    if (product.trim() !== "" && reason.trim() !== "") {
      onAddExperience({
        product: product.trim(),
        experience,
        reason: reason.trim(),
      });
      // Reset form
      setProduct("");
      setExperience("neutral");
      setReason("");
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 border border-gray-200">
      <TextInput
        className="border border-gray-200 bg-white rounded-xl py-2 px-3 mb-3"
        placeholder="Product name"
        value={product}
        onChangeText={setProduct}
      />

      <View className="flex-row justify-between mb-3">
        <TouchableOpacity
          onPress={() => setExperience("positive")}
          className={`flex-1 mr-2 py-2 rounded-xl items-center ${
            experience === "positive"
              ? "bg-success-100 border border-success-300"
              : "bg-gray-100"
          }`}
        >
          <Text
            className={
              experience === "positive" ? "text-success-700" : "text-gray-500"
            }
          >
            Positive
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setExperience("neutral")}
          className={`flex-1 mx-1 py-2 rounded-xl items-center ${
            experience === "neutral"
              ? "bg-primary-100 border border-primary-300"
              : "bg-gray-100"
          }`}
        >
          <Text
            className={
              experience === "neutral" ? "text-primary-700" : "text-gray-500"
            }
          >
            Neutral
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setExperience("negative")}
          className={`flex-1 ml-2 py-2 rounded-xl items-center ${
            experience === "negative"
              ? "bg-error-100 border border-error-300"
              : "bg-gray-100"
          }`}
        >
          <Text
            className={
              experience === "negative" ? "text-error-700" : "text-gray-500"
            }
          >
            Negative
          </Text>
        </TouchableOpacity>
      </View>

      <TextInput
        className="border border-gray-200 bg-white rounded-xl py-2 px-3 mb-3"
        placeholder="Reason for your experience"
        value={reason}
        onChangeText={setReason}
        multiline
        numberOfLines={2}
      />

      <TouchableOpacity
        onPress={handleAddExperience}
        disabled={!product.trim() || !reason.trim()}
        className="overflow-hidden rounded-xl h-[46px]"
      >
        <GradientView
          preset="purpleToPink3"
          className={`rounded-xl h-full w-full items-center justify-center ${
            !product.trim() || !reason.trim() ? "opacity-50" : ""
          }`}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="add" size={20} color={Colors.textLight} />
            <Text className="text-textLight ml-2">Add Experience</Text>
          </View>
        </GradientView>
      </TouchableOpacity>
    </View>
  );
}
