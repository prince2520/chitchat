import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUserAPI, loginAPI, updateUserAPI } from "../api/userAPI";
import { ChatActions } from "../slice/chatSlice";


// User - Get User
export const getUserThunk = createAsyncThunk(
    'user/getUser',
    async ({ email, token }, {  rejectWithValue }) => {
        try {
            let response = await fetchUserAPI(email, token);
            return { ...response, token, message: `${response.user.name} data fetch successfully!` };
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);


// User - Update User
export const updateUserThunk = createAsyncThunk(
    'user/updateUser',
    async ({ data }, { getState, rejectWithValue }) => {
        try {
            const state = getState();
            let token = state.user.token
            let response = await updateUserAPI(state.user.token, data);
            return { ...response, token, message: `${response.user.name} profile edited successfully!` };

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);

// Auth - Login
export const loginThunk = createAsyncThunk(
    'user/login',
    async ({ email, password }, {dispatch, rejectWithValue }) => {
        try {
            let response = await loginAPI(email, password);
            dispatch(ChatActions.saveChatReducer({
                groups: response.user.groups,
                privates: response.user.privates,
            }))
            return { ...response, message: `${response.user.name} has login successfully!` };
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);