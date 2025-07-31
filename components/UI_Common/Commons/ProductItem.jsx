import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";
import { GradientView } from "../Gradients/GradientView";

export default function ProductItem({
  title,
  subtitle,
  matchPercentage,
  description,
  price,
  priorityLevel,
  image,
  onProductClick,
}) {
  return (
    <View className="my-3 overflow-hidden bg-background rounded-2xl relative">
      <Pressable
        onPress={onProductClick}
        android_ripple={{ color: Colors.primary100 }}
        className="flex-row"
      >
        <View className="absolute left-0 top-0 bottom-0 w-28">
          <Image
            source={{ uri: image }}
            className="w-full h-full rounded-tl-2xl rounded-bl-2xl"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1 px-4 py-4 pl-[110px]">
          <View className="flex-row justify-between mb-1">
            <View className="flex-1 mr-2">
              <Text className="font-bold text-base">{title}</Text>
              <Text className="text-xs text-textTertiary">{subtitle}</Text>
            </View>

            <View className="">
              <GradientView preset="purpleToPink3" style={{ borderRadius: 18 }}>
                <View className="flex-row items-center px-2 justify-center">
                  <Ionicons name="star" size={14} color={Colors.textLight} />
                  <Text className="text-xs font-medium text-textLight p-1 align-middle">
                    {matchPercentage}% Match
                  </Text>
                </View>
              </GradientView>
            </View>
          </View>

          <View className="mb-2">
            <Text className="text-sm text-textSecondary" numberOfLines={2}>
              {description}
            </Text>
          </View>

          <View className="flex-row justify-between items-center mt-auto">
            <View className="flex-row items-end gap-1">
              <Text className="font-bold text-md">${price}</Text>
              <Text
                className={`text-xs ${priorityLevel ? (priorityLevel == "High" ? "text-highPriority" : "text-mediumPriority") : "text-textSecondary"}  align-bottom`}
              >
                • {priorityLevel} Priority
              </Text>
            </View>

            <Pressable
              hitSlop={8}
              android_ripple={{
                color: Colors.primary100,
                borderless: true,
                radius: 20,
              }}
            >
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={Colors.primary500}
              />
            </Pressable>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
