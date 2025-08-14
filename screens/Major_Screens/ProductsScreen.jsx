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

  // UPDATED: Reduced mock data to show only 1 product per category (max 3 total)
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
    {
      title: "Niacinamide 10% + Zinc 1%",
      subtitle: "Treatment Serum",
      matchPercentage: 95,
      description: "Reduces blemishes and regulates oil production",
      price: 299.0,
      priorityLevel: "High",
      image: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=Serum",
      productData: {
        product_data: {
          title: "Niacinamide 10% + Zinc 1%",
          price: "₱299.00",
          thumbnail:
            "https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Serum",
          rating: 4.6,
          reviews: 890,
          store: "The Ordinary",
          product_link: "https://example.com/niacinamide-serum",
          detailed_description:
            "High-strength vitamin and mineral blemish formula",
          media: [
            {
              type: "image",
              link: "https://via.placeholder.com/400x400/4CAF50/FFFFFF?text=Serum",
            },
          ],
        },
        recommendation_context: {
          category: "treatment",
          recommended_price: "₱280.00",
          user_context: {
            skin_type: ["oily", "combination"],
            skin_conditions: ["acne", "large pores"],
            goals: ["reduce blemishes", "control oil"],
          },
          ai_recommended: true,
        },
      },
    },
    {
      title: "Hyaluronic Acid Moisturizer",
      subtitle: "Daily Moisturizer",
      matchPercentage: 92,
      description: "Provides long-lasting hydration without clogging pores",
      price: 189.0,
      priorityLevel: "High",
      image:
        "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=Moisturizer",
      productData: {
        product_data: {
          title: "Hyaluronic Acid Moisturizer",
          price: "₱189.00",
          thumbnail:
            "https://via.placeholder.com/300x300/2196F3/FFFFFF?text=Moisturizer",
          rating: 4.7,
          reviews: 1150,
          store: "Skincare Plus",
          product_link: "https://example.com/ha-moisturizer",
          detailed_description:
            "Lightweight, non-comedogenic formula with hyaluronic acid",
          media: [
            {
              type: "image",
              link: "https://via.placeholder.com/400x400/2196F3/FFFFFF?text=Moisturizer",
            },
          ],
        },
        recommendation_context: {
          category: "moisturizer",
          recommended_price: "₱180.00",
          user_context: {
            skin_type: ["dry", "combination"],
            skin_conditions: ["dehydration"],
            goals: ["hydrate skin", "strengthen barrier"],
          },
          ai_recommended: true,
        },
      },
    },
  ];

  // UPDATED: Transform backend recommendations with strict limits
  useEffect(() => {
    const transformRecommendations = () => {
      if (
        recommendations?.products &&
        Object.keys(recommendations.products).length > 0
      ) {
        console.log(
          "🛍️ Transforming limited backend recommendations:",
          recommendations
        );

        const transformedProducts = [];

        // UPDATED: Process each category but limit to 1 product per category
        Object.entries(recommendations.products).forEach(
          ([category, products]) => {
            if (Array.isArray(products) && products.length > 0) {
              // Only take the first product from each category
              const product = products[0];

              transformedProducts.push({
                title: product.name,
                subtitle: category.charAt(0).toUpperCase() + category.slice(1),
                matchPercentage: 90 + Math.floor(Math.random() * 10), // Random match percentage 90-99%
                description: `Top recommended ${category} product for your skin profile`,
                price: parseFloat(product.price.replace(/[^\d.-]/g, "")) || 0,
                priorityLevel: "High", // All are high priority since they're the top picks
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
                    detailed_description: `This ${category} product has been specially recommended as the top choice for your skin profile based on AI analysis.`,
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

              console.log(`✅ Added top ${category} product: ${product.name}`);
            }
          }
        );

        console.log(
          `✅ Total transformed products: ${transformedProducts.length} (limited from backend)`
        );
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

  // Calculate total categories for display
  const totalCategories = isUsingBackendData
    ? Object.keys(recommendations.products).length
    : mockProductRecommendations.length;

  return (
    <View className="flex-1">
      <View className="px-8 pt-6">
        <TitleContainer
          title="Your Top Recommendations"
          description={
            isUsingBackendData
              ? `Latest AI-curated picks • ${totalProducts} top products from ${totalCategories} categories`
              : "Curated skincare essentials for your skin profile"
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
      {/* {__DEV__ && (
        <View className="absolute top-20 right-4 bg-black/80 p-2 rounded">
          <Text className="text-white text-xs">
            Backend Data: {isUsingBackendData ? "✅" : "❌"}
          </Text>
          <Text className="text-white text-xs">
            Products: {totalProducts} (Limited)
          </Text>
          <Text className="text-white text-xs">
            Categories: {totalCategories}
          </Text>
          <Text className="text-white text-xs">
            Fresh: {recommendations?.isFresh ? "✅" : "❌"}
          </Text>
          {sessionId && (
            <Text className="text-white text-xs">
              Session: {sessionId.substring(0, 8)}...
            </Text>
          )}
        </View>
      )} */}
    </View>
  );
};

export default ProductsScreen;
