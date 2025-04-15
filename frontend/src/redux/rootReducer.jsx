import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import overlayReducer from "./slices/overlaySlice";
import dragAndDropReducer from "./slices/dragAndDropSlice";
import videoAudioCallReducer from "./slices/videoAudioCallSlice";
import chatReducer from "./slices/chatSlice";

const rootReducer = configureStore({
  reducer: {
    overlay: overlayReducer,
    user: userReducer,
    dragAndDrop: dragAndDropReducer,
    videoAudioCall: videoAudioCallReducer,
    chat: chatReducer
  }
});

export default rootReducer;
