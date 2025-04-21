import { createSlice } from "@reduxjs/toolkit";
import { addFileHandler, removeAllFiles, removeSingleFile } from "../reducer/dragAndDropReducer";

const initialDragAndDropState = {
  showDragAndDrop: false,
  files: [],
};

const DragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState: initialDragAndDropState,
  reducers: {
    addFileHandler,
    removeAllFiles,
    removeSingleFile
  }
});

export const DragAndDropActions = DragAndDropSlice.actions;
export default DragAndDropSlice.reducer;
