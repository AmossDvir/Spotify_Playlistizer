import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import globalStateReducer from "./globalStateSlice"

const Store = configureStore({
  reducer: { user: userReducer, globalState: globalStateReducer },
});

export default Store;
