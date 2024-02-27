import { createSlice } from "@reduxjs/toolkit";

const initialHelperState = {
  showDropdown: false,
};

const HelperSlice = createSlice({
  name: "helper",
  initialState: initialHelperState,
  reducers: {
    dropDownHandler(state, action) {
      state.showDropdown = action.payload;
    }
  },
});

export const HelperActions = HelperSlice.actions;
export default HelperSlice.reducer;
