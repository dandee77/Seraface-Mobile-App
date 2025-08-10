import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`
    );
    if (config.data) {
      console.log("📤 Request payload:", JSON.stringify(config.data, null, 2));
    }
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log(
      `✅ Response received: ${response.status} - ${response.statusText}`
    );
    console.log("📥 Response data:", JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message;
    const errorStatus = error.response?.status || "Network Error";
    console.error(`❌ Response error [${errorStatus}]:`, errorMessage);

    // Return a standardized error format
    return Promise.reject({
      status: error.response?.status,
      message: errorMessage,
      data: error.response?.data,
    });
  }
);

export default apiClient;
