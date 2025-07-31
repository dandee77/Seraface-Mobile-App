import { View, Text, FlatList } from "react-native";
import { Glasses, Sparkle, Sparkles } from "lucide-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";

import Colors from "../../constants/colors";
import NextButton from "../../components/UI_Common/Buttons/NextButton";
import InfoContainer from "../../components/Home_Screen/Main_Home/InfoContainer";
import { GradientText } from "../../components/UI_Common/Gradients/GradientText";
import { GradientView } from "../../components/UI_Common/Gradients/GradientView";
import { useEffect } from "react";

const infoData = [
  {
    id: 1,
    icon: "clipboard-outline",
    title: "Personalized Recommendations",
    description:
      "Get product reccomendations based on your unique skin profile",
  },
  {
    id: 2,
    icon: "camera-outline",
    title: "AI Skin Analysis",
    description: "Upload a selfie for advanced skin condition analysis",
  },
  {
    id: 3,
    icon: "color-wand-outline",
    title: "Custom Routines",
    description: "Build the perfect skincare routine for your needs",
  },
];

export default function HomeScreen({ navigation }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 10000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleNextButtonPressed = () => {
    navigation.navigate("SkinProfile");
  };

  return (
    <View className="flex-col px-8 py-6">
      <View className="items-center justify-center w-full my-3">
        <Animated.View
          className="rounded-full overflow-hidden"
          style={[{ width: 100, height: 100 }, animatedStyle]}
        >
          <GradientView
            className="items-center justify-center w-full h-full"
            preset="logoGradient"
          >
            <Sparkles size={48} color={Colors.background} />
          </GradientView>
        </Animated.View>
      </View>

      <View className="items-center gap-2 my-3">
        <GradientText
          text={"Seraface AI"}
          preset={"purpleToPink"}
          centerText={true}
          style={{ fontSize: 30 }}
        />
        <Text className="text-center text-textSecondary text-lg">
          Your AI-powered skincare companion
        </Text>
      </View>

      <FlatList
        className="my-3"
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
      <NextButton
        text={"Get Started"}
        icon={"arrow-forward-outline"}
        onPress={handleNextButtonPressed}
      />
    </View>
  );
}
