import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sectionType: "user",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setSectionType(state, actions) {
      state.sectionType = actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSectionType } = profileSlice.actions;

export default profileSlice.reducer;
