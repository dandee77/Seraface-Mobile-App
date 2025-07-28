import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";
import Colors from "../../../constants/colors";
import { GradientView } from "../../UI_Common/Gradients/GradientView";

export default function InfoContainer({ icon, title, description }) {
  return (
    <View className="flex-row bg-background my-2 p-5 rounded-2xl border-gray-100 border-2 shadow-slate-500 gap-4">
      <GradientView
        preset="purple"
        direction={"topToBottom"}
        style={{ borderRadius: 8 }}
      >
        <View className="pt-4 px-3 justify-center items-center">
          <Ionicons name={icon} size={30} color={Colors.textLight} />
        </View>
      </GradientView>

      <View className="flex-col flex-1">
        <Text className="font-semibold text-lg">{title}</Text>
        <Text className="text-md text-textSecondary">{description}</Text>
      </View>
    </View>
  );
}
