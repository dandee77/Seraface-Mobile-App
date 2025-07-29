import { View, ScrollView } from "react-native";
import TitleContainer from "../components/UI_Common/Commons/TitleContainer";
import RoutineItem from "../components/Routines_Screen/RoutineItem";
import NextButton from "../components/UI_Common/Buttons/NextButton";
import { useState } from "react";

const morningRoutine = [
  {
    id: 1,
    title: "Cleanse",
    subtitle: "Gentle Hydrating Cleanser",
    description:
      "Wet face with lukewarm water. Apply a small amoount to face and neck, massaging in circular motions. Rinse thoroughly.",
    duration: 30,
  },
  {
    id: 2,
    title: "Tone",
    subtitle: "Alcohol-Free Toner",
    description:
      "Apply to a cotton pad and sweep across face and neck after cleansing.",
    duration: 15,
  },
  {
    id: 3,
    title: "Treat",
    subtitle: "Vitamin C Serum",
    description:
      "Apply 3-4 drops to fingertips and gently press into skin. Allow to absorb fully before next step.",
    duration: 30,
  },
  {
    id: 4,
    title: "Moisturize",
    subtitle: "Hyaluronic Acid Moisturizer",
    description: "Apply a pea-size amount all over face and neck.",
    duration: 30,
  },
  {
    id: 5,
    title: "Protect",
    subtitle: "SPF 50 Sunscreen",
    description:
      "Apply liberally 15 minutes before sun exposure. Reapply every 2 hours when outdoors.",
    duration: 30,
  },
];

const eveningRoutine = [
  {
    id: 1,
    title: "Cleanse",
    subtitle: "Gentle Hydrating Cleanser",
    description:
      "Wet face with lukewarm water. Apply a small amoount to face and neck, massaging in circular motions. Rinse thoroughly.",
    duration: 30,
  },
  {
    id: 2,
    title: "Treat",
    subtitle: "Niacinamide 10% + Zinc 1%",
    description:
      "Apply 3-4 drops to fingertips and gently press into skin. Allow to absorb fully before next step.",
    duration: 30,
  },
  {
    id: 3,
    title: "Moisturize",
    subtitle: "Hyaluronic Acid Moisturizer",
    description: "Apply a pea-size amount all over face and neck.",
    duration: 30,
  },
];

export default function RoutinesScreen({ navigation }) {
  const [routineType, setRoutineType] = useState("morningRoutine");

  function handleNextPress() {
    navigation.navigate("Budget");
  }

  const data =
    routineType === "morningRoutine" ? morningRoutine : eveningRoutine;

  return (
    <ScrollView className="flex-1">
      <View className="px-8 py-6 gap-4">
        <TitleContainer title={"Your Skincare Routine"} />
        <View>
          {data.map((item) => (
            <RoutineItem key={item.id} {...item} />
          ))}
        </View>
        <NextButton
          text={"Budget Planner"}
          onPress={handleNextPress}
          icon={"arrow-forward-outline"}
        />
        <View className="h-24" />
      </View>
    </ScrollView>
  );
}
