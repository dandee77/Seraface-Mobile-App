import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TitleContainer from "../../components/UI_Common/Commons/TitleContainer";
import RoutineItem from "../../components/Routines_Screen/RoutineItem";
import NextButton from "../../components/UI_Common/Buttons/NextButton";
import SegmentedControl from "../../components/Routines_Screen/SegmentedControl";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetRoutineCreationMutation } from "../../store/api/skincareApi";
import { setRoutinesError } from "../../store/slices/skincareSlice";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";

// Fallback data in case API data is not available
const fallbackMorningRoutine = [
  {
    id: 1,
    title: "Cleanse",
    subtitle: "Gentle Hydrating Cleanser",
    description:
      "Wet face with lukewarm water. Apply a small amount to face and neck, massaging in circular motions. Rinse thoroughly.",
    duration: 30,
    instructions: [
      "Wet face with lukewarm water",
      "Apply a small amount to face and neck",
      "Massage in circular motions",
      "Rinse thoroughly",
    ],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["morning"],
  },
  {
    id: 2,
    title: "Tone",
    subtitle: "Alcohol-Free Toner",
    description:
      "Apply to a cotton pad and sweep across face and neck after cleansing.",
    duration: 15,
    instructions: [
      "Apply to a cotton pad",
      "Sweep across face and neck after cleansing",
    ],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["morning"],
  },
  {
    id: 3,
    title: "Treat",
    subtitle: "Vitamin C Serum",
    description:
      "Apply 3-4 drops to fingertips and gently press into skin. Allow to absorb fully before next step.",
    duration: 30,
    instructions: [
      "Apply 3-4 drops to fingertips",
      "Gently press into skin",
      "Allow to absorb fully before next step",
    ],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["morning"],
  },
  {
    id: 4,
    title: "Moisturize",
    subtitle: "Hyaluronic Acid Moisturizer",
    description: "Apply a pea-size amount all over face and neck.",
    duration: 30,
    instructions: ["Apply a pea-size amount all over face and neck"],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["morning"],
  },
  {
    id: 5,
    title: "Protect",
    subtitle: "SPF 50 Sunscreen",
    description:
      "Apply liberally 15 minutes before sun exposure. Reapply every 2 hours when outdoors.",
    duration: 30,
    instructions: [
      "Apply liberally 15 minutes before sun exposure",
      "Reapply every 2 hours when outdoors",
    ],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["morning"],
  },
];

const fallbackEveningRoutine = [
  {
    id: 1,
    title: "Cleanse",
    subtitle: "Gentle Hydrating Cleanser",
    description:
      "Wet face with lukewarm water. Apply a small amount to face and neck, massaging in circular motions. Rinse thoroughly.",
    duration: 30,
    instructions: [
      "Wet face with lukewarm water",
      "Apply a small amount to face and neck",
      "Massage in circular motions",
      "Rinse thoroughly",
    ],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["night"],
  },
  {
    id: 2,
    title: "Treat",
    subtitle: "Niacinamide 10% + Zinc 1%",
    description:
      "Apply 3-4 drops to fingertips and gently press into skin. Allow to absorb fully before next step.",
    duration: 30,
    instructions: [
      "Apply 3-4 drops to fingertips",
      "Gently press into skin",
      "Allow to absorb fully before next step",
    ],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["night"],
  },
  {
    id: 3,
    title: "Moisturize",
    subtitle: "Hyaluronic Acid Moisturizer",
    description: "Apply a pea-size amount all over face and neck.",
    duration: 30,
    instructions: ["Apply a pea-size amount all over face and neck"],
    days: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true,
    },
    time: ["night"],
  },
];

export default function RoutinesScreen({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Get session ID
  const sessionId =
    route.params?.sessionId || useSelector((state) => state.auth.sessionId);

  // Get routine data from Redux store
  const routineData = useSelector((state) => state.skincare.routines);

  // State for morning and evening routines
  const [morningRoutine, setMorningRoutine] = useState([]);
  const [eveningRoutine, setEveningRoutine] = useState([]);
  const [asNeededRoutine, setAsNeededRoutine] = useState([]);

  // RTK Query hook for routine creation
  const [getRoutineCreation, { isLoading, error: routineError }] =
    useGetRoutineCreationMutation();

  // Process routine data from backend
  useEffect(() => {
    if (routineData && routineData.routine && routineData.routine.length > 0) {
      console.log("🗓️ Processing routine data from backend");

      const morning = [];
      const evening = [];
      const asNeeded = [];

      routineData.routine.forEach((item, index) => {
        // Skip empty or invalid items
        if (
          item.name === "None Available" ||
          item.name === "None available within criteria"
        ) {
          return;
        }

        // Create routine item
        const routineItem = {
          id: index + 1,
          title: item.name.split(" ").slice(0, 2).join(" "), // First two words for title
          subtitle: item.tag,
          description: item.description,
          duration: item.duration,
          waiting_time: item.waiting_time,
          instructions: item.instructions,
          days: item.days,
          time: item.time,
        };

        // Sort into appropriate time categories
        if (item.time.includes("morning")) {
          morning.push(routineItem);
        }

        if (item.time.includes("night")) {
          evening.push(routineItem);
        }

        if (item.time.includes("as needed")) {
          asNeeded.push(routineItem);
        }
      });

      setMorningRoutine(morning);
      setEveningRoutine(evening);
      setAsNeededRoutine(asNeeded);

      console.log("🗓️ Processed routines:", {
        morning: morning.length,
        evening: evening.length,
        asNeeded: asNeeded.length,
      });
    } else {
      console.log("⚠️ No routine data available, using fallback data");
      setMorningRoutine(fallbackMorningRoutine);
      setEveningRoutine(fallbackEveningRoutine);
      setAsNeededRoutine([]);
    }
  }, [routineData]);

  // Handle retry for routine creation
  const handleRetryRoutine = async () => {
    if (sessionId) {
      console.log("🔄 Retrying routine creation with session:", sessionId);
      try {
        await getRoutineCreation(sessionId).unwrap();
      } catch (error) {
        console.error("❌ Retry failed:", error);
      }
    } else {
      Alert.alert(
        "Session ID Missing",
        "Cannot fetch routine without a valid session ID."
      );
    }
  };

  function handleIndexChange(index) {
    setSelectedIndex(index);
  }

  function handleNextButtonPress() {
    navigation.navigate("Budget");
  }

  // Get data for the selected tab
  let selectedRoutine = morningRoutine;
  let routineTitle = "Morning Routine";

  if (selectedIndex === 1) {
    selectedRoutine = eveningRoutine;
    routineTitle = "Evening Routine";
  } else if (selectedIndex === 2) {
    selectedRoutine = asNeededRoutine;
    routineTitle = "As Needed";
  }

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <ActivityIndicator size="large" color={Colors.primary500} />
        <Text className="text-lg font-medium mt-6 mb-2 text-center">
          Creating Your Personalized Routine
        </Text>
        <Text className="text-textSecondary text-center mb-6">
          Please wait while we analyze your skin profile and create a custom
          routine tailored to your needs.
        </Text>
      </View>
    );
  }

  // Error state
  if (routineError) {
    return (
      <View className="flex-1 items-center justify-center px-8">
        <View className="bg-error-100 p-12 rounded-3xl items-center mb-8">
          <Ionicons name="warning-outline" size={60} color={Colors.error500} />
        </View>
        <Text className="text-lg font-medium mb-2 text-center">
          Failed to Create Routine
        </Text>
        <Text className="text-textSecondary text-center mb-6">
          {routineError?.message ||
            "Unable to create a personalized routine at this time. Please try again."}
        </Text>
        <NextButton
          text="Retry"
          icon="refresh-outline"
          onPress={handleRetryRoutine}
        />
        <NextButton
          text="Back to Recommendations"
          icon="arrow-back-outline"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  }

  // If no routine items in any category
  const hasNoRoutines =
    morningRoutine.length === 0 &&
    eveningRoutine.length === 0 &&
    asNeededRoutine.length === 0;

  if (hasNoRoutines) {
    return (
      <ScrollView className="flex-1">
        <View className="px-8 py-6 gap-4">
          <TitleContainer title={"Your Skincare Routine"} />

          <View className="items-center justify-center py-8">
            <View className="bg-primary-100 p-8 rounded-3xl items-center mb-4">
              <Ionicons
                name="flask-outline"
                size={60}
                color={Colors.primary500}
              />
            </View>
            <Text className="text-lg font-medium mb-2 text-center">
              No Routine Generated Yet
            </Text>
            <Text className="text-textSecondary text-center mb-6">
              We couldn't find suitable products for your routine based on your
              profile. This may happen if you have specific constraints or
              allergies.
            </Text>
            <NextButton
              text="Retry Routine Creation"
              icon="refresh-outline"
              onPress={handleRetryRoutine}
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  // Default view with tabs and routines
  return (
    <ScrollView className="flex-1">
      <View className="px-8 py-6 gap-4">
        <TitleContainer title={"Your Skincare Routine"} />

        <SegmentedControl
          selectedIndex={selectedIndex}
          onChange={handleIndexChange}
          options={[
            { label: "Morning", icon: "sunny" },
            { label: "Evening", icon: "moon" },
            {
              label: "Manual",
              icon: "bandage",
            },
          ]}
        />

        <View className="mb-2">
          <Text className="text-lg font-bold text-primary-700">
            {routineTitle}
          </Text>
          {selectedIndex === 0 && (
            <Text className="text-sm text-textSecondary mt-1">
              Your daily morning skincare routine
            </Text>
          )}
          {selectedIndex === 1 && (
            <Text className="text-sm text-textSecondary mt-1">
              Your nightly skincare regimen
            </Text>
          )}
          {selectedIndex === 2 && (
            <Text className="text-sm text-textSecondary mt-1">
              Products to use as needed for specific concerns
            </Text>
          )}
        </View>

        <View className="gap-0">
          {selectedRoutine.length > 0 ? (
            selectedRoutine.map((item, index) => (
              <RoutineItem
                key={`${selectedIndex}-${index}`}
                {...item}
                showDetails={index === 0} // First item is expanded by default
              />
            ))
          ) : (
            <View className="bg-white p-6 rounded-xl items-center">
              <Ionicons
                name="calendar-outline"
                size={40}
                color={Colors.textSecondary}
              />
              <Text className="text-center text-textSecondary mt-4">
                No{" "}
                {selectedIndex === 0
                  ? "morning"
                  : selectedIndex === 1
                    ? "evening"
                    : "as needed"}{" "}
                routine items found.
              </Text>
            </View>
          )}
        </View>

        {routineData?.product_type === "custom" && (
          <View className="bg-primary-50 rounded-xl p-4 mt-4">
            <Text className="text-center text-primary-700">
              <Ionicons name="information-circle" size={16} /> This is a
              personalized routine based on your skin analysis.
            </Text>
          </View>
        )}

        <NextButton
          text={"Complete Analysis"}
          onPress={() => navigation.navigate("Home")}
          icon={"checkmark-circle-outline"}
        />
      </View>
    </ScrollView>
  );
}
