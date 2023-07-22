import {createSlice} from '@reduxjs/toolkit';
import {categoryState} from "../common";

const initialChatState = {
    selected: false,
    type: '',
    _id: '',
    photo: '',
    status: '',
    createdBy: '',
    name: '',
    messages: [],
    users: []
};

const ChatSlice = createSlice({
    name: 'chat',
    initialState: initialChatState,
    reducers: {
        selectedChatBox(state, action) {
            state.type = action.payload.type;
            state._id = action.payload._id;
            state.photo = action.payload.photo;
            state.name = action.payload.name;
            state.status = action.payload.status ? action.payload.status : null;
            state.createdBy = action.payload.createdBy ? action.payload.createdBy : null;
            state.users = action.payload.users ? action.payload.users : [];
            state.messages = [];
            state.selected = true;
        },
        saveChatMessage(state, action) {
            if (state._id === action.payload.chatId) {
                state.messages = [action.payload, ...state.messages]
            }
        },
        saveFetchChatMessage(state, action) {
            state.messages = action.payload.reverse()
        }
    }
});

export const ChatActions = ChatSlice.actions;
export default ChatSlice.reducer;