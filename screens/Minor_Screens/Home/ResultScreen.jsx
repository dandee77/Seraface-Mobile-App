import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { GradientText } from "../../../components/UI_Common/Gradients/GradientText";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import AnalysisResultItem from "../../../components/Home_Screen/Results/AnalysisResultItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

export default function ResultScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const imageUri = route.params?.imageUri;
  const routeAnalysisData = route.params?.analysisData;

  // Get analysis data from Redux store as fallback
  const reduxAnalysisData = useSelector(
    (state) => state.skincare.analysisResults
  );

  // Use data from route params or Redux store
  const analysisData = routeAnalysisData || reduxAnalysisData;

  // Fallback mock data (only used if no real data available)
  const mockAnalysisData = {
    session_id: "mock-session-id",
    status: "success",
    message: "Mock analysis data - no backend connection",
    next_phase: "Product recommendations",
    analysis: {
      message: "Mock face analysis",
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
  };

  // Use real data if available, otherwise use mock data
  const finalAnalysisData = analysisData || mockAnalysisData;

  // Log the data source for debugging
  useEffect(() => {
    if (analysisData) {
      console.log("📊 Using real analysis data:", analysisData.session_id);
    } else {
      console.log("⚠️ Using mock analysis data - no backend connection");
    }
  }, [analysisData]);

  // Helper function to format array locations
  const formatLocations = (locations) => {
    if (!locations || locations.length === 0) return null;
    return locations.join(", ");
  };

  // Helper function to format presence values
  const formatPresence = (presence) => {
    return presence ? "Present" : "Not present";
  };

  // Process analysis results for display
  const analysisResults = [
    {
      id: 1,
      title: "Skin Type Analysis",
      description: `Your skin shows ${finalAnalysisData.analysis.ai_output.oiliness_shine.level} oiliness levels and ${finalAnalysisData.analysis.ai_output.skin_elasticity} elasticity.`,
      details: [
        {
          label: "Oiliness Level",
          value: finalAnalysisData.analysis.ai_output.oiliness_shine.level,
          locations: formatLocations(
            finalAnalysisData.analysis.ai_output.oiliness_shine.location
          ),
        },
        {
          label: "Dryness/Flaking",
          value: formatPresence(
            finalAnalysisData.analysis.ai_output.dryness_flaking.presence
          ),
          locations: formatLocations(
            finalAnalysisData.analysis.ai_output.dryness_flaking.location
          ),
        },
        {
          label: "Skin Elasticity",
          value: finalAnalysisData.analysis.ai_output.skin_elasticity,
        },
        {
          label: "Dehydration Signs",
          value: finalAnalysisData.analysis.ai_output.dehydrated_skin_signs,
        },
      ],
    },
    {
      id: 2,
      title: "Acne & Congestion Assessment",
      description: `You have ${finalAnalysisData.analysis.ai_output.acne_breakouts.severity} acne with ${formatPresence(finalAnalysisData.analysis.ai_output.blackheads_whiteheads.presence).toLowerCase()} blackheads and whiteheads.`,
      details: [
        {
          label: "Acne Severity",
          value: finalAnalysisData.analysis.ai_output.acne_breakouts.severity,
          locations: formatLocations(
            finalAnalysisData.analysis.ai_output.acne_breakouts.location
          ),
        },
        {
          label: "Breakout Count",
          value: `${finalAnalysisData.analysis.ai_output.acne_breakouts.count_estimate} visible`,
        },
        {
          label: "Blackheads/Whiteheads",
          value: formatPresence(
            finalAnalysisData.analysis.ai_output.blackheads_whiteheads.presence
          ),
          locations: formatLocations(
            finalAnalysisData.analysis.ai_output.blackheads_whiteheads.location
          ),
        },
        {
          label: "Hormonal Signs",
          value: finalAnalysisData.analysis.ai_output.hormonal_acne_signs,
        },
      ],
    },
    {
      id: 3,
      title: "Skin Tone & Texture",
      description: `Your skin shows ${finalAnalysisData.analysis.ai_output.uneven_skin_tone} uneven tone with ${finalAnalysisData.analysis.ai_output.pores_size.level} pore size.`,
      details: [
        {
          label: "Uneven Tone",
          value: finalAnalysisData.analysis.ai_output.uneven_skin_tone,
        },
        {
          label: "Dark Spots/Scars",
          value: formatPresence(
            finalAnalysisData.analysis.ai_output.dark_spots_scars.presence
          ),
          description:
            finalAnalysisData.analysis.ai_output.dark_spots_scars.description,
        },
        {
          label: "Pore Size",
          value: finalAnalysisData.analysis.ai_output.pores_size.level,
          locations: formatLocations(
            finalAnalysisData.analysis.ai_output.pores_size.location
          ),
        },
      ],
    },
    {
      id: 4,
      title: "Additional Observations",
      description: `Your skin shows ${finalAnalysisData.analysis.ai_output.redness_irritation} redness and ${finalAnalysisData.analysis.ai_output.stress_related_flareups} stress-related signs.`,
      details: [
        {
          label: "Redness/Irritation",
          value: finalAnalysisData.analysis.ai_output.redness_irritation,
        },
        {
          label: "Stress-Related Signs",
          value: finalAnalysisData.analysis.ai_output.stress_related_flareups,
        },
        {
          label: "Fine Lines/Wrinkles",
          value: formatPresence(
            finalAnalysisData.analysis.ai_output.fine_lines_wrinkles.presence
          ),
          locations: formatLocations(
            finalAnalysisData.analysis.ai_output.fine_lines_wrinkles.areas
          ),
        },
      ],
    },
  ];

  const handleExportData = () => {
    // In a real app, this would handle exporting analysis data
    console.log("Exporting face data analysis", finalAnalysisData.session_id);
  };

  const handleViewRecommendations = () => {
    navigation.navigate("Products");
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
            {finalAnalysisData.analysis.message}. Here's what we've found:
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
              {finalAnalysisData.status}
            </Text>
          </Text>
          <Text className="text-textSecondary">
            Next:{" "}
            <Text className="text-primary-600 font-medium">
              {finalAnalysisData.next_phase}
            </Text>
          </Text>
          {!analysisData && (
            <Text className="text-warning-600 text-sm mt-2">
              ⚠️ Using mock data - backend not connected
            </Text>
          )}
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

        {/* Debug Info (remove in production) */}
        {__DEV__ && (
          <View className="mt-4 p-4 bg-gray-100 rounded-xl">
            <Text className="text-sm text-gray-600">
              Debug - Session ID: {finalAnalysisData.session_id}
            </Text>
            <Text className="text-sm text-gray-600">
              Data Source: {analysisData ? "Backend" : "Mock"}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
