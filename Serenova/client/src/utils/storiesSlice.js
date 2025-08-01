import { createSlice } from "@reduxjs/toolkit";

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
  },
  reducers: {
    setstories: (state, action) => {
      state.stories = action.payload;
    },
  },
});

export const {setstories} = storiesSlice.actions;
export default storiesSlice.reducer;
