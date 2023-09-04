import {createSlice} from '@reduxjs/toolkit';

const initialDragAndDropState = {
    showDragAndDrop : false,
    files: []
};

const DragAndDropSlice = createSlice({
    name: 'dragAndDrop',
    initialState: initialDragAndDropState,
    reducers: {
        addFileHandler(state, action){
            state.files = [...state.files, action.payload]
        },
        removeAllFiles(state, action) {
            state.files = [];
        },
        removeSingleFile(state, action) {
            state.files = state.files.filter(file=>file.name !== action.payload.name);
        }
    }
});

export const DragAndDropActions = DragAndDropSlice.actions;
export default DragAndDropSlice.reducer;