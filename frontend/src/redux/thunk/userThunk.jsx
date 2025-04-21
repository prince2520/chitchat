import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser, login, updateUser } from "../api/user";


// User - Get User
export const getUserThunk = createAsyncThunk(
    'user/getUser',
    async ({ email, token }, {  rejectWithValue }) => {
        try {
            let response = await fetchUser(email, token);
            return { ...response, token };
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
            let response = await updateUser(state.user.token, data);
            return {...response, token};

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);

// Auth - Login
export const loginThunk = createAsyncThunk(
    'user/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            let response = await login(email, password);
            return response;
        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);