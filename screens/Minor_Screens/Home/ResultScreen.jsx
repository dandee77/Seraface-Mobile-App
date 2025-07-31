import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { GradientText } from "../../../components/UI_Common/Gradients/GradientText";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import AnalysisResultItem from "../../../components/Home_Screen/Results/AnalysisResultItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ResultScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const imageUri = route.params?.imageUri;

  // Sample analysis results - in a real app, these would come from your AI analysis
  const analysisResults = [
    {
      id: 1,
      title: "You have combination skin",
      description:
        "Your T-zone tends to be oily while your cheeks are normal to dry. This requires balanced care with targeted treatments for different areas.",
    },
    {
      id: 2,
      title: "Skin tone looks great!",
      description:
        "Your skin tone appears relatively even with minimal discoloration. Continue with your current brightening treatments to maintain this result.",
    },
    {
      id: 3,
      title: "Acne problems can be easily mitigated",
      description:
        "The mild acne detected can be addressed with salicylic acid or benzoyl peroxide treatments. Consistent application will show improvement within weeks.",
    },
    {
      id: 4,
      title: "You may need to focus on blackheads",
      description:
        "There's mild congestion in your pore areas, particularly across the nose. Weekly exfoliation and clay masks would be beneficial for this concern.",
    },
  ];

  const handleExportData = () => {
    // In a real app, this would handle exporting analysis data
    console.log("Exporting face data analysis");
  };

  const handleViewRecommendations = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingBottom: Math.max(insets.bottom, 20),
      }}
    >
      <View className="px-8 py-6">
        {/* Title Section */}
        <View className="items-center mb-4">
          <GradientText
            text="Face Analysis Completed"
            preset="purpleToPink"
            style={{ fontSize: 28 }}
            centerText={true}
          />

          <Text className="text-center text-textSecondary mt-3 mb-6">
            Based on your given skin parameters and face analysis, here is what
            we've found:
          </Text>
        </View>

        {/* Analysis Results Container */}
        <View className="bg-white p-6 rounded-3xl mb-6">
          {analysisResults.map((item) => (
            <AnalysisResultItem
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))}
        </View>

        {/* Buttons */}
        <View className="mt-2">
          <NextButton
            text="Export Face Data"
            icon="download-outline"
            onPress={handleExportData}
          />

          <NextButton
            text="Home"
            icon="arrow-forward-outline"
            onPress={handleViewRecommendations}
          />
        </View>
      </View>
    </ScrollView>
  );
}
