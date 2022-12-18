import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isActive:false,
    isPlaying: false,
    song: {},
  },
};
export const songPlaybackSlice = createSlice({
  name: "songPlayback",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.value.isActive = true;
      state.value.isPlaying = true;
      state.value.song = action.payload;
    },
    pauseSong: (state) => {
      state.value = initialState;
    },
  },
});

export const { playSong, pauseSong } = songPlaybackSlice.actions;

export default songPlaybackSlice.reducer;
