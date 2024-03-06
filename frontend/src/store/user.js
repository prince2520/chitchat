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
      state.status = action.payload.status;
      state.profileImageUrl = action.payload.profileImageUrl;

      state.email = action.payload.email || state.email;
      state.groups = action.payload.groups || state.groups;
      state.privates = action.payload.privates || state.privates;
    },
    addGroup(state, action) {
      state.groups = [...state.groups, action.payload];
    },
    addPrivate(state, action){
       console.log('addPrivate', action.payload);
      state.privates = [...state.privates, action.payload];
    },
    selectedChat(state, action) {
      state.isSelected = action.payload.isSelected;
      state.selectedId = action.payload.selectedId;
      state.selectedType = action.payload.selectedType;
    },
    saveMessage(state, action) {
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
