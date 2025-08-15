import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./customBaseQuery";

console.log("🌐 API Base URL configured");

export const skincareApi = createApi({
  reducerPath: "skincareApi",
  baseQuery,
  tagTypes: ["FormAnalysis", "ImageAnalysis", "Recommendations", "Routines"],
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

    // Phase 2: Image Analysis (WEB ONLY)
    submitImageAnalysis: builder.mutation({
      query: ({ imageFile, sessionId }) => {
        console.log("📸 Preparing image analysis request for WEB:", {
          sessionId,
          imageFile: {
            uri: imageFile.uri,
            type: imageFile.type,
            name: imageFile.name,
            size: imageFile.fileSize,
            hasFileObject: !!imageFile.file,
          },
        });

        const formData = new FormData();

        // Web-only approach: Use the File object that was created in ImagePreview
        if (imageFile.file && imageFile.file instanceof File) {
          console.log("📸 Using File object for upload:", {
            name: imageFile.file.name,
            type: imageFile.file.type,
            size: imageFile.file.size,
          });

          formData.append("file", imageFile.file);
        } else {
          console.error(
            "📸 ERROR: No valid File object found in imageFile.file"
          );
          throw new Error("No valid file object for upload");
        }

        // Log FormData contents
        for (let [key, value] of formData.entries()) {
          console.log(`📸 FormData entry: ${key}`, value);
        }

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

    // Phase 3: Product Recommendations (EXISTING - DON'T CHANGE)
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

    getRecommendationsQuery: builder.query({
      query: (sessionId) =>
        `/api/v1/skincare/phase3/product-recommendations?session_id=${encodeURIComponent(sessionId)}`,
      providesTags: ["Recommendations"],
      transformResponse: (response) => {
        console.log("🛍️ Product Recommendations Query Response:", response);
        return response;
      },
    }),

    // Phase 4: Routine Creation (NEW)
    getRoutineCreation: builder.mutation({
      query: (sessionId) => {
        console.log("🗓️ Fetching skincare routine for session:", sessionId);

        return {
          url: `/api/v1/skincare/phase4/routine-creation?session_id=${encodeURIComponent(sessionId)}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
      invalidatesTags: ["Routines"],
      transformResponse: (response) => {
        console.log("🗓️ Routine Creation Response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Routine Creation Error:", response);
        return {
          status: response.status,
          message: response.data?.message || "Failed to create routine",
          data: response.data,
          details: response.data?.detail,
        };
      },
    }),

    getRoutineQuery: builder.query({
      query: (sessionId) =>
        `/api/v1/skincare/phase4/routine-creation?session_id=${encodeURIComponent(sessionId)}`,
      providesTags: ["Routines"],
      transformResponse: (response) => {
        console.log("🗓️ Routine Query Response:", response);
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
  useGetRoutineCreationMutation,
  useGetRoutineQueryQuery,
} = skincareApi;
