import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { GradientView } from "../../../components/UI_Common/Gradients/GradientView";
import { GradientText } from "../../../components/UI_Common/Gradients/GradientText";
import Colors from "../../../constants/colors";

export default function ProductScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { productData } = route.params || {};
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Mock data for demonstration (use route.params in real implementation)
  const mockProductData = {
    product_data: {
      title: "Prosource Extra Virgin Coconut Oil",
      price: "₱188.50",
      thumbnail:
        "https://serpapi.com/searches/6898af3ea1de12d23832d321/images/7d6c21de91cb08235d59aa03380cd002f6e45cc66996e83a62fb52222f1d3970.webp",
      rating: 4.9,
      reviews: 876,
      store: "Watsons Philippines",
      product_link:
        "https://www.google.com/shopping/product/7616727553814418590?gl=ph",
      extracted_price: 188.5,
      detailed_description:
        "Experience farm fresh and organic extra virgin coconut oil of Prosource. Has sodium, protein, and total carbohydrates, dietary supplements. Comes from real-fresh and fully-mature coconuts. With many nutrients that can contribute to your health and a good diet. Helps improve cognitive function, metabolism, and hair and skin health.",
      media: [
        {
          type: "image",
          link: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRdIp0R3oVW-UI0cxul_3faKu2UY4d6sYRzVuAh92ErpSoKgiRuZSB1R6g4ZnzjCCr5uOMrfU-p84y53GpTjcRXUdb4_QFO4A&usqp=CAY",
        },
        {
          type: "image",
          link: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRBrihCp-cdNCe23X-ZabqkvOy9Vds4PMeMXHllqov_SPF0ddEM9g_fIArx0ZORsViMOv8tG5_mnjfg-FTBmDnmeQ_gFQxRIw&usqp=CAY",
        },
        {
          type: "image",
          link: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTaXDoVCuaRgHmi3esrFwin3caftU6O90HAbZN1LLitlqImoFR35DuyJbwggaxGJduBAWl9en_jBqvPvrTfidz9pRnpkPJm5Q&usqp=CAY",
        },
      ],
    },
    recommendation_context: {
      category: "treatment",
      recommended_price: "₱5.00",
      user_context: {
        skin_type: ["dry", "sensitive"],
        skin_conditions: ["eczema", "redness", "flaky skin"],
        budget: "$50",
        goals: ["reduce redness", "hydrate skin", "prevent flakiness"],
      },
      ai_recommended: true,
    },
  };

  const product = productData || mockProductData;
  const { product_data, recommendation_context } = product;

  const handleOpenProductLink = async () => {
    try {
      const supported = await Linking.canOpenURL(product_data.product_link);
      if (supported) {
        await Linking.openURL(product_data.product_link);
      } else {
        alert("Cannot open product link");
      }
    } catch (error) {
      alert("Error opening product link");
    }
  };

  const handleAddToCart = () => {
    // Handle add to cart functionality
    alert("Added to cart!");
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color={Colors.primary500} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons
          key="half"
          name="star-half"
          size={16}
          color={Colors.primary500}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={16}
          color={Colors.textTertiary}
        />
      );
    }

    return stars;
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingBottom: Math.max(insets.bottom + 100, 120),
      }}
    >
      <View className="px-6 py-4">
        {/* Product Images Section */}
        <View className="mb-6">
          <View className="bg-white rounded-2xl p-4 shadow-sm">
            <Image
              source={{
                uri:
                  product_data.media?.[selectedImageIndex]?.link ||
                  product_data.thumbnail,
              }}
              className="w-full h-80 rounded-xl"
              resizeMode="contain"
            />
          </View>

          {/* Image Thumbnails */}
          {product_data.media && product_data.media.length > 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-4"
            >
              <View className="flex-row gap-3 px-2">
                {product_data.media.map((media, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-primary-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      source={{ uri: media.link }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          )}
        </View>

        {/* Product Info Section */}
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
          {/* AI Recommended Badge - Positioned at top right */}
          {recommendation_context?.ai_recommended && (
            <View className="absolute top-3 right-3 z-10">
              <GradientView
                preset="purpleToPink3"
                className="px-3 py-1 rounded-full"
                style={{ borderRadius: 16 }}
              >
                <View className="flex-row items-center">
                  <Ionicons
                    name="sparkles"
                    size={12}
                    color={Colors.textLight}
                  />
                  <Text className="text-textLight text-xs font-medium ml-1">
                    AI Recommended
                  </Text>
                </View>
              </GradientView>
            </View>
          )}

          {/* Product Title with proper wrapping */}
          <View className="my-3">
            <Text
              className="text-2xl font-bold"
              style={{
                lineHeight: 30,
                color: Colors.primary600,
              }}
              numberOfLines={3}
            >
              {product_data.title}
            </Text>
          </View>

          {/* Price Section */}
          <View className="flex-row items-center mb-4">
            <Text className="text-3xl font-bold text-success-600">
              {product_data.price}
            </Text>
            {recommendation_context?.recommended_price && (
              <View className="ml-3 bg-success-100 px-2 py-1 rounded-lg">
                <Text className="text-success-700 text-xs font-medium">
                  Recommended: {recommendation_context.recommended_price}
                </Text>
              </View>
            )}
          </View>

          {/* Rating and Reviews */}
          <View className="flex-row items-center mb-4">
            <View className="flex-row items-center mr-3">
              {renderStars(product_data.rating)}
            </View>
            <Text className="text-textSecondary text-sm">
              {product_data.rating} ({product_data.reviews} reviews)
            </Text>
          </View>

          {/* Store Info */}
          <View className="flex-row items-center mb-4">
            <Ionicons
              name="storefront-outline"
              size={16}
              color={Colors.textSecondary}
            />
            <Text className="text-textSecondary ml-2">
              Available at {product_data.store}
            </Text>
          </View>
        </View>

        {/* Description Section */}
        <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
          <Text className="text-lg font-bold mb-3">Product Description</Text>
          <Text className="text-textSecondary leading-6">
            {product_data.detailed_description || product_data.description}
          </Text>
        </View>

        {/* Recommendation Context */}
        {recommendation_context && (
          <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <Text className="text-lg font-bold mb-3">
              Why This Product Is Perfect For You
            </Text>

            {/* Category */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-1">
                Category
              </Text>
              <View className="bg-primary-100 px-3 py-2 rounded-lg self-start">
                <Text className="text-primary-700 font-medium capitalize">
                  {recommendation_context.category}
                </Text>
              </View>
            </View>

            {/* Skin Type Match */}
            {recommendation_context.user_context?.skin_type && (
              <View className="mb-4">
                <Text className="text-sm font-medium text-textSecondary mb-2">
                  Matches Your Skin Type
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {recommendation_context.user_context.skin_type.map(
                    (type, index) => (
                      <View
                        key={index}
                        className="bg-success-100 px-3 py-1 rounded-full"
                      >
                        <Text className="text-success-700 text-sm capitalize">
                          {type}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}

            {/* Addresses Conditions */}
            {recommendation_context.user_context?.skin_conditions && (
              <View className="mb-4">
                <Text className="text-sm font-medium text-textSecondary mb-2">
                  Addresses Your Concerns
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {recommendation_context.user_context.skin_conditions.map(
                    (condition, index) => (
                      <View
                        key={index}
                        className="bg-warning-100 px-3 py-1 rounded-full"
                      >
                        <Text className="text-warning-700 text-sm capitalize">
                          {condition}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}

            {/* Goals */}
            {recommendation_context.user_context?.goals && (
              <View>
                <Text className="text-sm font-medium text-textSecondary mb-2">
                  Helps Achieve Your Goals
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {recommendation_context.user_context.goals.map(
                    (goal, index) => (
                      <View
                        key={index}
                        className="bg-info-100 px-3 py-1 rounded-full"
                      >
                        <Text className="text-info-700 text-sm capitalize">
                          {goal}
                        </Text>
                      </View>
                    )
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Fixed Bottom Actions */}
      <View
        className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200"
        style={{ paddingBottom: Math.max(insets.bottom, 20) }}
      >
        <View className="px-6 py-4 flex-row gap-3">
          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 bg-gray-100 rounded-xl py-4 items-center justify-center"
          >
            <View className="flex-row items-center">
              <Ionicons
                name="cart-outline"
                size={20}
                color={Colors.textSecondary}
              />
              <Text className="ml-2 font-medium text-textSecondary">
                Add to Cart
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOpenProductLink} className="flex-1">
            <GradientView
              preset="purpleToPink3"
              className="rounded-xl py-4 items-center justify-center"
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="open-outline"
                  size={20}
                  color={Colors.textLight}
                />
                <Text className="ml-2 font-medium text-textLight">
                  View Product
                </Text>
              </View>
            </GradientView>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
