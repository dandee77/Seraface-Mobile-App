import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { GradientText } from "../../../components/UI_Common/Gradients/GradientText";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import AnalysisResultItem from "../../../components/Home_Screen/Results/AnalysisResultItem";
import AnalysisDetailItem from "../../../components/Home_Screen/Results/AnalysisDetailItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ResultScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const imageUri = route.params?.imageUri;

  // Hardcoded analysis results from the AI response
  const [analysisData] = useState({
    session_id: "130810ec-9810-498b-91d4-154fe4006831",
    status: "success",
    message: "Image analysis completed and saved successfully",
    next_phase: "Product recommendations",
    analysis: {
      message: "Face done analyzing",
      ai_output: {
        redness_irritation: "mild",
        acne_breakouts: {
          severity: "mild",
          count_estimate: 3,
          location: ["forehead", "cheeks"],
        },
        blackheads_whiteheads: {
          presence: true,
          location: ["nose", "cheeks"],
        },
        oiliness_shine: {
          level: "medium",
          location: ["forehead", "nose"],
        },
        dryness_flaking: {
          presence: false,
          location: [],
        },
        uneven_skin_tone: "mild",
        dark_spots_scars: {
          presence: false,
          description: "None apparent",
        },
        pores_size: {
          level: "medium",
          location: ["nose", "cheeks"],
        },
        hormonal_acne_signs: "uncertain",
        stress_related_flareups: "no",
        dehydrated_skin_signs: "no",
        fine_lines_wrinkles: {
          presence: false,
          areas: [],
        },
        skin_elasticity: "average",
      },
    },
  });

  // Processed analysis results for display
  const analysisResults = [
    {
      id: 1,
      title: "Skin Type Analysis",
      description:
        "Your skin shows combination characteristics with oiliness in the T-zone.",
      details: [
        {
          label: "Oiliness Level",
          value: analysisData.analysis.ai_output.oiliness_shine.level,
          locations: analysisData.analysis.ai_output.oiliness_shine.location,
        },
        {
          label: "Dryness",
          value: analysisData.analysis.ai_output.dryness_flaking.presence
            ? "Present"
            : "Not present",
          locations: [],
        },
        {
          label: "Skin Elasticity",
          value: analysisData.analysis.ai_output.skin_elasticity,
        },
      ],
    },
    {
      id: 2,
      title: "Acne & Congestion Assessment",
      description: "You have mild acne with some blackheads and whiteheads.",
      details: [
        {
          label: "Acne Severity",
          value: analysisData.analysis.ai_output.acne_breakouts.severity,
          locations: analysisData.analysis.ai_output.acne_breakouts.location,
        },
        {
          label: "Breakout Count",
          value: `${analysisData.analysis.ai_output.acne_breakouts.count_estimate} visible`,
        },
        {
          label: "Blackheads/Whiteheads",
          value: analysisData.analysis.ai_output.blackheads_whiteheads.presence
            ? "Present"
            : "Not present",
          locations:
            analysisData.analysis.ai_output.blackheads_whiteheads.location,
        },
        {
          label: "Hormonal Signs",
          value: analysisData.analysis.ai_output.hormonal_acne_signs,
        },
      ],
    },
    {
      id: 3,
      title: "Skin Tone & Texture",
      description: "Your skin shows mild uneven tone with medium pore size.",
      details: [
        {
          label: "Uneven Tone",
          value: analysisData.analysis.ai_output.uneven_skin_tone,
        },
        {
          label: "Dark Spots/Scars",
          value: analysisData.analysis.ai_output.dark_spots_scars.presence
            ? "Present"
            : "Not present",
          description:
            analysisData.analysis.ai_output.dark_spots_scars.description,
        },
        {
          label: "Pore Size",
          value: analysisData.analysis.ai_output.pores_size.level,
          locations: analysisData.analysis.ai_output.pores_size.location,
        },
      ],
    },
    {
      id: 4,
      title: "Additional Observations",
      description: "Your skin shows mild redness and no signs of dehydration.",
      details: [
        {
          label: "Redness/Irritation",
          value: analysisData.analysis.ai_output.redness_irritation,
        },
        {
          label: "Stress-Related Signs",
          value: analysisData.analysis.ai_output.stress_related_flareups,
        },
        {
          label: "Dehydration Signs",
          value: analysisData.analysis.ai_output.dehydrated_skin_signs,
        },
        {
          label: "Fine Lines/Wrinkles",
          value: analysisData.analysis.ai_output.fine_lines_wrinkles.presence
            ? "Present"
            : "Not present",
        },
      ],
    },
  ];

  const handleExportData = () => {
    // In a real app, this would handle exporting analysis data
    console.log("Exporting face data analysis", analysisData.session_id);
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
            {analysisData.analysis.message}. Here's what we've found:
          </Text>
        </View>

        {/* Analysis Results Container */}
        <View className="bg-white p-6 rounded-3xl mb-6">
          {analysisResults.map((item) => (
            <AnalysisResultItem
              key={item.id}
              title={item.title}
              description={item.description}
              details={item.details}
            />
          ))}
        </View>

        {/* Status Section */}
        <View className="bg-white p-4 rounded-xl mb-6">
          <Text className="text-textSecondary mb-1">
            Analysis Status:{" "}
            <Text className="text-success-500 font-medium">
              {analysisData.status}
            </Text>
          </Text>
          <Text className="text-textSecondary">
            Next:{" "}
            <Text className="text-primary-600 font-medium">
              {analysisData.next_phase}
            </Text>
          </Text>
        </View>

        {/* Buttons */}
        <View className="mt-2">
          <NextButton
            text="Export Face Data"
            icon="download-outline"
            onPress={handleExportData}
          />

          <NextButton
            text="View Recommendations"
            icon="arrow-forward-outline"
            onPress={handleViewRecommendations}
          />
        </View>
      </View>
    </ScrollView>
  );
}
