import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./customBaseQuery";

console.log("🌐 API Base URL configured");

export const skincareApi = createApi({
  reducerPath: "skincareApi",
  baseQuery,
  tagTypes: ["FormAnalysis", "ImageAnalysis", "Recommendations"],
  endpoints: (builder) => ({
    // Phase 1: Form Analysis
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

    // Phase 2: Image Analysis - CORRECTED VERSION
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

        // Create FormData for the file upload
        const formData = new FormData();

        // Append the file with the exact format React Native expects
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
          // Session ID goes in query parameters as shown in your Swagger UI
          url: `/api/v1/skincare/phase2/image-analysis?session_id=${encodeURIComponent(sessionId)}`,
          method: "POST",
          body: formData,
          // Let the browser set the Content-Type with boundary for multipart/form-data
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
