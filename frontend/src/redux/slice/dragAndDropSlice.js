import { createSlice } from "@reduxjs/toolkit";
import { addFileReducer, removeAllFilesReducer, removeSingleFileReducer } from "../reducer/dragAndDropReducer";

const initialDragAndDropState = {
  showDragAndDrop: false,
  files: [],
};

const DragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState: initialDragAndDropState,
  reducers: {
    addFileReducer,
    removeAllFilesReducer,
    removeSingleFileReducer
  }
});

export const DragAndDropActions = DragAndDropSlice.actions;
export default DragAndDropSlice.reducer;
