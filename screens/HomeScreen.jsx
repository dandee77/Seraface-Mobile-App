import { View, Text, FlatList } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import NextButton from "../components/UI_Common/Buttons/NextButton";
import InfoContainer from "../components/Home_Screen/Main_Home/InfoContainer";
import { GradientText } from "../components/UI_Common/Gradients/GradientText";

const infoData = [
  {
    id: 1,
    icon: "clipboard",
    title: "Personalized Recommendations",
    description:
      "Get product reccomendations based on your unique skin profile",
  },
  {
    id: 2,
    icon: "camera",
    title: "AI Skin Analysis",
    description: "Upload a selfie for advanced skin condition analysis",
  },
  {
    id: 3,
    icon: "color-wand-outline",
    title: "Personalized Recommendations",
    description:
      "Get product reccomendations based on your unique skin profile",
  },
];

export default function HomeScreen() {
  return (
    <View className="flex-col">
      <View>
        <Ionicons name="" />
      </View>
      <View>
        <GradientText text={"Seraface AI"} size={24} preset={"purpleToPink"} />
        <Text>Your AI-powered skincare companion</Text>
      </View>
      <FlatList
        data={infoData}
        renderItem={({ item }) => (
          <InfoContainer
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        )}
      />
      <NextButton text={"Get Started"} icon={"arrow-forward-outline"} />
    </View>
  );
}
