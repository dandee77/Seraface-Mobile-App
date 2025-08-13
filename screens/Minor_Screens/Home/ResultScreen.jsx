import { View, Text, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { GradientText } from "../../../components/UI_Common/Gradients/GradientText";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import AnalysisResultItem from "../../../components/Home_Screen/Results/AnalysisResultItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

// Import the new recommendations mutation
import { useGetProductRecommendationsMutation } from "../../../store/api/skincareApi";
import { setRecommendationsError } from "../../../store/slices/skincareSlice";

export default function ResultScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const imageUri = route.params?.imageUri;
  const routeAnalysisData = route.params?.analysisData;

  // Get analysis data from Redux store as fallback
  const reduxAnalysisData = useSelector(
    (state) => state.skincare.analysisResults
  );
  const sessionId = useSelector((state) => state.auth.sessionId);
  const recommendations = useSelector(
    (state) => state.skincare.recommendations
  );

  // RTK Query mutation for getting recommendations
  const [
    getProductRecommendations,
    { isLoading: isLoadingRecommendations, error: recommendationsError },
  ] = useGetProductRecommendationsMutation();

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

  // Automatically fetch recommendations when component mounts
  useEffect(() => {
    const fetchRecommendations = async () => {
      if (sessionId && analysisData) {
        console.log("🛍️ Automatically fetching product recommendations...");
        try {
          await getProductRecommendations(sessionId).unwrap();
          console.log("✅ Product recommendations fetched successfully");
        } catch (error) {
          console.error("❌ Failed to fetch product recommendations:", error);
          dispatch(
            setRecommendationsError(
              error.message || "Failed to fetch recommendations"
            )
          );
        }
      }
    };

    // Fetch recommendations after a short delay to ensure UI is rendered
    const timer = setTimeout(fetchRecommendations, 1000);
    return () => clearTimeout(timer);
  }, [sessionId, analysisData, getProductRecommendations, dispatch]);

  // Handle recommendation errors
  useEffect(() => {
    if (recommendationsError) {
      console.error("❌ Recommendations error:", recommendationsError);
      Alert.alert(
        "Recommendations Error",
        recommendationsError.message ||
          "Failed to get product recommendations. You can still view manual recommendations.",
        [{ text: "OK" }]
      );
    }
  }, [recommendationsError]);

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
    if (!locations) return null;

    // If it's already an array, filter out empty values
    if (Array.isArray(locations)) {
      const filtered = locations.filter((loc) => loc && loc.trim() !== "");
      return filtered.length > 0 ? filtered : null;
    }

    // If it's a string, return as single-item array
    if (typeof locations === "string" && locations.trim() !== "") {
      return [locations.trim()];
    }

    return null;
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
    console.log("Exporting face data analysis", finalAnalysisData.session_id);
  };

  const handleViewRecommendations = () => {
    // Pass recommendations data and sessionId to ProductsScreen via navigation params
    navigation.navigate("Products", {
      recommendations: recommendations.products ? recommendations : null,
      sessionId: sessionId,
    });
  };

  const handleRetryRecommendations = async () => {
    if (sessionId) {
      try {
        await getProductRecommendations(sessionId).unwrap();
      } catch (error) {
        console.error("❌ Retry failed:", error);
      }
    }
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

        {/* Recommendations Status Section */}
        <View className="bg-white p-4 rounded-xl mb-6">
          <Text className="text-textSecondary mb-1">
            Analysis Status:{" "}
            <Text className="text-success-500 font-medium">
              {finalAnalysisData.status}
            </Text>
          </Text>
          <Text className="text-textSecondary mb-2">
            Next:{" "}
            <Text className="text-primary-600 font-medium">
              {finalAnalysisData.next_phase}
            </Text>
          </Text>

          {/* Recommendations Loading/Status */}
          {isLoadingRecommendations && (
            <Text className="text-info-600 text-sm mt-2">
              🔄 Getting your personalized recommendations...
            </Text>
          )}

          {recommendations.products && !isLoadingRecommendations && (
            <Text className="text-success-600 text-sm mt-2">
              ✅ Personalized recommendations ready!
            </Text>
          )}

          {recommendations.error && !isLoadingRecommendations && (
            <View className="mt-2">
              <Text className="text-error-600 text-sm">
                ❌ {recommendations.error}
              </Text>
              <NextButton
                text="Retry Recommendations"
                icon="refresh-outline"
                onPress={handleRetryRecommendations}
                style={{ marginTop: 8 }}
              />
            </View>
          )}

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
            text={
              isLoadingRecommendations
                ? "Loading Recommendations..."
                : "View Recommendations"
            }
            icon={
              isLoadingRecommendations
                ? "hourglass-outline"
                : "arrow-forward-outline"
            }
            onPress={handleViewRecommendations}
            disabled={isLoadingRecommendations}
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
            <Text className="text-sm text-gray-600">
              Recommendations:{" "}
              {recommendations.products ? "Loaded" : "Not loaded"}
            </Text>
            {recommendations.total_budget && (
              <Text className="text-sm text-gray-600">
                Budget: {recommendations.total_budget}
              </Text>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
