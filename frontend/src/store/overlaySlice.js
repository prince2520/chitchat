import { createSlice } from "@reduxjs/toolkit";

const initialOverlayState = {
  showOverlay: false,
  showDragDrop: false,
  showSideMobileBar: false,
  showVideoChat: false,
  showSettings: {
    link : "Members",
    value : false
  }
};

const OverlaySlice = createSlice({
  name: "overlay",
  initialState: initialOverlayState,
  reducers: {
    closeOverlayHandler(state) {
      state.showVideoChat = false;
      state.showSideMobileBar = false;
      state.showDragDrop = false;
      state.showSettings = {
        links : "Members",
        value : false
      };
      state.showOverlay = false;
    },
    openSideMobileBarHandler(state) {
      state.showSideMobileBar = true;
      state.showOverlay = true;
    },
    openDragDropHandler(state) {
      state.showDragDrop = true;
      state.showOverlay = true;
    },
    openVideoChatHandler(state) {
      state.showVideoChat = true;
      state.showOverlay = true;
    },
    openSettingsHandler(state, action) {
      state.showSettings = action.payload;
      state.showOverlay = true;
    },
  },
});

export const OverlayActions = OverlaySlice.actions;
export default OverlaySlice.reducer;
