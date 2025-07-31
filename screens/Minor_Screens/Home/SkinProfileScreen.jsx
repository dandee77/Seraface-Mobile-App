import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import TitleContainer from "../../../components/UI_Common/Commons/TitleContainer";
import SkinTypeList from "../../../components/Home_Screen/Phase1_SkinProfile/SkinTypeList";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import SkinInput from "../../../components/Home_Screen/Phase1_SkinProfile/SkinInput";

const SkinProfileScreen = ({ navigation }) => {
  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const [skinConditions, setSkinConditions] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [productExperiences, setProductExperiences] = useState([]);

  const handleAddSkinCondition = (condition) => {
    if (!skinConditions.includes(condition)) {
      setSkinConditions([...skinConditions, condition]);
    }
  };

  const handleRemoveSkinCondition = (condition) => {
    setSkinConditions(skinConditions.filter((item) => item !== condition));
  };

  const handleAddAllergy = (allergy) => {
    if (!allergies.includes(allergy)) {
      setAllergies([...allergies, allergy]);
    }
  };

  const handleRemoveAllergy = (allergy) => {
    setAllergies(allergies.filter((item) => item !== allergy));
  };

  const handleAddProductExperience = (product) => {
    if (!productExperiences.includes(product)) {
      setProductExperiences([...productExperiences, product]);
    }
  };

  const handleRemoveProductExperience = (product) => {
    setProductExperiences(
      productExperiences.filter((item) => item !== product)
    );
  };

  const handleNextButtonPressed = () => {
    // Save user input to state or context if needed
    navigation.navigate("ScanFace");
  };

  return (
    <ScrollView className="flex-1 px-8 py-6">
      <TitleContainer title={"Tell us about your skin"} />

      <SkinTypeList
        selectedSkinType={selectedSkinType}
        onSkinTypeChange={setSelectedSkinType}
      />

      <SkinInput
        title="Skin Conditions"
        placeholder="e.g., Acne, Rosacea, Hyperpigmentation"
        items={skinConditions}
        onAddItem={handleAddSkinCondition}
        onRemoveItem={handleRemoveSkinCondition}
      />

      <SkinInput
        title="Allergies"
        placeholder="e.g., Fragrance, Alcohol, Sulfates"
        items={allergies}
        onAddItem={handleAddAllergy}
        onRemoveItem={handleRemoveAllergy}
      />

      <SkinInput
        title="Product Experiences"
        placeholder="e.g., Cerave Moisturizer (good)"
        items={productExperiences}
        onAddItem={handleAddProductExperience}
        onRemoveItem={handleRemoveProductExperience}
      />

      <View className="mb-8">
        <NextButton
          text={"Next: Face Scan"}
          icon={"arrow-forward-outline"}
          onPress={handleNextButtonPressed}
        />
      </View>
    </ScrollView>
  );
};

export default SkinProfileScreen;
