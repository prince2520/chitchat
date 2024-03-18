import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import overlayReducer from "./overlaySlice";
import dragAndDropReducer from "./dragAndDropSlice";

const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    user: userReducer,
    dragAndDrop: dragAndDropReducer
  }
});

export default store;
