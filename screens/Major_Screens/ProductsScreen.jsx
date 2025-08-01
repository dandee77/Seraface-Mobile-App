import { StyleSheet, Text, View } from "react-native";
import TitleContainer from "../../components/UI_Common/Commons/TitleContainer";
import ProductList from "../../components/UI_Common/Lists/ProductList";
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

const ProductsScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const handleNextButtonPressed = () => {
    navigation.navigate("Routine");
  };

  return (
    <View className="flex-1">
      <View className="px-8 pt-6">
        <TitleContainer
          title={"Your Recommendations"}
          description={"Based on your skin profile and scan"}
        />
      </View>

      <View className="flex-1 px-8">
        <ProductList
          data={productRecommendations}
          contentInset={{ bottom: 80 }}
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
            onPress={handleNextButtonPressed}
          />
        </View>
      </View>
    </View>
  );
};

export default ProductsScreen;
