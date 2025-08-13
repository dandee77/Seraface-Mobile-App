import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TitleContainer from "../../components/UI_Common/Commons/TitleContainer";
import ProductList from "../../components/UI_Common/Lists/ProductList";
import NextButton from "../../components/UI_Common/Buttons/NextButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProductsScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();

  // Get recommendations from route params or Redux store
  const routeRecommendations = route.params?.recommendations;
  const sessionId = route.params?.sessionId;
  const reduxRecommendations = useSelector(
    (state) => state.skincare.recommendations
  );

  // Use route params if available, otherwise use Redux store
  const recommendations = routeRecommendations || reduxRecommendations;

  const [productRecommendations, setProductRecommendations] = useState([]);

  // Mock/fallback data
  const mockProductRecommendations = [
    {
      title: "CeraVe Foaming Facial Cleanser Travel Size",
      subtitle: "Facial Wash",
      matchPercentage: 98,
      description:
        "Perfect for sensitive skin, removes impurities without drying",
      price: 119.0,
      priorityLevel: "High",
      image: "https://m.media-amazon.com/images/I/41N7YPPZd5L._SL1080_.jpg",
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
    // Add more mock data as needed...
  ];

  // Transform backend recommendations to match UI format
  useEffect(() => {
    const transformRecommendations = () => {
      if (
        recommendations?.products &&
        Object.keys(recommendations.products).length > 0
      ) {
        console.log(
          "🛍️ Transforming backend recommendations:",
          recommendations
        );

        const transformedProducts = [];

        // Iterate through product categories
        Object.entries(recommendations.products).forEach(
          ([category, products]) => {
            products.forEach((product, index) => {
              transformedProducts.push({
                title: product.name,
                subtitle: category.charAt(0).toUpperCase() + category.slice(1),
                matchPercentage: 90 + Math.floor(Math.random() * 10), // Random match percentage 90-99%
                description: `Recommended ${category} product for your skin profile`,
                price: parseFloat(product.price.replace(/[^\d.-]/g, "")) || 0,
                priorityLevel:
                  index === 0 ? "High" : index === 1 ? "Medium" : "Low",
                image:
                  "https://via.placeholder.com/150x150/FF6B6B/FFFFFF?text=" +
                  encodeURIComponent(product.name.substring(0, 10)),
                productData: {
                  product_data: {
                    title: product.name,
                    price: product.price,
                    thumbnail:
                      "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=" +
                      encodeURIComponent(product.name.substring(0, 10)),
                    rating: 4.5 + Math.random() * 0.5, // Random rating 4.5-5.0
                    reviews: Math.floor(Math.random() * 1000) + 100,
                    store: "Recommended Store",
                    product_link: "https://example.com/product",
                    detailed_description: `This ${category} product has been specially recommended for your skin profile based on AI analysis.`,
                    media: [
                      {
                        type: "image",
                        link:
                          "https://via.placeholder.com/400x400/FF6B6B/FFFFFF?text=" +
                          encodeURIComponent(product.name.substring(0, 15)),
                      },
                    ],
                  },
                  recommendation_context: {
                    category: category,
                    recommended_price: product.price,
                    user_context: {
                      skin_type: ["analyzed"],
                      skin_conditions: ["analyzed"],
                      goals: ["personalized"],
                    },
                    ai_recommended: true,
                  },
                },
              });
            });
          }
        );

        console.log("✅ Transformed products:", transformedProducts.length);
        setProductRecommendations(transformedProducts);
      } else {
        console.log("⚠️ Using mock recommendations - no backend data");
        setProductRecommendations(mockProductRecommendations);
      }
    };

    transformRecommendations();
  }, [recommendations]);

  const handleNextButtonPressed = () => {
    navigation.navigate("Budget", { recommendations, sessionId });
  };

  // Calculate how many products we have
  const totalProducts = productRecommendations.length;
  const isUsingBackendData =
    recommendations?.products &&
    Object.keys(recommendations.products).length > 0;

  return (
    <View className="flex-1">
      <View className="px-8 pt-6">
        <TitleContainer
          title="Your Recommendations"
          description={
            isUsingBackendData
              ? `Based on your skin profile and AI analysis • ${totalProducts} products recommended`
              : "Based on your skin profile and scan"
          }
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
            text="View Budget Plan"
            icon="arrow-forward-outline"
            onPress={handleNextButtonPressed}
          />
        </View>
      </View>

      {/* Debug Info */}
      {__DEV__ && (
        <View className="absolute top-20 right-4 bg-black/80 p-2 rounded">
          <Text className="text-white text-xs">
            Backend Data: {isUsingBackendData ? "✅" : "❌"}
          </Text>
          <Text className="text-white text-xs">Products: {totalProducts}</Text>
          {sessionId && (
            <Text className="text-white text-xs">
              Session: {sessionId.substring(0, 8)}...
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ProductsScreen;
