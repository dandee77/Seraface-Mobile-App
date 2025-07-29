import { View, Text } from "react-native";
import { GradientText } from "../Gradients/GradientText";

export default function TitleContainer({ title, description }) {
  return (
    <View>
      <GradientText text={title} preset={"purpleToPink3"} />
      {description && <Text>{description}</Text>}
    </View>
  );
}
