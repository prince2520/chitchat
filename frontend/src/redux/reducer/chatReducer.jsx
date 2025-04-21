import { toast } from "react-toastify";

import { categoryState } from "../../constants/constants";


export const createGroup = (state, action) => {
    state.groups = [...state.groups, action.payload];

    toast.success(action.payload.message);
}

export const createPrivate = (state, action) => {
    state.privates = [...state.privates, action.payload];

    toast.success(action.payload.message);
}

export const removeUserGroup = (state, action) => {
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


export const blockUserGroup = (state, action) => {
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

export const unblockUserGroup = (state, action) => {
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

export const deleteChat = (state, action) => {
    if (state.selectedId === action.payload.chatId) {
        state.selectedId = null;
        state.selectedType = null;
        state.isSelected = false;
    }
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


   

    toast.success(action.payload.message);
};

export const createMessage = (state, action) => {
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

export const updateGroup = (state, action) => {
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





export const saveChat = (state, action) => {
    const { groups, privates } = action.payload;

    state.groups = groups;
    state.privates = privates;
};

export const selectedChat = (state, action) => {
    state.isSelected = action.payload.isSelected;
    state.selectedId = action.payload.selectedId;
    state.selectedType = action.payload.selectedType;
};


export const saveMessage = (state, action) =>  {
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

export const addUserGroup = (state, action) => {
    const removeUserId = action.payload.addUserId;
    const groupId = action.payload.groupId;

    state.groups = state.groups.map((group) => {
        if (group._id === groupId) {
            group.users = group.users.filter((user) => user._id === removeUserId);
        }
        return group;
    });
};

export const addMemberGroup = (state, action) =>  {
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

export const leaveMemberGroup = (state, action) =>  {
    const groupId = action.payload.groupId;
    const userId = action.payload._id;

    state.groups = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.users = group.users.concat().filter(user => user._id !== userId);
        }
        return group;
    });
};