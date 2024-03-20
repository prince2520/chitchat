import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import overlayReducer from "./overlaySlice";
import dragAndDropReducer from "./dragAndDropSlice";
import videoAudioCallReducer from "./videoAudioCallSlice";

const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    user: userReducer,
    dragAndDrop: dragAndDropReducer,
    videoAudioCall: videoAudioCallReducer
  }
});

export default store;
