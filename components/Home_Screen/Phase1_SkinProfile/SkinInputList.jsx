import { View } from "react-native";
import React from "react";
import ButtonSkinFactor from "./ButtonSkinFactor";

export default function SkinInputList({ items, onRemove }) {
  if (!items || items.length === 0) return null;

  return (
    <View className="flex-row flex-wrap mt-2">
      {items.map((item, index) => (
        <ButtonSkinFactor
          key={index}
          inputName={item}
          onRemove={() => onRemove(item)}
        />
      ))}
    </View>
  );
}
