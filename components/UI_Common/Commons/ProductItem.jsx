import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../../../constants/colors";
import { GradientView } from "../Gradients/GradientView";
import { useNavigation } from "@react-navigation/native";

export default function ProductItem({
  title,
  subtitle,
  matchPercentage,
  description,
  price,
  priorityLevel,
  image,
  onProductClick,
  productData, // Full backend product data
}) {
  const navigation = useNavigation();
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all possible image URLs from backend data
  const getAllImageUrls = () => {
    const urls = [];

    // Primary sources
    if (productData?.thumbnail) urls.push(productData.thumbnail);
    if (productData?.product_data?.thumbnail)
      urls.push(productData.product_data.thumbnail);

    // Media sources
    if (productData?.media) {
      productData.media.forEach((media) => {
        if (media.link) urls.push(media.link);
      });
    }
    if (productData?.product_data?.media) {
      productData.product_data.media.forEach((media) => {
        if (media.link) urls.push(media.link);
      });
    }

    // Fallback
    if (image) urls.push(image);

    // Final fallback
    urls.push(
      "https://via.placeholder.com/150x150/E5E7EB/9CA3AF?text=No+Image"
    );

    return urls;
  };

  // Get the current image URL to try
  const getCurrentImageUrl = () => {
    const urls = getAllImageUrls();
    return urls[currentImageIndex] || urls[urls.length - 1];
  };

  // Extract product title from backend data
  const getProductTitle = () => {
    if (productData?.title) return productData.title;
    if (productData?.product_data?.title) return productData.product_data.title;
    return title || "Product Name";
  };

  // Extract price from backend data
  const getProductPrice = () => {
    if (productData?.price) return productData.price.replace("₱", "");
    if (productData?.extracted_price)
      return productData.extracted_price.toString();
    if (productData?.product_data?.price)
      return productData.product_data.price.replace("₱", "");
    return price?.toString() || "0";
  };

  const handleProductPress = () => {
    if (onProductClick) {
      onProductClick();
    } else {
      // Navigate to ProductScreen with product data
      navigation.navigate("Product", {
        productData: productData || {
          product_data: {
            title: getProductTitle(),
            price: `₱${getProductPrice()}`,
            thumbnail: getProductImage(),
            rating: 4.5,
            reviews: 100,
            store: "Online Store",
            product_link: "https://example.com",
            detailed_description: description,
            media: [{ type: "image", link: getProductImage() }],
          },
          recommendation_context: {
            category: subtitle?.toLowerCase() || "skincare",
            ai_recommended: true,
            user_context: {
              skin_type: ["combination"],
              skin_conditions: ["acne", "oily skin"],
              goals: ["clear skin", "oil control"],
            },
          },
        },
      });
    }
  };

  return (
    <View className="my-2 mx-1 overflow-hidden bg-background rounded-2xl relative shadow-sm">
      <Pressable
        onPress={handleProductPress}
        android_ripple={{ color: Colors.primary100 }}
        className="flex-row min-h-[120px]"
      >
        {/* Product Image */}
        <View className="w-24 h-24 m-3 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <Image
            source={{ uri: getCurrentImageUrl() }}
            className="w-full h-full"
            resizeMode="cover"
            onError={(error) => {
              console.log(
                `Image ${currentImageIndex} failed:`,
                getCurrentImageUrl()
              );
              console.log("Error details:", error.nativeEvent?.error);

              // Try next image in the list
              const urls = getAllImageUrls();
              if (currentImageIndex < urls.length - 1) {
                setCurrentImageIndex((prev) => prev + 1);
              } else {
                setImageError(true);
              }
            }}
            onLoad={() => {
              console.log(
                "✅ Image loaded successfully:",
                getCurrentImageUrl()
              );
              setImageError(false);
            }}
          />

          {imageError && (
            <View className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <Ionicons name="image-outline" size={24} color="#9CA3AF" />
              <Text className="text-xs text-gray-500 mt-1">No Image</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="flex-1 p-3 pr-4 justify-between">
          {/* Title and Match */}
          <View className="flex-row justify-between items-start mb-2">
            <View className="flex-1 mr-2">
              <Text
                className="font-bold text-base leading-tight text-gray-900"
                numberOfLines={2}
                style={{ fontSize: 16, lineHeight: 20 }}
              >
                {getProductTitle()}
              </Text>
              {subtitle && (
                <Text
                  className="text-xs text-gray-500 mt-1"
                  style={{ fontSize: 12 }}
                >
                  {subtitle}
                </Text>
              )}
            </View>

            {matchPercentage && (
              <View className="ml-2">
                <GradientView
                  preset="purpleToPink3"
                  style={{
                    borderRadius: 12,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                  }}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={12} color={Colors.textLight} />
                    <Text
                      className="text-xs font-medium text-textLight ml-1"
                      style={{ fontSize: 10 }}
                    >
                      {matchPercentage}%
                    </Text>
                  </View>
                </GradientView>
              </View>
            )}
          </View>

          {/* Description */}
          {description && (
            <View className="mb-2">
              <Text
                className="text-sm text-gray-600 leading-relaxed"
                numberOfLines={2}
                style={{ fontSize: 13, lineHeight: 18 }}
              >
                {description}
              </Text>
            </View>
          )}

          {/* Price and Priority */}
          <View className="flex-row justify-between items-center mt-auto">
            <View className="flex-row items-center">
              <Text
                className="font-bold text-gray-900 mr-2"
                style={{ fontSize: 16 }}
              >
                ₱{getProductPrice()}
              </Text>
              {priorityLevel && (
                <Text
                  className={`text-xs ${
                    priorityLevel === "High"
                      ? "text-red-500"
                      : priorityLevel === "Medium"
                        ? "text-orange-500"
                        : "text-gray-500"
                  }`}
                  style={{ fontSize: 11 }}
                >
                  • {priorityLevel} Priority
                </Text>
              )}
            </View>

            <Pressable
              hitSlop={8}
              android_ripple={{
                color: Colors.primary100,
                borderless: true,
                radius: 16,
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={Colors.primary500}
              />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
