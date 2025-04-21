import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { blockUserGroupThunk, createGroupMessageThunk, createGroupThunk, createPrivateMessageThunk, createPrivateThunk, deleteGroupThunk, deletePrivateThunk, joinGroupThunk, leaveGroupThunk, removeUserGroupThunk, unblockUserGroupThunk, updateGroupThunk } from "../thunk/chatThunk";
import { addMemberGroup, addUserGroup, blockUserGroup, createGroup, createMessage, createPrivate, deleteChat, leaveMemberGroup, removeUserGroup, saveChat, saveMessage, selectedChat, unblockUserGroup, updateGroup } from "../reducer/chatReducer";


const initialChatState = {
    groups: [],
    privates: [],

    selectedId: null,
    selectedType: null,
    isSelected: false
};

const ChatSlice = createSlice({
    name: "chat",
    initialState: initialChatState,
    reducers: {
        createPrivate,
        createGroup,
        deleteChat,
        createMessage,
        updateGroup,
        blockUserGroup,
        removeUserGroup,
        unblockUserGroup,
        saveChat,
        selectedChat,
        saveMessage,
        addUserGroup,
        addMemberGroup,
        leaveMemberGroup,
    },
    extraReducers: (builder) => {

        builder
            .addCase(createGroupMessageThunk.fulfilled, createMessage)
            .addCase(createGroupMessageThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(createPrivateMessageThunk.fulfilled, createMessage)
            .addCase(createPrivateMessageThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(deleteGroupThunk.fulfilled, deleteChat)
            .addCase(deleteGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })


        builder
            .addCase(createGroupThunk.fulfilled, createGroup)
            .addCase(createGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(removeUserGroupThunk.fulfilled, removeUserGroup)
            .addCase(removeUserGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(joinGroupThunk.fulfilled, createGroup)
            .addCase(joinGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(updateGroupThunk.fulfilled, updateGroup)
            .addCase(updateGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(unblockUserGroupThunk.fulfilled, unblockUserGroup)
            .addCase(unblockUserGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(blockUserGroupThunk.fulfilled, blockUserGroup)
            .addCase(blockUserGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })


        builder
            .addCase(leaveGroupThunk.fulfilled, deleteChat)
            .addCase(leaveGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(deletePrivateThunk.fulfilled, deleteChat)
            .addCase(deletePrivateThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(createPrivateThunk.fulfilled, createPrivate)
            .addCase(createPrivateThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

    }
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;
