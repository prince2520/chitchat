import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import alertReducer from "./alertSlice";
import overlayReducer from "./overlaySlice";
import dragAndDropReducer from "./dragAndDropSlice";

const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    alert: alertReducer,
    user: userReducer,
    dragAndDrop: dragAndDropReducer
  }
});

export default store;
