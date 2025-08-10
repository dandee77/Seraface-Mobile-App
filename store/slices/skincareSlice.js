import { createSlice } from "@reduxjs/toolkit";
import { skincareApi } from "../api/skincareApi";

const initialState = {
  // Form data matching backend structure
  formData: {
    skin_type: [],
    skin_conditions: [],
    budget: "",
    allergies: [],
    product_experiences: [],
    goals: [],
    custom_goal: "",
  },

  // Image data
  imageData: null,

  // Analysis results
  analysisResults: null,

  // Recommendations
  recommendations: [],

  // Form submission state
  isFormSubmitted: false,
  lastSubmissionTime: null,

  // Image submission state
  isImageSubmitted: false,
  lastImageSubmissionTime: null,

  // Error handling
  errors: {
    form: null,
    image: null,
    general: null,
  },
};

const skincareSlice = createSlice({
  name: "skincare",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      state.errors.form = null; // Clear form errors when updating
    },

    setSkinType: (state, action) => {
      state.formData.skin_type = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
    },

    addSkinCondition: (state, action) => {
      if (!state.formData.skin_conditions.includes(action.payload)) {
        state.formData.skin_conditions.push(action.payload);
      }
    },

    removeSkinCondition: (state, action) => {
      state.formData.skin_conditions = state.formData.skin_conditions.filter(
        (condition) => condition !== action.payload
      );
    },

    addAllergy: (state, action) => {
      if (!state.formData.allergies.includes(action.payload)) {
        state.formData.allergies.push(action.payload);
      }
    },

    removeAllergy: (state, action) => {
      state.formData.allergies = state.formData.allergies.filter(
        (allergy) => allergy !== action.payload
      );
    },

    addGoal: (state, action) => {
      if (!state.formData.goals.includes(action.payload)) {
        state.formData.goals.push(action.payload);
      }
    },

    removeGoal: (state, action) => {
      state.formData.goals = state.formData.goals.filter(
        (goal) => goal !== action.payload
      );
    },

    addProductExperience: (state, action) => {
      state.formData.product_experiences.push(action.payload);
    },

    removeProductExperience: (state, action) => {
      state.formData.product_experiences =
        state.formData.product_experiences.filter(
          (_, index) => index !== action.payload
        );
    },

    setBudget: (state, action) => {
      state.formData.budget = action.payload;
    },

    setCustomGoal: (state, action) => {
      state.formData.custom_goal = action.payload;
    },

    setImageData: (state, action) => {
      state.imageData = action.payload;
      state.errors.image = null;
    },

    clearFormData: (state) => {
      state.formData = initialState.formData;
      state.isFormSubmitted = false;
      state.errors.form = null;
    },

    clearImageData: (state) => {
      state.imageData = null;
      state.errors.image = null;
      state.isImageSubmitted = false;
    },

    clearAnalysisResults: (state) => {
      state.analysisResults = null;
    },

    clearAllData: (state) => {
      return initialState;
    },

    setError: (state, action) => {
      const { type, message } = action.payload;
      state.errors[type] = message;
    },

    clearError: (state, action) => {
      const errorType = action.payload;
      if (errorType && state.errors[errorType]) {
        state.errors[errorType] = null;
      }
    },

    clearAllErrors: (state) => {
      state.errors = initialState.errors;
    },
  },

  extraReducers: (builder) => {
    // Handle form analysis results
    builder.addMatcher(
      skincareApi.endpoints.submitFormAnalysis.matchFulfilled,
      (state, action) => {
        state.isFormSubmitted = true;
        state.lastSubmissionTime = Date.now();
        state.errors.form = null;

        // Update form data with server response if needed
        if (action.payload.data) {
          state.formData = { ...state.formData, ...action.payload.data };
        }
      }
    );

    builder.addMatcher(
      skincareApi.endpoints.submitFormAnalysis.matchRejected,
      (state, action) => {
        state.errors.form = action.payload?.message || "Form submission failed";
        state.isFormSubmitted = false;
      }
    );

    // Handle image analysis results
    builder.addMatcher(
      skincareApi.endpoints.submitImageAnalysis.matchFulfilled,
      (state, action) => {
        state.isImageSubmitted = true;
        state.lastImageSubmissionTime = Date.now();
        state.errors.image = null;
        state.analysisResults = action.payload;
      }
    );

    builder.addMatcher(
      skincareApi.endpoints.submitImageAnalysis.matchRejected,
      (state, action) => {
        state.errors.image = action.payload?.message || "Image analysis failed";
        state.isImageSubmitted = false;
      }
    );
  },
});

export const {
  updateFormData,
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
  setImageData,
  clearFormData,
  clearImageData,
  clearAnalysisResults,
  clearAllData,
  setError,
  clearError,
  clearAllErrors,
} = skincareSlice.actions;

export default skincareSlice.reducer;
