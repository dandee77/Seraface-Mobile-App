import "./global.css";
import { StatusBar } from "expo-status-bar";
import { View, Text, SafeAreaView } from "react-native";
import { GradientView } from "./components/GradientView";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      {/* Header with gradient background */}
      <GradientView preset="headerGradient" className="p-6">
        <Text className="text-textLight text-2xl font-bold">Seraface</Text>
        <Text className="text-textLight opacity-80">
          Your skincare companion
        </Text>
      </GradientView>

      <View className="flex-1 bg-background items-center justify-center p-4">
        <Text className="text-primary-600 text-xl font-bold">
          Welcome to Seraface Mobile!
        </Text>
        <Text className="text-textSecondary mt-2 mb-6">
          Your AI-powered skincare companion
        </Text>

        {/* Testing different gradient presets */}
        <GradientView
          preset="primaryButton"
          className="w-full rounded-full py-3 px-6 items-center mb-4"
        >
          <Text className="text-textLight font-bold">Primary Button</Text>
        </GradientView>

        <GradientView
          preset="secondaryButton"
          className="w-full rounded-full py-3 px-6 items-center mb-4"
        >
          <Text className="text-textLight font-bold">Secondary Button</Text>
        </GradientView>

        <View className="flex-row justify-between w-full mt-4">
          <GradientView
            preset="matchHighBadge"
            className="rounded-full px-3 py-1"
          >
            <Text className="text-textLight font-medium">98% Match</Text>
          </GradientView>

          <GradientView
            preset="matchMediumBadge"
            className="rounded-full px-3 py-1"
          >
            <Text className="text-textLight font-medium">90% Match</Text>
          </GradientView>
        </View>
      </View>

      <StatusBar style="light" />
    </SafeAreaView>
  );
}
