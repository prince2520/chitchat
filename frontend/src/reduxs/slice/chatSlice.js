import { createSlice } from "@reduxjs/toolkit";
import { categoryState } from "../../constants/constants";
import { toast } from "react-toastify";
import { blockUserGroupThunk, createGroupMessageThunk, createGroupThunk, createPrivateMessageThunk, createPrivateThunk, deleteGroupThunk, deletePrivateThunk, joinGroupThunk, leaveGroupThunk, removeUserGroupThunk, unblockUserGroupThunk, updateGroupThunk } from "../thunk/chatThunk";


const initialChatState = {
    // Chat
    groups: [],
    privates: [],

    selectedId: null,
    selectedType: null,
    isSelected: false
};

const createGroup = (state, action) => {
    state.groups = [...state.groups, action.payload];
}

const createPrivate = (state, action) => {
    state.privates = [...state.privates, action.payload];
}

const removeUserGroup = (state, action) => {
    const remove_id = action.payload.remove_id;
    const groupId = action.payload.groupId;

    state.groups = state.groups.filter((group) => {
        if (group._id === groupId) {
            group.users = group.users.filter((user) => user._id !== remove_id);
        }
        return group;
    });

    if (state._id === remove_id) {
        state.selectedId = null;
        state.selectedType = null;
        state.isSelected = false;

        state.groups = state.groups.filter((group) => group._id !== groupId);
    }
}

const updateGroup = (state, action) => {
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
}

const leaveGroup = (state, action) => {
    const { groupId, _id } = action.payload;

    state = {
        ...state,
        isSelected: false,
        selectedType: null,
        selectedId: null
    };

    state.groups = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.users = group.users.concat().filter(user => user._id !== _id);
        }
        return group;
    });

};

const blockUserGroup = (state, action) => {
    const blockedUser = action.payload.blockedUser;
    const groupId = action.payload.groupId;

    const temp = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.blockList = [...group.blockList.concat(), blockedUser];
        }
        return group;
    });

    state.groups = temp;
};

const unblockUserGroup = (state, action) => {
    const blockUserId = action.payload.blockUserId;
    const groupId = action.payload.groupId;

    const temp = state.groups.concat().map((group) => {
        if (group._id === groupId) {
            group.blockList = group.blockList.concat().filter(user => user._id !== blockUserId);
        }
        return group;
    });

    state.groups = temp;
}

const deleteChat = (state, action) => {
    if (action.payload.chatType === categoryState[0]) {
        state.groups = state.groups.filter((group) => {
            return group._id !== action.payload.chatId;
        });
    } else {
        state.privates = state.privates.filter((data) => {
            return data._id !== action.payload.chatId;
        });
    }

    state.selectedId = null;
    state.selectedType = null;
    state.isSelected = false;
}


const ChatSlice = createSlice({
    name: "chat",
    initialState: initialChatState,
    reducers: {
        saveChat(state, action) {
            const { groups, privates } = action.payload;

            state.groups = groups;
            state.privates = privates;
        },
        createPrivate,
        createGroup,
        deleteChat,

        addGroup(state, action) {
            state.groups = [...state.groups, action.payload];
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
                    group.users = group.users.filter((user) => user._id !== removeUserId);
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
        unblockUserGroup(state, action) {
            const blockUserId = action.payload.blockUserId;
            const groupId = action.payload.groupId;

            const temp = state.groups.concat().map((group) => {
                if (group._id === groupId) {
                    group.blockList = group.blockList.concat().filter(user => user._id !== blockUserId);
                }
                return group;
            });

            state.groups = temp;
        },
        addMemberGroup(state, action) {
            const groupId = action.payload.groupId;
            const user = action.payload.user;

            const temp = state.groups.concat().map((group) => {
                if (group._id === groupId) {
                    group.users = [...group.users, user];
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
        leaveMemberGroup(state, action) {
            const groupId = action.payload.groupId;
            const userId = action.payload.userId;

            state.groups = state.groups.concat().map((group) => {
                if (group._id === groupId) {
                    group.users = group.users.concat().filter(user => user._id !== userId);
                }
                return group;
            });
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(createGroupMessageThunk.fulfilled, (state, action) => {
                state = state.groups.filter((chat) => {
                    if (chat._id === action.payload.chatId) {
                        chat.messages = [...chat.messages, action.payload.data];
                    }
                    return chat;
                });
            })
            .addCase(createGroupMessageThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(createPrivateMessageThunk.fulfilled, (state, action) => {
                state = state.privates.filter((chat) => {
                    if (chat._id === action.payload.chatId) {
                        chat.messages = [...chat.messages, action.payload.data];
                    }
                    return chat;
                });
            })
            .addCase(createPrivateMessageThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(deleteGroupThunk.fulfilled, deleteChat)
            .addCase(deleteGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })


        builder
            .addCase(createGroupThunk.fulfilled, createGroup)
            .addCase(createGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(removeUserGroupThunk.fulfilled, removeUserGroup)
            .addCase(removeUserGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(joinGroupThunk.fulfilled, createGroup)
            .addCase(joinGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })



        builder
            .addCase(updateGroupThunk.fulfilled, updateGroup)
            .addCase(updateGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(unblockUserGroupThunk.fulfilled, unblockUserGroup)
            .addCase(unblockUserGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(blockUserGroupThunk.fulfilled, unblockUserGroup)
            .addCase(blockUserGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })


        builder
            .addCase(leaveGroupThunk.fulfilled, deleteChat)
            .addCase(leaveGroupThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(deletePrivateThunk.fulfilled, deleteChat)
            .addCase(deletePrivateThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

        builder
            .addCase(createPrivateThunk.fulfilled, createPrivate)
            .addCase(createPrivateThunk.rejected, (_, action) => {
                toast(`${action.payload}`, {
                    type: "error"
                });
            })

    }
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;
