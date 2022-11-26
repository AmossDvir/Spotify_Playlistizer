import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    playlists: [],
    mostRecent: {},
  },
};
export const playlistsSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    addPlaylist: (state, action) => {
      state.value.mostRecent = action.payload;
      state.value.playlists = [...state.value.playlists, action.payload];
    },
  },
});

export const { addPlaylist } = playlistsSlice.actions;

export default playlistsSlice.reducer;
