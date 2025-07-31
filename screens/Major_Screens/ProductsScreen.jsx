import { StyleSheet, Text, View } from "react-native";
import TitleContainer from "../../components/UI_Common/Commons/TitleContainer";
import ProductList from "../../components/UI_Common/Lists/ProductList";
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
