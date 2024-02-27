import { createSlice } from "@reduxjs/toolkit";

const initialOverlayState = {
  showOverlay: false,
  showDragDrop: false,
  showSideMobileBar: false,
  showVideoChat: false,
};

const OverlaySlice = createSlice({
  name: "overlay",
  initialState: initialOverlayState,
  reducers: {
    closeOverlayHandler(state) {
      state.showSideMobileBar = false;
      state.showDragDrop = false;
      state.showOverlay = false;
      state.show = false;
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
  },
});

export const OverlayActions = OverlaySlice.actions;
export default OverlaySlice.reducer;
