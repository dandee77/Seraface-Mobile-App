import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dynamic base URL based on environment
const getBaseUrl = () => {
  if (__DEV__) {
    // Development mode - use your laptop's IP
    // Replace this IP address with your laptop's actual local IP
    return "http://192.168.1.5:8000"; // ⚠️ CHANGE THIS TO YOUR LAPTOP'S IP
  } else {
    // Production mode - use your production API
    return "https://your-production-api.com";
  }
};

const BASE_URL = getBaseUrl();

console.log("🌐 API Base URL:", BASE_URL);

export const skincareApi = createApi({
  reducerPath: "skincareApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");

      // Add session ID if available
      const sessionId = getState().auth.sessionId;
      if (sessionId) {
        headers.set("X-Session-ID", sessionId);
      }

      return headers;
    },
  }),
  tagTypes: ["FormAnalysis", "ImageAnalysis", "Recommendations"],
  endpoints: (builder) => ({
    // Phase 1: Form Analysis
    submitFormAnalysis: builder.mutation({
      query: (formData) => ({
        url: "/api/v1/skincare/phase1/form-analysis",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["FormAnalysis"],
      transformResponse: (response) => {
        console.log("📊 Form Analysis Response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Form Analysis Error:", response);
        return {
          status: response.status,
          message: response.data?.message || "Form submission failed",
          data: response.data,
        };
      },
    }),

    // Phase 2: Image Analysis (for future implementation)
    submitImageAnalysis: builder.mutation({
      query: ({ imageData, sessionId }) => ({
        url: "/api/v1/skincare/phase2/image-analysis",
        method: "POST",
        body: {
          ...imageData,
          session_id: sessionId,
        },
      }),
      invalidatesTags: ["ImageAnalysis"],
    }),

    // Get recommendations (for future implementation)
    getRecommendations: builder.query({
      query: (sessionId) => `/api/v1/skincare/recommendations/${sessionId}`,
      providesTags: ["Recommendations"],
    }),
  }),
});

export const {
  useSubmitFormAnalysisMutation,
  useSubmitImageAnalysisMutation,
  useGetRecommendationsQuery,
} = skincareApi;
