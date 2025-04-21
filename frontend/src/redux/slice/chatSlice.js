import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { blockUserGroupThunk, createGroupMessageThunk, createGroupThunk, createPrivateMessageThunk, createPrivateThunk, deleteGroupThunk, deletePrivateThunk, joinGroupThunk, leaveGroupThunk, removeUserGroupThunk, unblockUserGroupThunk, updateGroupThunk } from "../thunk/chatThunk";
import { addMemberGroupReducer, addUserGroupReducer, blockUserGroupReducer, createGroupReducer, createMessageReducer, createPrivateReducer, deleteChatReducer, leaveMemberGroupReducer, removeUserGroupReducer, saveChatReducer, saveMessageReducer, selectedChatReducer, unblockUserGroupReducer, updateGroupReducer } from "../reducer/chatReducer";


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
        leaveMemberGroupReducer,
    },
    extraReducers: (builder) => {

        builder
            .addCase(createGroupMessageThunk.fulfilled, createMessageReducer)
            .addCase(createGroupMessageThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(createPrivateMessageThunk.fulfilled, createMessageReducer)
            .addCase(createPrivateMessageThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(deleteGroupThunk.fulfilled, deleteChatReducer)
            .addCase(deleteGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })


        builder
            .addCase(createGroupThunk.fulfilled, createGroupReducer)
            .addCase(createGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(removeUserGroupThunk.fulfilled, removeUserGroupReducer)
            .addCase(removeUserGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(joinGroupThunk.fulfilled, createGroupReducer)
            .addCase(joinGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(updateGroupThunk.fulfilled, updateGroupReducer)
            .addCase(updateGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(unblockUserGroupThunk.fulfilled, unblockUserGroupReducer)
            .addCase(unblockUserGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(blockUserGroupThunk.fulfilled, blockUserGroupReducer)
            .addCase(blockUserGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })


        builder
            .addCase(leaveGroupThunk.fulfilled, deleteChatReducer)
            .addCase(leaveGroupThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(deletePrivateThunk.fulfilled, deleteChatReducer)
            .addCase(deletePrivateThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

        builder
            .addCase(createPrivateThunk.fulfilled, createPrivateReducer)
            .addCase(createPrivateThunk.rejected, (_, action) => {
                toast.error(`${action.payload}`);
            })

    }
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;
