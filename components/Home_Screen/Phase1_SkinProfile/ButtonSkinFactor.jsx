import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GradientView } from "../../../components/UI_Common/Gradients/GradientView";
import Colors from "../../../constants/colors";

export default function ButtonSkinFactor({ inputName, onRemove }) {
  return (
    <View className="mr-2 mb-2 overflow-hidden rounded-full">
      <GradientView preset="logoGradient" className="rounded-full">
        <View className="flex-row items-center py-1 px-3">
          <Text className="text-textLight text-sm mr-1">{inputName}</Text>
          <Pressable
            onPress={onRemove}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={16} color={Colors.textLight} />
          </Pressable>
        </View>
      </GradientView>
    </View>
  );
}
