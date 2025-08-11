import { createSlice } from "@reduxjs/toolkit";
import { skincareApi } from "../api/skincareApi";

const initialState = {
  // Form data matching backend structure (EXISTING - DON'T CHANGE)
  formData: {
    skin_type: [],
    skin_conditions: [],
    budget: "",
    allergies: [],
    product_experiences: [],
    goals: [],
    custom_goal: "",
  },

  // Image data (EXISTING - DON'T CHANGE)
  imageData: null,

  // Analysis results (EXISTING - DON'T CHANGE)
  analysisResults: null,

  // Product Recommendations (FIXED)
  recommendations: {
    allocation: {},
    products: {},
    total_budget: null,
    future_recommendations: [],
    isLoading: false,
    error: null,
    lastFetchTime: null,
  },

  // Form submission state (EXISTING - DON'T CHANGE)
  isFormSubmitted: false,
  lastSubmissionTime: null,

  // Image submission state (EXISTING - DON'T CHANGE)
  isImageSubmitted: false,
  lastImageSubmissionTime: null,

  // Error handling (EXISTING - DON'T CHANGE)
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
    // Existing reducers (DON'T CHANGE THESE)
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      state.errors.form = null;
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

    // NEW: Recommendation management actions
    clearRecommendations: (state) => {
      state.recommendations = {
        allocation: {},
        products: {},
        total_budget: null,
        future_recommendations: [],
        isLoading: false,
        error: null,
        lastFetchTime: null,
      };
    },

    setRecommendationsLoading: (state, action) => {
      state.recommendations.isLoading = action.payload;
    },

    setRecommendationsError: (state, action) => {
      state.recommendations.error = action.payload;
      state.recommendations.isLoading = false;
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
    // Handle form analysis results (EXISTING - DON'T CHANGE)
    builder.addMatcher(
      skincareApi.endpoints.submitFormAnalysis.matchFulfilled,
      (state, action) => {
        state.isFormSubmitted = true;
        state.lastSubmissionTime = Date.now();
        state.errors.form = null;

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

    // Handle image analysis results (EXISTING - DON'T CHANGE)
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

    // Handle product recommendations (FIXED)
    builder.addMatcher(
      skincareApi.endpoints.getProductRecommendations.matchPending,
      (state) => {
        state.recommendations.isLoading = true;
        state.recommendations.error = null;
      }
    );

    builder.addMatcher(
      skincareApi.endpoints.getProductRecommendations.matchFulfilled,
      (state, action) => {
        state.recommendations.isLoading = false;
        state.recommendations.error = null;
        state.recommendations.lastFetchTime = Date.now();

        // FIXED: Properly serialize the data to avoid Immer errors
        const payload = action.payload;

        // Safely assign allocation (ensure it's a plain object)
        state.recommendations.allocation = payload.allocation
          ? JSON.parse(JSON.stringify(payload.allocation))
          : {};

        // Safely assign products (ensure it's a plain object)
        state.recommendations.products = payload.products
          ? JSON.parse(JSON.stringify(payload.products))
          : {};

        // Assign primitive values directly
        state.recommendations.total_budget = payload.total_budget || null;

        // Safely assign future recommendations (ensure it's a plain array)
        state.recommendations.future_recommendations =
          payload.future_recommendations
            ? JSON.parse(JSON.stringify(payload.future_recommendations))
            : [];
      }
    );

    builder.addMatcher(
      skincareApi.endpoints.getProductRecommendations.matchRejected,
      (state, action) => {
        state.recommendations.isLoading = false;
        state.recommendations.error =
          action.payload?.message || "Failed to get recommendations";
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
  clearRecommendations,
  setRecommendationsLoading,
  setRecommendationsError,
  clearAllData,
  setError,
  clearError,
  clearAllErrors,
} = skincareSlice.actions;

export default skincareSlice.reducer;
