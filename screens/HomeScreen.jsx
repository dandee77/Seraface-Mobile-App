// Example snippet for Home_Screen.jsx
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Text } from "react-native";
import { GradientView } from "../components/GradientView";

export default function HomeScreen() {
  const navigation = useNavigation();

  // Navigate to the first step
  const handleGetStarted = () => {
    navigation.navigate("SkinProfile");
  };

  return (
    <View className="flex-1 bg-background">
      {/* Existing home screen content */}

      {/* Get Started button */}
      <GradientView
        preset="primaryButton"
        className="rounded-full py-3 px-6 mx-4 mb-6 items-center"
      >
        <TouchableOpacity
          onPress={handleGetStarted}
          className="w-full items-center"
        >
          <Text className="text-textLight font-bold">Get Started</Text>
        </TouchableOpacity>
      </GradientView>
    </View>
  );
}
