import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import globalStateReducer from "./globalStateSlice"
import songPlaybackReducer from "./songPlaybackSlice";

const Store = configureStore({
  reducer: { user: userReducer, globalState: globalStateReducer, songPlayback:songPlaybackReducer },
});

export default Store;
