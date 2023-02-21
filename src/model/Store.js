import { configureStore } from "@reduxjs/toolkit";
import globalStateReducer from "./globalStateSlice"
import songPlaybackReducer from "./songPlaybackSlice";

const Store = configureStore({
  reducer: { globalState: globalStateReducer, songPlayback:songPlaybackReducer },
});

export default Store;
