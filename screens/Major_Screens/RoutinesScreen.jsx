import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
  // ✅ STEP 1: ALL HOOKS MUST BE AT THE VERY TOP - NO EXCEPTIONS
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  // All useState hooks
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [morningRoutine, setMorningRoutine] = useState([]);
  const [eveningRoutine, setEveningRoutine] = useState([]);
  const [asNeededRoutine, setAsNeededRoutine] = useState([]);

  // All useSelector hooks
  const sessionId = useSelector((state) => {
    return route.params?.sessionId || state.auth.sessionId;
  });
  const routineData = useSelector((state) => state.skincare.routines);

  // RTK Query hook
  const [getRoutineCreation, { isLoading, error: routineError }] = useGetRoutineCreationMutation();

  // ✅ STEP 2: ALL useCallback AND useMemo HOOKS
  const handleRetryRoutine = useCallback(async () => {
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
  }, [sessionId, getRoutineCreation]);

  const handleIndexChange = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handleNextButtonPress = useCallback(() => {
    navigation.navigate("Home");
  }, [navigation]);

  // Memoized computed values
  const routineConfig = useMemo(() => {
    let selectedRoutine = morningRoutine;
    let routineTitle = "Morning Routine";
    let routineDescription = "Your daily morning skincare routine";

    if (selectedIndex === 1) {
      selectedRoutine = eveningRoutine;
      routineTitle = "Evening Routine";
      routineDescription = "Your nightly skincare regimen";
    } else if (selectedIndex === 2) {
      selectedRoutine = asNeededRoutine;
      routineTitle = "As Needed";
      routineDescription = "Products to use as needed for specific concerns";
    }

    return {
      selectedRoutine,
      routineTitle,
      routineDescription,
    };
  }, [selectedIndex, morningRoutine, eveningRoutine, asNeededRoutine]);

  const hasNoRoutines = useMemo(() => {
    return (
      morningRoutine.length === 0 &&
      eveningRoutine.length === 0 &&
      asNeededRoutine.length === 0
    );
  }, [morningRoutine.length, eveningRoutine.length, asNeededRoutine.length]);

  const segmentedControlOptions = useMemo(() => [
    { label: "Morning", icon: "sunny" },
    { label: "Evening", icon: "moon" },
    {
      label: "As Needed",
      icon: "bandage",
      disabled: asNeededRoutine.length === 0,
    },
  ], [asNeededRoutine.length]);

  // ✅ STEP 3: ALL useEffect HOOKS
  useEffect(() => {
    // Process routine data from backend
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
          title: item.name.split(" ").slice(0, 2).join(" "),
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

  // ✅ STEP 4: RENDER FUNCTIONS (AFTER ALL HOOKS)
  const renderLoadingState = () => (
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

  const renderErrorState = () => (
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

  const renderNoRoutinesState = () => (
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

  const renderRoutineContent = () => {
    const { selectedRoutine } = routineConfig;
    
    return (
      <View className="gap-0">
        {selectedRoutine.length > 0 ? (
          selectedRoutine.map((item, index) => (
            <RoutineItem
              key={`${selectedIndex}-${index}`}
              {...item}
              showDetails={index === 0}
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
    );
  };

  const renderMainContent = () => {
    const { routineTitle, routineDescription } = routineConfig;
    
    return (
      <ScrollView className="flex-1">
        <View className="px-8 py-6 gap-4">
          <TitleContainer title={"Your Skincare Routine"} />

          <SegmentedControl
            selectedIndex={selectedIndex}
            onChange={handleIndexChange}
            options={segmentedControlOptions}
          />

          <View className="mb-2">
            <Text className="text-lg font-bold text-primary-700">
              {routineTitle}
            </Text>
            <Text className="text-sm text-textSecondary mt-1">
              {routineDescription}
            </Text>
          </View>

          {renderRoutineContent()}

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
            onPress={handleNextButtonPress}
            icon={"checkmark-circle-outline"}
          />
        </View>
      </ScrollView>
    );
  };

  // ✅ STEP 5: CONDITIONAL RENDERING LOGIC (NO HOOKS INSIDE)
  if (isLoading) {
    return renderLoadingState();
  }

  if (routineError) {
    return renderErrorState();
  }

  if (hasNoRoutines) {
    return renderNoRoutinesState();
  }

  return renderMainContent();
}