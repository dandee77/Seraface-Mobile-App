import { View } from "react-native";
import { GradientText } from "../Gradients/GradientText";
import { GradientIcon } from "../Gradients/GradientIcon";

export const GradientHeaderTitle = ({
  title,
  iconName = "sparkles",
  preset = "purpleToPink",
}) => {
  return (
    <View className="flex-row items-center  min-h-full">
      {iconName && (
        <GradientIcon
          name={iconName}
          size={28}
          preset="purpleToPink"
          style={{ marginRight: 8 }}
        />
      )}
      <GradientText text={title} preset={preset} />
    </View>
  );
};
