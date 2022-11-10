import { createSlice } from "@reduxjs/toolkit";

export const globalStateSlice = createSlice({
    name: "globalState",
    initialState: {
      value: {
        loginDrawerOpen: false
      },
    },
    reducers: {
        setLoginDrawerOpen : (state, action) => {
          state.value.loginDrawerOpen = action.payload;
      },
    }
  });

  export const { setLoginDrawerOpen } = globalStateSlice.actions;
  
  export default globalStateSlice.reducer;