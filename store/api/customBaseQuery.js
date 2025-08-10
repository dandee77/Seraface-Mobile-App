import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Dynamic base URL based on environment
const getBaseUrl = () => {
  if (__DEV__) {
    return "http://192.168.1.5:8000"; // ⚠️ CHANGE THIS TO YOUR LAPTOP'S IP
  } else {
    return "https://your-production-api.com";
  }
};

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState, endpoint }) => {
    // Add session ID if available
    const sessionId = getState().auth.sessionId;
    if (sessionId) {
      headers.set("X-Session-ID", sessionId);
    }

    // IMPORTANT: Never set Content-Type for FormData requests
    // The browser will automatically set it with the correct boundary
    if (endpoint !== "submitImageAnalysis") {
      headers.set("Content-Type", "application/json");
    }

    console.log(
      "🌐 Request headers for endpoint",
      endpoint,
      ":",
      Object.fromEntries(headers.entries())
    );

    return headers;
  },
});

// Custom wrapper to handle logging and debugging
const customBaseQuery = async (args, api, extraOptions) => {
  console.log("🌐 Making request:", {
    url: args.url,
    method: args.method,
    endpoint: api.endpoint,
    bodyType: args.body?.constructor?.name,
    hasFormData: args.body instanceof FormData,
  });

  // Log FormData contents for debugging
  if (args.body instanceof FormData) {
    console.log("📦 FormData contents:");
    for (let [key, value] of args.body.entries()) {
      if (typeof value === "object" && value.uri) {
        console.log(`  ${key}:`, {
          uri: value.uri,
          type: value.type,
          name: value.name,
        });
      } else {
        console.log(`  ${key}:`, value);
      }
    }
  }

  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    console.error("❌ Request failed:", {
      status: result.error.status,
      data: result.error.data,
      originalStatus: result.error.originalStatus,
    });
  } else {
    console.log("✅ Request successful:", result.data?.status || "OK");
  }

  return result;
};

export default customBaseQuery;
