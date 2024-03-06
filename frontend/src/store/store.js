import { configureStore } from "@reduxjs/toolkit";

import overlayReducer from "./overlay";
import alertReducer from "./alert";
import userReducer from "./user";
import dragAndDropReducer from "./dragAndDrop";

const store = configureStore({
  reducer: {
    overlay: overlayReducer,
    alert: alertReducer,
    user: userReducer,
    dragAndDrop: dragAndDropReducer,
  },
});

export default store;
