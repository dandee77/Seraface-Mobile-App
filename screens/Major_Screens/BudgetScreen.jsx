import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import TitleContainer from "../../components/UI_Common/Commons/TitleContainer";
import BudgetContainer from "../../components/Budget_Screen/BudgetContainer";
import RoadmapContainer from "../../components/Budget_Screen/RoadmapContainer";
import ProductItem from "../../components/UI_Common/Commons/ProductItem";
import NextButton from "../../components/UI_Common/Buttons/NextButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const productRecommendations = [
  {
    title: "Gentle Hydrating Cleanser",
    subtitle: "CeraVe",
    matchPercentage: 98,
    description:
      "Perfect for sensitive skin, removes impurities without drying",
    price: 150.99,
    priorityLevel: "High",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Vitamin C Serum",
    subtitle: "The Ordinary",
    matchPercentage: 95,
    description: "Brightens skin tone and reduces hyperpigmentation",
    price: 290.99,
    priorityLevel: "Medium",
    image:
      "https://images.unsplash.com/photo-1627811015433-368c148f6c3c?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Niacinamide 10% + Zinc 1%",
    subtitle: "CeraVe",
    matchPercentage: 92,
    description: "Reduces sebum production and minimizes pores",
    price: 120.99,
    priorityLevel: "High",
    image:
      "https://images.unsplash.com/photo-1710410815589-dd83514104d0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Hyaluronic Acid Moisturizer",
    subtitle: "Neutrogena",
    matchPercentage: 90,
    description: "Hydrates and plumps skin with 3 molecular weights of HA",
    price: 180.99,
    priorityLevel: "Medium",
    image:
      "https://images.unsplash.com/photo-1629732047847-50219e9c5aef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const BudgetScreen = () => {
  const insets = useSafeAreaInsets();
  const [budget, setBudget] = useState(260); // Default budget shown in first image
  const spentAmount = 77.96; // Fixed amount from the images

  const handleBudgetChange = (newBudget) => {
    setBudget(newBudget);
  };

  const ListHeaderComponent = () => (
    <View className="flex-col ">
      <TitleContainer
        title={"Budget Planner"}
        description={"Optimize your skincare spending"}
      />
      <BudgetContainer budget={budget} onBudgetChange={handleBudgetChange} />
      <RoadmapContainer spentAmount={spentAmount} budget={budget} />
      <View className="flex-col mt-4">
        <Text className="font-bold text-lg">Purchase Priority</Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 ">
      <View className="px-8 py-6 gap-3">
        <FlatList
          data={productRecommendations}
          renderItem={({ item }) => <ProductItem {...item} />}
          keyExtractor={(item) => item.title}
          ListHeaderComponent={ListHeaderComponent}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View
        className="absolute bottom-0 left-0 right-0 w-full"
        style={[{ paddingBottom: Math.max(insets.bottom, 20) }]}
      >
        <View className="px-8 w-full">
          <NextButton
            text={"See Your Routine"}
            icon={"arrow-forward-outline"}
          />
        </View>
      </View>
    </View>
  );
};

export default BudgetScreen;
