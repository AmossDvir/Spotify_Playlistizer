import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      firstName: "",
      lastName: "",
      userEmail: "",
      userPassword: "",
      userId: "",
      userCredentials: "",
    },
  },
  reducers: {
    login: (state, action) => {
        state.value = action.payload;
    },
    logout: (state) => {

    }
  }
});

export const { login } = userSlice.actions;

export default userSlice.reducer;
