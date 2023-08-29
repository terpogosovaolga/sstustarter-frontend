import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth:
    localStorage.getItem("isAuth") === null
      ? false
      : localStorage.getItem("isAuth"),
  userId:
    localStorage.getItem("userId") === null
      ? null
      : parseInt(localStorage.getItem("userId")),
  username:
    localStorage.getItem("username") === null
      ? false
      : localStorage.getItem("username"),
  role:
    localStorage.getItem("role") === null
      ? false
      : localStorage.getItem("role"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, actions) {
      state.isAuth = actions.payload;
    },
    toggleAuth(state) {
      state.isAuth = !state.isAuth;
    },
    setUser(state, actions) {
      state.userId = actions.payload.id;
      state.username = actions.payload.name;
      state.role = actions.payload.role;
    },
    logout(state) {
      state.isAuth = false;
      state.userId = null;
      state.username = null;
      state.role = null;
    },
    login(state, actions) {
      state.isAuth = true;
      state.userId = actions.payload.id;
      state.username = actions.payload.name;
      state.role = actions.payload.role;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuth, setUserId, toggleAuth, logout, login } =
  authSlice.actions;

export default authSlice.reducer;
