import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./customBaseQuery";

console.log("🌐 API Base URL configured");

export const skincareApi = createApi({
  reducerPath: "skincareApi",
  baseQuery,
  tagTypes: ["FormAnalysis", "ImageAnalysis", "Recommendations"],
  endpoints: (builder) => ({
    // Phase 1: Form Analysis (EXISTING - DON'T CHANGE)
    submitFormAnalysis: builder.mutation({
      query: (formData) => {
        console.log("📤 Submitting form data:", formData);

        return {
          url: "/api/v1/skincare/phase1/form-analysis",
          method: "POST",
          body: formData,
        };
      },
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

    // Phase 2: Image Analysis (EXISTING - DON'T CHANGE)
    submitImageAnalysis: builder.mutation({
      query: ({ imageFile, sessionId }) => {
        console.log("📸 Preparing image analysis request:", {
          sessionId,
          imageFile: {
            uri: imageFile.uri,
            type: imageFile.type,
            name: imageFile.name,
            size: imageFile.fileSize,
          },
        });

        const formData = new FormData();

        formData.append("file", {
          uri: imageFile.uri,
          type: imageFile.type || "image/jpeg",
          name: imageFile.name || `face_image_${Date.now()}.jpg`,
        });

        console.log("📸 FormData created with file:", {
          fileName: imageFile.name || `face_image_${Date.now()}.jpg`,
          fileType: imageFile.type || "image/jpeg",
          fileUri: imageFile.uri,
        });

        return {
          url: `/api/v1/skincare/phase2/image-analysis?session_id=${encodeURIComponent(sessionId)}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["ImageAnalysis"],
      transformResponse: (response) => {
        console.log("📊 Image Analysis Response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Image Analysis Error:", response);
        console.error("❌ Error details:", response.data?.detail);
        return {
          status: response.status,
          message: response.data?.message || "Image analysis failed",
          data: response.data,
          details: response.data?.detail,
        };
      },
    }),

    // Phase 3: Product Recommendations (NEW)
    getProductRecommendations: builder.mutation({
      query: (sessionId) => {
        console.log(
          "🛍️ Fetching product recommendations for session:",
          sessionId
        );

        return {
          url: `/api/v1/skincare/phase3/product-recommendations?session_id=${encodeURIComponent(sessionId)}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["Recommendations"],
      transformResponse: (response) => {
        console.log("🛍️ Product Recommendations Response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Product Recommendations Error:", response);
        return {
          status: response.status,
          message: response.data?.message || "Failed to get recommendations",
          data: response.data,
          details: response.data?.detail,
        };
      },
    }),

    // Alternative Query version (if you prefer using query instead of mutation)
    getRecommendationsQuery: builder.query({
      query: (sessionId) =>
        `/api/v1/skincare/phase3/product-recommendations?session_id=${encodeURIComponent(sessionId)}`,
      providesTags: ["Recommendations"],
      transformResponse: (response) => {
        console.log("🛍️ Product Recommendations Query Response:", response);
        return response;
      },
    }),
  }),
});

export const {
  useSubmitFormAnalysisMutation,
  useSubmitImageAnalysisMutation,
  useGetProductRecommendationsMutation,
  useGetRecommendationsQueryQuery,
} = skincareApi;
