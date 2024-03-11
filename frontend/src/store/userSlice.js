import { createSlice } from "@reduxjs/toolkit";
import { categoryState } from "../constants/constants";

const initialUserState = {
  name: "",
  email: "",
  status: "",
  highResUrl: "",
  lowResUrl: "",
  groups: [],
  privates: [],

  selectedId: null,
  selectedType: null,
  isSelected: false,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    deleteChat(state, action) {
      if (action.payload.type === categoryState[0]) {
        state.groups = state.groups.filter((group) => {
          return group._id !== action.payload.chatId;
        });
      }else{
        state.privates = state.privates.filter((data)=> {
          return data._id !== action.payload.chatId;
        })
      }
    },
    saveUserData(state, action) {
      state.name = action.payload.name;
      state.status = action.payload.status;
      state.highResUrl = action.payload.highResUrl;
      state.lowResUrl = action.payload.lowResUrl;
      state.email = action.payload.email || state.email;
      state.groups = action.payload.groups || state.groups;
      state.privates = action.payload.privates || state.privates;
    },
    addGroup(state, action) {
      state.groups = [...state.groups, action.payload];
    },
    addPrivate(state, action) {
      state.privates = [...state.privates, action.payload];
    },
    selectedChat(state, action) {
      state.isSelected = action.payload.isSelected;
      state.selectedId = action.payload.selectedId;
      state.selectedType = action.payload.selectedType;
    },
    saveMessage(state, action) {
      const isGroup = action.payload.selectedType === categoryState[0];
      const saveChatMessage = (state) => {
        state = state.filter((chat) => {
          if (chat._id === action.payload.chatId) {
            chat.messages = [...chat.messages, action.payload.data];
          }
          return chat;
        });
      };
      if (isGroup) {
        saveChatMessage(state.groups);
      } else {
        saveChatMessage(state.privates);
      }
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
