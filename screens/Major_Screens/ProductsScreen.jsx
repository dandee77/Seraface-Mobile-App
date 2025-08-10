import { StyleSheet, Text, View } from "react-native";
import TitleContainer from "../../components/UI_Common/Commons/TitleContainer";
import ProductList from "../../components/UI_Common/Lists/ProductList";
import NextButton from "../../components/UI_Common/Buttons/NextButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Put budget screen inside this product screen component

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
    // Add full product data for navigation
    productData: {
      product_data: {
        title: "CeraVe Foaming Facial Cleanser Travel Size",
        price: "₱119.00",
        thumbnail:
          "https://m.media-amazon.com/images/I/41N7YPPZd5L._SL1080_.jpg",
        rating: 4.8,
        reviews: 1250,
        store: "CeraVe Official Store",
        product_link: "https://example.com/cerave-cleanser",
        detailed_description:
          "Perfect for sensitive skin, removes impurities without drying. Formulated with ceramides and hyaluronic acid to maintain skin barrier while cleansing. Gentle yet effective formula suitable for daily use.",
        media: [
          {
            type: "image",
            link: "https://m.media-amazon.com/images/I/41N7YPPZd5L._SL1080_.jpg",
          },
        ],
      },
      recommendation_context: {
        category: "cleanser",
        recommended_price: "₱100.00",
        user_context: {
          skin_type: ["sensitive", "combination"],
          skin_conditions: ["acne", "sensitivity"],
          goals: ["gentle cleansing", "maintain skin barrier"],
        },
        ai_recommended: true,
      },
    },
  },
  {
    title: "Face Republic Vita Radiance", // Product name
    subtitle: "Moisturizer", // Category type
    matchPercentage: 95,
    description: "Hydrates and locks in moisture without clogging pores",
    price: 374.0, // Keeping current price format with ₱
    priorityLevel: "Medium",
    image: "https://m.media-amazon.com/images/I/61-uZ6L9JKL._SX466_.jpg",
    productData: {
      product_data: {
        title: "Face Republic Vita Radiance Moisturizer",
        price: "₱374.00",
        thumbnail:
          "https://m.media-amazon.com/images/I/61-uZ6L9JKL._SX466_.jpg",
        rating: 4.6,
        reviews: 890,
        store: "Face Republic",
        product_link: "https://example.com/face-republic-moisturizer",
        detailed_description:
          "Hydrates and locks in moisture without clogging pores. Enriched with vitamins and antioxidants to improve skin radiance and texture. Lightweight formula perfect for daily use.",
        media: [
          {
            type: "image",
            link: "https://m.media-amazon.com/images/I/61-uZ6L9JKL._SX466_.jpg",
          },
        ],
      },
      recommendation_context: {
        category: "moisturizer",
        recommended_price: "₱350.00",
        user_context: {
          skin_type: ["dry", "normal"],
          skin_conditions: ["dryness", "dullness"],
          goals: ["hydration", "radiance"],
        },
        ai_recommended: true,
      },
    },
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
    productData: {
      product_data: {
        title: "Shangme Sunscreen Collagen Peptide & Vitamin C",
        price: "₱299.00",
        thumbnail:
          "https://img.lazcdn.com/g/ff/kf/S4e24eb51799744d5ae1edd0af326ec18g.jpg_720x720q80.jpg",
        rating: 4.7,
        reviews: 2100,
        store: "Shangme Official",
        product_link: "https://example.com/shangme-sunscreen",
        detailed_description:
          "Broad spectrum protection against UVA and UVB rays. Enriched with collagen peptides and Vitamin C for anti-aging benefits while protecting from sun damage. Non-greasy formula suitable for daily wear.",
        media: [
          {
            type: "image",
            link: "https://img.lazcdn.com/g/ff/kf/S4e24eb51799744d5ae1edd0af326ec18g.jpg_720x720q80.jpg",
          },
        ],
      },
      recommendation_context: {
        category: "sunscreen",
        recommended_price: "₱280.00",
        user_context: {
          skin_type: ["oily", "combination"],
          skin_conditions: ["sun damage", "aging"],
          goals: ["sun protection", "anti-aging"],
        },
        ai_recommended: true,
      },
    },
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
