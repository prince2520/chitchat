import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slice/userSlice";
import overlayReducer from "./slice/overlaySlice";
import dragAndDropReducer from "./slice/dragAndDropSlice";
import videoAudioCallReducer from "./slice/videoAudioCallSlice";
import chatReducer from "./slice/chatSlice";

const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    user: userReducer,
    dragAndDrop: dragAndDropReducer,
    videoAudioCall: videoAudioCallReducer,
    chat: chatReducer
  }
});

export default store;
