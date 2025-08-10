import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: null,
  isAuthenticated: false,
  currentPhase: "profile", // 'profile', 'scan', 'results', 'recommendations'
  formIndex: null,
  lastActivity: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      state.isAuthenticated = true;
      state.lastActivity = Date.now();
    },
    setCurrentPhase: (state, action) => {
      state.currentPhase = action.payload;
      state.lastActivity = Date.now();
    },
    setFormIndex: (state, action) => {
      state.formIndex = action.payload;
    },
    clearSession: (state) => {
      state.sessionId = null;
      state.isAuthenticated = false;
      state.currentPhase = "profile";
      state.formIndex = null;
      state.lastActivity = null;
    },
    updateActivity: (state) => {
      state.lastActivity = Date.now();
    },
  },
});

export const {
  setSessionId,
  setCurrentPhase,
  setFormIndex,
  clearSession,
  updateActivity,
} = authSlice.actions;

export default authSlice.reducer;
