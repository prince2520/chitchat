import { createSlice } from "@reduxjs/toolkit";

import { closeOverlayReducer, openDragDropReducer, openSettingsReducer, openSideMobileBarReducer, openVideoChatReducer } from "../reducer/overlayReducer";

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
    closeOverlayReducer,
    openSideMobileBarReducer,
    openDragDropReducer,
    openVideoChatReducer,
    openSettingsReducer
  },
});

export const OverlayActions = OverlaySlice.actions;
export default OverlaySlice.reducer;
