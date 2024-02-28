import { createSlice } from "@reduxjs/toolkit";
import { categoryState } from "../common";
const initialUserState = {
  name: "",
  email: "",
  status: "",
  profileImageUrl: "",
  groups: [],
  privates: [],

  selectedId: "",
  selectedType: "",
  isSelected: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    saveUserData(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.status = action.payload.status;
      state.groups = action.payload.groups;
      state.privates = action.payload.privates;
      state.profileImageUrl = action.payload.profileImageUrl;
      console.log(state.groups);
    },
    addGroup(state, action) {
      console.log(action.payload);
      state.groups = [...state.groups, action.payload];
    },
    selectedChat(state, action) {
      state.isSelected = true;
      state.selectedId = action.payload.selectedId;
      state.selectedType = action.payload.selectedType;
    },
    saveMessage(state, action) {
      console.log(action.payload)
      if (action.payload.selectedType === categoryState[0]) {
      }
    }
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
