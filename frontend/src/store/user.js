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
      state.email = action.payload.email;
      state.status = action.payload.status;
      state.groups = action.payload.groups;
      state.privates = action.payload.privates;
      state.profileImageUrl = action.payload.profileImageUrl;
    },
    addGroup(state, action) {
      state.groups = [...state.groups, action.payload];
    },
    selectedChat(state, action) {
      state.isSelected = action.payload.isSelected;
      state.selectedId = action.payload.selectedId;
      state.selectedType = action.payload.selectedType;
    },
    saveMessage(state, action) {

      console.log('saveMessage', action.payload)
      const isGroup = (action.payload.selectedType === categoryState[0]);

      const saveChatMessage = (state) =>{
        state = state.filter((chat) => {
          if (chat._id === action.payload.chatId) {
            chat.messages = [...chat.messages, action.payload.data];
          }
          return chat;
        });
      }

      if(isGroup){
        saveChatMessage(state.groups)
      }else {
        saveChatMessage(state.privates)
      }      
    } 
  }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
