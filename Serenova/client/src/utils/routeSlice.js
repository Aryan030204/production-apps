import { createSlice } from "@reduxjs/toolkit";

const RouteSlice = createSlice({
  name: "route",
  initialState: {
    fromLat: 0,
    toLat: 0,
    fromLong: 0,
    toLong: 0,
    mode: "car",
    routes: [], 
  },
  reducers: {
    setFromLat: (state, action) => {
      state.fromLat = action.payload;
      localStorage.setItem("fromLat", action.payload); // No JSON.stringify needed
    },
    setToLat: (state, action) => {
      state.toLat = action.payload;
      localStorage.setItem("toLat", action.payload);
    },
    setFromLong: (state, action) => {
      state.fromLong = action.payload;
      localStorage.setItem("fromLong", action.payload);
    },
    setToLong: (state, action) => {
      state.toLong = action.payload;
      localStorage.setItem("toLong", action.payload);
    },
    setTransportMode: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("Mode", action.payload);
    },
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
  },
});

// Retrieve from localStorage when the app loads
export const loadRouteFromStorage = () => (dispatch) => {
  const fromLat = parseFloat(localStorage.getItem("fromLat")) || 0;
  const toLat = parseFloat(localStorage.getItem("toLat")) || 0;
  const fromLong = parseFloat(localStorage.getItem("fromLong")) || 0;
  const toLong = parseFloat(localStorage.getItem("toLong")) || 0;

  dispatch(setFromLat(fromLat));
  dispatch(setToLat(toLat));
  dispatch(setFromLong(fromLong));
  dispatch(setToLong(toLong));
};

export const {
  setFromLat,
  setToLat,
  setFromLong,
  setToLong,
  setTransportMode,
  setRoutes,
} = RouteSlice.actions;
export default RouteSlice.reducer;
