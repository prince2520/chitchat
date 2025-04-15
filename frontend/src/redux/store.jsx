import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // ← this is the key
      serializableCheck: false, // optional
    }),
});

