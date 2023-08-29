import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import profile from "./slices/profileSlice";
import filter from "./slices/filterSlice";
import creation from "./slices/creationSlice";

export const store = configureStore({
  reducer: { auth, profile, filter, creation },
});
