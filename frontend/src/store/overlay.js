import {createSlice} from '@reduxjs/toolkit';

const initialOverlayState = {
    showOverlay: false,
};

const OverlaySlice = createSlice({
    name: 'overlay',
    initialState: initialOverlayState,
    reducers: {
        closeOverlayHandler(state) {
            state.showOverlay = false;
        },
        openOverlayHandler(state){
            state.showOverlay = true;
        }
    }
});

export const OverlayActions = OverlaySlice.actions;
export default OverlaySlice.reducer;