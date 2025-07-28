import { View } from "react-native";
import { GradientText } from "../Gradients/GradientText";
import { GradientView } from "../Gradients/GradientView";

export default function TabBarLabel({ text, focused }) {
  return (
    <View className="items-center justify-center w-full">
      <View className="w-full items-center justify-center">
        <GradientText
          text={text}
          focused={focused}
          style={{ fontSize: 13 }}
          centerText={true}
        />
      </View>
      {focused && (
        <View
          className="absolute overflow-hidden rounded-full"
          style={{ bottom: -16, left: -6, right: -6, height: 10 }}
        >
          <GradientView preset="purpleToPink" className="flex-1" />
        </View>
      )}
    </View>
  );
}
