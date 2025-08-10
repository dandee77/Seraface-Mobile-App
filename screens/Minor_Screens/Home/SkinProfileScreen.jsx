import { ScrollView, View, Text, TextInput, Alert } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TitleContainer from "../../../components/UI_Common/Commons/TitleContainer";
import SkinTypeList from "../../../components/Home_Screen/Phase1_SkinProfile/SkinTypeList";
import NextButton from "../../../components/UI_Common/Buttons/NextButton";
import SkinInput from "../../../components/Home_Screen/Phase1_SkinProfile/SkinInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Colors from "../../../constants/colors";
import ProductExperienceInput from "../../../components/Home_Screen/Phase1_SkinProfile/ProductExperienceInput";

// Redux imports
import {
  setSkinType,
  addSkinCondition,
  removeSkinCondition,
  addAllergy,
  removeAllergy,
  addGoal,
  removeGoal,
  addProductExperience,
  removeProductExperience,
  setBudget,
  setCustomGoal,
  clearError,
} from "../../../store/slices/skincareSlice";
import {
  setSessionId,
  setCurrentPhase,
  setFormIndex,
} from "../../../store/slices/authSlice";
import { useSubmitFormAnalysisMutation } from "../../../store/api/skincareApi";

const SkinProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();

  // Redux state
  const formData = useSelector((state) => state.skincare.formData);
  const formError = useSelector((state) => state.skincare.errors.form);
  const sessionId = useSelector((state) => state.auth.sessionId);

  // RTK Query mutation
  const [
    submitFormAnalysis,
    { isLoading, error: mutationError, isSuccess, data: responseData },
  ] = useSubmitFormAnalysisMutation();

  // Destructure form data for easier access
  const {
    skin_type,
    skin_conditions,
    budget,
    allergies,
    product_experiences,
    goals,
    custom_goal,
  } = formData;

  // Handle form submission success
  useEffect(() => {
    if (isSuccess && responseData) {
      console.log("✅ Form submission successful:", responseData);

      // Store session ID and update phase
      dispatch(setSessionId(responseData.session_id));
      dispatch(setFormIndex(responseData.form_index));
      dispatch(setCurrentPhase("scan"));

      // Navigate to next screen
      navigation.navigate("ScanFace");
    }
  }, [isSuccess, responseData, dispatch, navigation]);

  // Handle errors
  useEffect(() => {
    if (mutationError) {
      console.error("❌ Form submission error:", mutationError);
      Alert.alert(
        "Submission Error",
        mutationError.message || "Failed to submit form. Please try again.",
        [{ text: "OK", onPress: () => dispatch(clearError("form")) }]
      );
    }
  }, [mutationError, dispatch]);

  // Event handlers
  const handleSkinTypeChange = (type) => {
    dispatch(setSkinType([type])); // Backend expects array
  };

  const handleAddSkinCondition = (condition) => {
    dispatch(addSkinCondition(condition.toLowerCase()));
  };

  const handleRemoveSkinCondition = (condition) => {
    dispatch(removeSkinCondition(condition));
  };

  const handleAddAllergy = (allergy) => {
    dispatch(addAllergy(allergy.toLowerCase()));
  };

  const handleRemoveAllergy = (allergy) => {
    dispatch(removeAllergy(allergy));
  };

  const handleAddGoal = (goal) => {
    dispatch(addGoal(goal.toLowerCase()));
  };

  const handleRemoveGoal = (goal) => {
    dispatch(removeGoal(goal));
  };

  const handleAddProductExperience = (experience) => {
    // Transform to match backend structure
    const formattedExperience = {
      product: experience.product,
      experience: experience.experience,
      reason: experience.reason || null,
    };
    dispatch(addProductExperience(formattedExperience));
  };

  const handleRemoveProductExperience = (index) => {
    dispatch(removeProductExperience(index));
  };

  const handleBudgetChange = (value) => {
    // Only allow numeric input
    if (/^\d*\.?\d*$/.test(value)) {
      dispatch(setBudget(value));
    }
  };

  const handleCustomGoalChange = (goal) => {
    dispatch(setCustomGoal(goal));
  };

  // Form validation
  const validateForm = () => {
    if (skin_type.length === 0) {
      Alert.alert("Validation Error", "Please select your skin type.");
      return false;
    }

    if (!budget || budget.trim() === "") {
      Alert.alert("Validation Error", "Please enter your budget.");
      return false;
    }

    if (skin_conditions.length === 0) {
      Alert.alert(
        "Validation Error",
        "Please add at least one skin condition."
      );
      return false;
    }

    if (goals.length === 0 && (!custom_goal || custom_goal.trim() === "")) {
      Alert.alert(
        "Validation Error",
        "Please add at least one goal or custom goal."
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    // Clear any previous errors
    dispatch(clearError("form"));

    // Validate form
    if (!validateForm()) {
      return;
    }

    // Prepare data for submission
    const submissionData = {
      skin_type,
      skin_conditions,
      budget,
      allergies,
      product_experiences,
      goals,
      custom_goal,
    };

    console.log("📤 Submitting form data:", submissionData);

    try {
      await submitFormAnalysis(submissionData).unwrap();
    } catch (error) {
      console.error("❌ Submission failed:", error);
      // Error handling is done in useEffect above
    }
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerStyle={{
        paddingBottom: Math.max(insets.bottom + 100, 120),
      }}
    >
      <View className="px-8 py-6">
        <TitleContainer title={"Tell us about your skin"} />

        <SkinTypeList
          selectedSkinType={skin_type[0] || ""} // Pass first item or empty string
          onSkinTypeChange={handleSkinTypeChange}
        />

        {/* Budget Input */}
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
                  placeholder="800"
                  placeholderTextColor={Colors.textTertiary}
                />
              </View>
            </View>
          </View>
        </View>

        <SkinInput
          title="Skin Conditions"
          placeholder="e.g., Acne, Rosacea, Hyperpigmentation"
          items={skin_conditions}
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
            value={custom_goal}
            onChangeText={handleCustomGoalChange}
            multiline
          />
        </View>

        {/* Product Experiences */}
        <View className="my-4">
          <Text className="text-[#444] font-medium mb-2">
            Product Experiences
          </Text>

          {product_experiences.map((experience, index) => (
            <View
              key={index}
              className="bg-white rounded-xl p-3 mb-3 border border-gray-200"
            >
              <View className="flex-row justify-between">
                <Text className="font-bold">{experience.product}</Text>
                <Text
                  className={
                    experience.experience === "good"
                      ? "text-success-500"
                      : experience.experience === "bad"
                        ? "text-error-500"
                        : "text-primary-500"
                  }
                >
                  {experience.experience}
                </Text>
              </View>
              {experience.reason && (
                <Text className="text-textSecondary mt-1">
                  {experience.reason}
                </Text>
              )}
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

        {/* Error Display */}
        {(formError || mutationError) && (
          <View className="bg-error-100 border border-error-300 rounded-xl p-4 mb-4">
            <Text className="text-error-700 text-center">
              {formError || mutationError?.message}
            </Text>
          </View>
        )}

        {/* Submit Button */}
        <View className="mb-5">
          <NextButton
            text={isLoading ? "Submitting..." : "Next: Face Scan"}
            icon={isLoading ? "hourglass-outline" : "arrow-forward-outline"}
            onPress={handleSubmit}
            disabled={isLoading}
          />
        </View>

        {/* Debug Info (remove in production) */}
        {__DEV__ && sessionId && (
          <View className="mt-4 p-4 bg-gray-100 rounded-xl">
            <Text className="text-sm text-gray-600">
              Debug - Session ID: {sessionId}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default SkinProfileScreen;
