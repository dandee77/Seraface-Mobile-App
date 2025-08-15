import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./rootReducer";
import { skincareApi } from "./api/skincareApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  transforms: [],
  whitelist: ["auth", "skincare"], // Only persist auth and skincare data
  blacklist: ["skincareApi"], // Don't persist API cache
  timeout: 10000,
  serialize: true,
  deserialize: true,
  // Add error handling for persist failures
  writeFailHandler: (err) => {
    console.warn('Redux persist write failed:', err);
  },
  stateReconciler: (inboundState, originalState) => {
    // Handle state reconciliation errors gracefully
    try {
      return { ...originalState, ...inboundState };
    } catch (error) {
      console.warn('Redux persist state reconciliation failed:', error);
      return originalState;
    }
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/REGISTER"],
        ignoredPaths: ['register'],
      },
    }).concat(skincareApi.middleware),
  devTools: __DEV__, // Enable Redux DevTools in development
});

export const persistor = persistStore(store, null, () => {
  console.log('Redux persist rehydration completed');
});

// Handle persistor errors gracefully
persistor.subscribe(() => {
  const state = persistor.getState();
  if (state.error) {
    console.error('Redux persist error:', state.error);
  }
});

// Enable listener behavior for the store
setupListeners(store.dispatch);

// Export types for TypeScript (you can remove these if not using TypeScript)
export const selectAuth = (state) => state.auth;
export const selectSkincare = (state) => state.skincare;
