import { toast } from "react-toastify";
import { socketAddMemberGroup, socketAddPrivate, socketBlockUser, socketLeaveMemberGroup, socketRemoveUserGroup, socketSendMessage, socketUnblockUser, socketUpdatedGroup } from "../../services/socket";
import { blockUserGroupAPI, createGroupAPI, deleteGroupAPI, joinGroupAPI, leaveGroupAPI, removeUserGroupAPI, saveGroupMessageAPI, unblockUserGroupAPI, updateGroupAPI, createPrivateAPI, deletePrivateAPI, savePrivateMessageAPI } from "../api/chatAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

// CHAT THUNK

// Private Chat
// Private - create a private chat
export const createPrivateThunk = createAsyncThunk(
    'chat/createPrivate',
    async ({ chatId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            let response = await createPrivateAPI(state.user.token, state.user._id, chatId);

            socketAddPrivate({
                userId: state.user._id,
                private: response.data
            })
            const privateUser = response.data.users.find((user)=> user._id!==state.user._id);
            return {...response.data, message: `${privateUser.name} added to private chat.`};
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);

// Private - create a private chat
export const createPrivateMessageThunk = createAsyncThunk(
    'chat/createPrivateMessage',
    async ({ data }, { rejectWithValue }) => {
        try {
            let response = await savePrivateMessageAPI(data);

            let msgData = { ...data, data: response.data };
            socketSendMessage(msgData);
            return {...msgData};
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);

// Private - create a private chat
export const deletePrivateThunk = createAsyncThunk(
    'chat/deletePrivate',
    async ({ chatId, chatType }, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            await deletePrivateAPI({
                token: state.user.token, chatId
            });

            return { chatId, chatType };

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);



// Group Thunks 
// Group - create a group chat
export const createGroupThunk = createAsyncThunk(
    'chat/createGroup',
    async ({ data }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            let response = await createGroupAPI(state.user.token, data);
            return { ...response.data , message : `"${response.data.name}" new group created!` };
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


// Group - create a group chat
export const joinGroupThunk = createAsyncThunk(
    'chat/joinGroup',
    async ({ groupId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            let response = await joinGroupAPI(state.user.token, groupId, state.user._id);
            socketAddMemberGroup({
                groupId: response.groupData._id,
                user: state.user
            });
            return { ...response.groupData , message: `You joined group "${response.groupData.name}" successfully!`};
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


// Group - create a group chat
export const createGroupMessageThunk = createAsyncThunk(
    'chat/createGroupMessage',
    async ({ data }, { rejectWithValue }) => {
        try {
            let response = await saveGroupMessageAPI(data);
            let msgData = { ...data, data: response.data };
            socketSendMessage(msgData);
            return msgData;
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const deleteGroupThunk = createAsyncThunk(
    'chat/deleteGroup',
    async ({ chatId, chatType }, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            await deleteGroupAPI(({
                token: state.user.token, chatId
            }));
            return { chatId, chatType, message: "Group Deleted Successfully!" };
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const leaveGroupThunk = createAsyncThunk(
    'chat/leaveGroup',
    async ({ chatId, chatType }, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            await leaveGroupAPI(({
                token: state.user.token, chatId
            }));

            socketLeaveMemberGroup({
                groupId: chatId,
                _id: state.user._id,
            });

            return { chatId, chatType };

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const removeUserGroupThunk = createAsyncThunk(
    'chat/removeUserGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
            let response = await removeUserGroupAPI(data);

            socketRemoveUserGroup(data);
            toast.success(response.message);
            return data;

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const updateGroupThunk = createAsyncThunk(
    'chat/updateGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
             await updateGroupAPI(data);
            let socketData = { ...data };
            delete socketData.token;
            socketUpdatedGroup(socketData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const blockUserGroupThunk = createAsyncThunk(
    'chat/blockUserGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
            socketBlockUser(data);
            await blockUserGroupAPI(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const unblockUserGroupThunk = createAsyncThunk(
    'chat/unblockUserGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
            await unblockUserGroupAPI(data);
            socketUnblockUser(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


