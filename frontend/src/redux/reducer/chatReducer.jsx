import { createSlice } from "@reduxjs/toolkit";
import { categoryState } from "../../constants/constants";
import { toast } from "react-toastify";


export const createGroupReducer = (state, action) => {
    state.groups = [...state.groups, action.payload];

    toast.success(action.payload.message);
}

export const createPrivateReducer = (state, action) => {
    state.privates = [...state.privates, action.payload];

    toast.success(action.payload.message);
}

export const removeUserGroupReducer = (state, action) => {
    const removeUserId = action.payload.removeUserId;
    const groupId = action.payload.groupId;

    state.groups = state.groups.filter((group) => {
        if (group._id === groupId) {
            group.users = group.users.filter((user) => user._id !== removeUserId);
        }
        return group;
    });

    toast.success(action.payload.message);
}


export const blockUserGroupReducer = (state, action) => {
    const blockedUser = action.payload.blockedUser;
    const groupId = action.payload.groupId;

    const temp = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.blockList = [...group.blockList.concat(), blockedUser];
        }
        return group;
    });

    state.groups = temp;

    toast.success(action.payload.message);
};

export const unblockUserGroupReducer = (state, action) => {
    const blockUserId = action.payload.blockUserId;
    const groupId = action.payload.groupId;

    const temp = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.blockList = group.blockList.concat().filter(user => user._id !== blockUserId);
        }
        return group;
    });

    state.groups = temp;
    toast.success(action.payload.message);
}

export const deleteChatReducer = (state, action) => {
    if (action.payload.chatType === categoryState[0])
        state.groups = state.groups.filter((group) => {
            if (group._id === action.payload.chatId) {
                toast(`"${group.name}" admin deleted group chat`)
            }
            return group._id !== action.payload.chatId;
        });
    else
        state.privates = state.privates.filter((data) => {
            if (data._id === action.payload.chatId) {
                toast(`${data.name} removed from private chats!`)
            }
            return data._id !== action.payload.chatId;
        });


    if (state.selectedId === action.payload.chatId) {
        state.selectedId = null;
        state.selectedType = null;
        state.isSelected = false;
    }

    toast.success(action.payload.message);
};

export const createMessageReducer = (state, action) => {
    const isGroup = action.payload.selectedType === categoryState[0];

    if (isGroup) {
        state.groups = state.groups.filter((chat) => {
            if (chat._id === action.payload.chatId) {
                chat.messages = [...chat.messages, action.payload.data];
            }
            return chat;
        });
    } else {
        state.privates = state.privates.filter((chat) => {
            if (chat._id === action.payload.chatId) {
                chat.messages = [...chat.messages, action.payload.data];
            }
            return chat;
        });
    }

    toast.success(action.payload.message);
}

export const updateGroupReducer = (state, action) => {
    const { groupId, name, status, highResUrl, lowResUrl } = action.payload;

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

    toast.success(action.payload.message);
}

export const saveChatReducer = (state, action) => {
    const { groups, privates } = action.payload;

    state.groups = groups;
    state.privates = privates;
}

export const selectedChatReducer = (state, action) => {
    state.isSelected = action.payload.isSelected;
    state.selectedId = action.payload.selectedId;
    state.selectedType = action.payload.selectedType;
}

export const saveMessageReducer = (state, action) => {
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
};

export const addUserGroupReducer = (state, action) => {
    const removeUserId = action.payload.addUserId;
    const groupId = action.payload.groupId;

    state.groups = state.groups.map((group) => {
        if (group._id === groupId) {
            group.users = group.users.filter((user) => user._id === removeUserId);
        }
        return group;
    });
};


export const addMemberGroupReducer = (state, action) => {
    const groupId = action.payload.groupId;
    const user = action.payload.user;

    const temp = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.users = [...group.users, user];
        }
        return group;
    });

    state.groups = temp;
};


export const leaveMemberGroupReducer = (state, action) => {
    const groupId = action.payload.groupId;
    const userId = action.payload._id;

    state.groups = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.users = group.users.concat().filter(user => user._id !== userId);
        }
        return group;
    });
},




const ChatSlice = createSlice({
    name: "chat",
    initialState: initialChatState,
    reducers: {
        createPrivateReducer,
        createGroupReducer,
        deleteChatReducer,
        createMessageReducer,
        updateGroupReducer,
        blockUserGroupReducer,
        removeUserGroupReducer,
        unblockUserGroupReducer,
        saveChatReducer,
        selectedChatReducer,
        saveMessageReducer,
        addUserGroupReducer,
        addMemberGroupReducer,
        leaveMemberGroupReducer

    }
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;











