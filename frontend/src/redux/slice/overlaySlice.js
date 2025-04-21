import { createSlice } from "@reduxjs/toolkit";

import { closeOverlayHandler, openDragDropHandler, openSettingsHandler, openSideMobileBarHandler, openVideoChatHandler } from "../reducer/overlayReducer";

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
    closeOverlayHandler,
    openSideMobileBarHandler,
    openDragDropHandler,
    openVideoChatHandler,
    openSettingsHandler
  },
});

export const OverlayActions = OverlaySlice.actions;
export default OverlaySlice.reducer;
