import { ScrollView, View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import TitleContainer from "../../../components/UI_Common/Commons/TitleContainer";
import SkinTypeList from "../../../components/Home_Screen/Phase1_SkinProfile/SkinTypeList";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import SkinInput from "../../../components/Home_Screen/Phase1_SkinProfile/SkinInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../../constants/colors";
import ProductExperienceInput from "../../../components/Home_Screen/Phase1_SkinProfile/ProductExperienceInput";

const SkinProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  // Default values based on the provided data
  const [selectedSkinType, setSelectedSkinType] = useState("oily");
  const [skinConditions, setSkinConditions] = useState([
    "whiteheads",
    "dark spots",
    "acne",
    "uneven-skin tone",
  ]);
  const [budget, setBudget] = useState("500"); // Set default to 500 as a string for TextInput
  const [allergies, setAllergies] = useState(["alcohol", "fragrance"]);
  const [productExperiences, setProductExperiences] = useState([
    {
      product: "celeteque",
      experience: "neutral",
      reason: "saw improvements at first but stopped seeing after a week",
    },
  ]);
  const [goals, setGoals] = useState(["clear skin"]);
  const [customGoal, setCustomGoal] = useState("maintain and improve skin");

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

  const handleAddGoal = (goal) => {
    if (!goals.includes(goal)) {
      setGoals([...goals, goal]);
    }
  };

  const handleRemoveGoal = (goal) => {
    setGoals(goals.filter((item) => item !== goal));
  };

  const handleAddProductExperience = (experience) => {
    setProductExperiences([...productExperiences, experience]);
  };

  const handleRemoveProductExperience = (index) => {
    setProductExperiences(productExperiences.filter((_, i) => i !== index));
  };

  // Updated to handle text input
  const handleBudgetChange = (value) => {
    // Only allow numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      setBudget(value);
    }
  };

  const handleNextButtonPressed = () => {
    // Save user input to state or context if needed
    // Here we could save the full profile data including the new fields
    navigation.navigate("ScanFace");
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingBottom: Math.max(insets.bottom + 80, 100), // Added extra padding to ensure NextButton visibility
      }}
    >
      <View className="px-8 py-6">
        <TitleContainer title={"Tell us about your skin"} />

        <SkinTypeList
          selectedSkinType={selectedSkinType}
          onSkinTypeChange={setSelectedSkinType}
        />

        {/* Budget Input - Now using TextInput instead of Slider */}
        <View className="my-4">
          <Text className="text-[#444] font-medium mb-2">
            What's your budget (₱)?
          </Text>
          <View className="bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row justify-between items-center">
              <Text className="text-textSecondary">
                Monthly skincare budget
              </Text>
              <View className="flex-row items-center">
                <Text className="font-bold text-success-500 mr-1">₱</Text>
                <TextInput
                  className="border border-gray-200 bg-white rounded-lg py-1 px-3 min-w-[80px] text-right font-bold text-success-500"
                  keyboardType="numeric"
                  value={budget}
                  onChangeText={handleBudgetChange}
                  placeholder="500"
                  placeholderTextColor={Colors.textTertiary}
                />
              </View>
            </View>
          </View>
        </View>

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
          title="Skincare Goals"
          placeholder="e.g., Clear skin, Hydration, Anti-aging"
          items={goals}
          onAddItem={handleAddGoal}
          onRemoveItem={handleRemoveGoal}
        />

        {/* Custom Goal Input */}
        <View className="my-4">
          <Text className="text-[#444] font-medium mb-2">Custom Goal</Text>
          <TextInput
            className="border border-gray-200 bg-white rounded-xl py-3 px-4"
            placeholder="Describe your main skincare goal"
            value={customGoal}
            onChangeText={setCustomGoal}
            multiline
          />
        </View>

        {/* Product Experiences with extended details */}
        <View className="my-4">
          <Text className="text-[#444] font-medium mb-2">
            Product Experiences
          </Text>

          {productExperiences.map((experience, index) => (
            <View
              key={index}
              className="bg-white rounded-xl p-3 mb-3 border border-gray-200"
            >
              <View className="flex-row justify-between">
                <Text className="font-bold">{experience.product}</Text>
                <Text
                  className={
                    experience.experience === "positive"
                      ? "text-success-500"
                      : experience.experience === "negative"
                        ? "text-error-500"
                        : "text-primary-500"
                  }
                >
                  {experience.experience}
                </Text>
              </View>
              <Text className="text-textSecondary mt-1">
                {experience.reason}
              </Text>
              <Text
                className="text-primary-600 mt-2 text-right"
                onPress={() => handleRemoveProductExperience(index)}
              >
                Remove
              </Text>
            </View>
          ))}

          <ProductExperienceInput
            onAddExperience={handleAddProductExperience}
          />
        </View>

        <View className="mb-5">
          {/* Increased bottom margin for better visibility */}
          <NextButton
            text={"Next: Face Scan"}
            icon={"arrow-forward-outline"}
            onPress={handleNextButtonPressed}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SkinProfileScreen;
