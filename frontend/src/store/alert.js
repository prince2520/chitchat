import {createSlice} from '@reduxjs/toolkit';

const initialAlertState = {
    showAlertBox: false,
    success: false,
    message: ''
};

const AlertBoxSlice = createSlice({
    name: 'alert',
    initialState: initialAlertState,
    reducers: {
        showAlertBoxHandler(state, action) {
            state.success = action.payload.success;
            state.message = action.payload.message;
            state.showAlertBox = true;
        },
        closeAlertBoxHandler(state){
            state.showAlertBox = false;
            state.success = '';
            state.message = '';
        }
    }
});

export const AlertBoxActions = AlertBoxSlice.actions;
export default AlertBoxSlice.reducer;