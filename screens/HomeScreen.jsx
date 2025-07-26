import { View, Text, FlatList } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import NextButton from "../components/UI_Common/Buttons/NextButton";
import InfoContainer from "../components/Home_Screen/Main_Home/InfoContainer";

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
        <Text>Seraface AI</Text>
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

// // Example snippet for Home_Screen.jsx
// import { useNavigation } from "@react-navigation/native";
// import { View, TouchableOpacity, Text } from "react-native";
// import { GradientView } from "../components/GradientView";

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   // Navigate to the first step
//   const handleGetStarted = () => {
//     navigation.navigate("SkinProfile");
//   };

//   return (
//     <View className="flex-1 bg-background">
//       {/* Existing home screen content */}

//       {/* Get Started button */}
//       <GradientView
//         preset="primaryButton"
//         className="rounded-full py-3 px-6 mx-4 mb-6 items-center"
//       >
//         <TouchableOpacity
//           onPress={handleGetStarted}
//           className="w-full items-center"
//         >
//           <Text className="text-textLight font-bold">Get Started</Text>
//         </TouchableOpacity>
//       </GradientView>
//     </View>
//   );
// }
