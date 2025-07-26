import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

export default function InfoContainer({ icon, title, description }) {
  return (
    <View className="flex-row">
      <View>
        <Ionicons name={icon} size={24} />
      </View>
      <View className="flex-col flex-1">
        <Text>{title}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
}
