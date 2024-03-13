import { createSlice } from "@reduxjs/toolkit";
import { categoryState } from "../constants/constants";

const initialUserState = {
  _id: "",
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
      } else {
        state.privates = state.privates.filter((data) => {
          return data._id !== action.payload.chatId;
        });
      }
    },
    saveUserData(state, action) {
      state._id = action.payload._id ? action.payload._id : state._id;
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
    removeUserGroup(state, action) {
      const removeUserId = action.payload.removeUserId;
      const groupId = action.payload.groupId;

      state.groups = state.groups.filter((group) => {
        if (group._id === groupId) {
          group.users = group.users.filter((user) => user._id === removeUserId);
        }
        return group;
      });

      if (state._id === removeUserId) {
        state.selectedId = null;
        state.selectedType = null;
        state.isSelected = false;

        state.groups = state.groups.filter((group) => group._id !== groupId);
      }
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
    addUserGroup(state, action) {
      const removeUserId = action.payload.addUserId;
      const groupId = action.payload.groupId;

      state.groups = state.groups.map((group) => {
        if (group._id === groupId) {
          group.users = group.users.filter((user) => user._id === removeUserId);
        }
        return group;
      });
    },
    blockUserGroup(state, action) {
      const blockedUser = action.payload.blockedUser;
      const groupId = action.payload.groupId;

      const temp = state.groups.concat().map((group) => {
        if (group._id === groupId) {
          group.blockList = [...group.blockList.concat(), blockedUser];
        }
        return group;
      });

      state.groups = temp;
    },
    editGroup(state, action) {
      const groupId = action.payload.groupId;
      const name = action.payload.name;
      const status = action.payload.status;
      const highResUrl = action.payload.highResUrl;
      const lowResUrl = action.payload.lowResUrl;

      state.groups = state.groups.map((group) => {
        if (group._id === groupId) {
          group.name = name;
          group.status = status;

          if (highResUrl && lowResUrl) {
            group.highResUrl = highResUrl;
            group.lowResUrl = lowResUrl;
          }
        }
        return group;
      });
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
