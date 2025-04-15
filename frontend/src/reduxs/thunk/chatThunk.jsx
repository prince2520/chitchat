import { toast } from "react-toastify";
import { socketAddMemberGroup, socketAddPrivate, socketBlockUser, socketLeaveMemberGroup, socketRemoveUserGroup, socketSendMessage, socketUnblockUser, socketUpdatedGroup } from "../../services/socket";
import { blockUserGroup, createGroup, deleteGroup, joinGroup, leaveGroup, removeUserGroup, saveGroupMessage, unblockUserGroup, updateGroup, createPrivate, deletePrivate, savePrivateMessage } from "../api/chat";
import { createAsyncThunk } from "@reduxjs/toolkit";

// CHAT THUNK

// Private Chat
// Private - create a private chat
export const createPrivateThunk = createAsyncThunk(
    'chat/createPrivate',
    async ({ chatId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            let response = await createPrivate(state.user.token, state.user._id, chatId);
            socketAddPrivate({
                _id: state.user._id,
                private: response.data
            })

            toast.success(response.message);
            return response;
        } catch (error) {
            toast.error(error.message);
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);

// Private - create a private chat
export const createPrivateMessageThunk = createAsyncThunk(
    'chat/createPrivateMessage',
    async ({ data }, { rejectWithValue }) => {
        try {
            let response = await savePrivateMessage(data);
            socketSendMessage({ ...data, data: response.data });
            console.log("createPrivateMessage", response);
            return response;

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);

// Private - create a private chat
export const deletePrivateThunk = createAsyncThunk(
    'chat/deletePrivate',
    async ({ chatId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            let response = await deletePrivate({
                token: state.user.token, chatId
            });
            console.log("deletePrivate", response);

            return response;

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
            let response = await createGroup(state.user.token, data);
            return {...response.data};
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
            let response = await joinGroup(state.user.token, groupId, state.user._id);
            socketAddMemberGroup({
                groupId: response.groupData._id,
                user: state.user
            });
            toast.success(response.message);
            return {...response.groupData};
        } catch (error) {
            toast.error(error.message);
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


// Group - create a group chat
export const createGroupMessageThunk = createAsyncThunk(
    'chat/createGroupMessage',
    async ({ data }, { rejectWithValue }) => {
        try {
            let response = await saveGroupMessage(data);
            socketSendMessage({ ...data, data: response.data });
            console.log("createGroupMessage", response);
            return response;

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const deleteGroupThunk = createAsyncThunk(
    'chat/deleteGroup',
    async ({ chatId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            let response = await deleteGroup(({
                token: state.user.token, chatId
            }));

            return response;

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const leaveGroupThunk = createAsyncThunk(
    'chat/leaveGroup',
    async ({ chatId }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            let response = await leaveGroup(({
                token: state.user.token, chatId
            }));

            socketLeaveMemberGroup({
                groupId: chatId,
                _id: state.user._id,
            });
            console.log("leaveGroup", response);

            return response;

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const removeUserGroupThunk = createAsyncThunk(
    'chat/removeUserGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
            socketRemoveUserGroup(data);
            let response = await removeUserGroup(data);
            toast.success(response.message);
            console.log("removeUserGroup", response);

            return response;

        } catch (error) {
            toast.error(error);
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const updateGroupThunk = createAsyncThunk(
    'chat/updateGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
            let response = await updateGroup(data);
            toast.success(response.message);
            let socketData = { ...data };
            delete socketData.token;
            socketUpdatedGroup(socketData);
            console.log("updateGroup", response);

            return data;

        } catch (error) {
            toast.error(error);
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const blockUserGroupThunk = createAsyncThunk(
    'chat/blockUserGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
            socketBlockUser(data);
            let response = await blockUserGroup(data);
            toast.success(response.message);
            console.log("blockUserGroup", response);
            return response;
        } catch (error) {
            toast.error(error);
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


export const unblockUserGroupThunk = createAsyncThunk(
    'chat/unblockUserGroup',
    async ({ data }, { rejectWithValue }) => {
        try {
            socketUnblockUser(data);
            let response = await unblockUserGroup(data);
            toast.success(response.message);
            console.log("unblockUserGroup", response);

            return response;

        } catch (error) {
            toast.error(error);
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


