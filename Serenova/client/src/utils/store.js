import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import routeReducer from "./routeSlice";
import storyReducer from "./storiesSlice";

// Load user from localStorage when the app starts
const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error loading user from localStorage", error);
    return null;
  }
};

const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
    stories: storyReducer,
  },
  preloadedState: {
    user: { user: loadUserFromStorage() }, // Preload user state
  },
});

export default store;
