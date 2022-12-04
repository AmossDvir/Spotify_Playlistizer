import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    firstName: "",
    lastName: "",
    userEmail: "",
    userPassword: "",
    userId: "",
    userCredentials: "",
    loggedIn: false
  },
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
        state.value = {...action.payload, loggedIn: true};
    },
    logoutUser: (state) => {
      state.value = initialState
    }
  }
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
