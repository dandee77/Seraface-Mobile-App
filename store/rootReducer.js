import { combineReducers } from "@reduxjs/toolkit";
import { authReducer, skincareReducer } from "./slices";
import { skincareApi } from "./api/skincareApi";

const rootReducer = combineReducers({
  auth: authReducer,
  skincare: skincareReducer,
  [skincareApi.reducerPath]: skincareApi.reducer,
});

export default rootReducer;
