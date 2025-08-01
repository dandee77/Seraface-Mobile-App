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
    title: "CeraVe Foaming Facial Cleanser Travel Size", // Product name
    subtitle: "Facial Wash", // Category type
    matchPercentage: 98,
    description:
      "Perfect for sensitive skin, removes impurities without drying",
    price: 119.0, // Keeping current price format with ₱
    priorityLevel: "High",
    image: "https://m.media-amazon.com/images/I/41N7YPPZd5L._SL1080_.jpg",
  },
  {
    title: "Face Republic Vita Radiance", // Product name
    subtitle: "Moisturizer", // Category type
    matchPercentage: 95,
    description: "Hydrates and locks in moisture without clogging pores",
    price: 374.0, // Keeping current price format with ₱
    priorityLevel: "Medium",
    image: "https://m.media-amazon.com/images/I/61-uZ6L9JKL._SX466_.jpg",
  },
  {
    title: "Shangme Sunscreen Collagen Peptide & Vitamin C", // Product name
    subtitle: "Sunscreen", // Category type
    matchPercentage: 92,
    description: "Broad spectrum protection against UVA and UVB rays",
    price: 299.0, // Keeping current price format with ₱
    priorityLevel: "High",
    image:
      "https://img.lazcdn.com/g/ff/kf/S4e24eb51799744d5ae1edd0af326ec18g.jpg_720x720q80.jpg",
  },
];

const BudgetScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [budget, setBudget] = useState(800); // Default budget shown in first image
  const spentAmount = 792; // Fixed amount from the images

  const handleBudgetChange = (newBudget) => {
    setBudget(newBudget);
  };

  const ListHeaderComponent = () => (
    <View className="flex-col ">
      <TitleContainer
        title={"Budget Planner"}
        description={"Optimize your skincare spending"}
      />
      <BudgetContainer
        budget={budget}
        onBudgetChange={handleBudgetChange}
        spentAmount={spentAmount}
      />
      <RoadmapContainer spentAmount={spentAmount} budget={budget} />
      <View className="flex-col mt-4">
        <Text className="font-bold text-lg">Purchased Products</Text>
      </View>
    </View>
  );

  const handleNextButtonPressed = () => {
    navigation.navigate("Home");
  };

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
            text={"Home"}
            icon={"arrow-forward-outline"}
            onPress={handleNextButtonPressed}
          />
        </View>
      </View>
    </View>
  );
};

export default BudgetScreen;
