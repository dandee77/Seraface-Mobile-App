import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./rootReducer";
import { skincareApi } from "./api/skincareApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "skincare"], // Only persist auth and skincare data
  blacklist: ["skincareApi"], // Don't persist API cache
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(skincareApi.middleware),
  devTools: __DEV__, // Enable Redux DevTools in development
});

export const persistor = persistStore(store);

// Enable listener behavior for the store
setupListeners(store.dispatch);

// Export types for TypeScript (you can remove these if not using TypeScript)
export const selectAuth = (state) => state.auth;
export const selectSkincare = (state) => state.skincare;
