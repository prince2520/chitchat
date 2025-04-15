import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser, login, updateUser } from "../api/user";
import { toast } from "react-toastify";
import { socketJoinGroup } from "../../services/socket";



// User - Get User
export const getUserThunk = createAsyncThunk(
    'user/getUser',
    async ({ email, token }, {  rejectWithValue }) => {
        try {
            let response = await fetchUser(email, token);
            console.log("getUser", response)
            socketJoinGroup(response.user.groups);

            toast.success(response?.message);
            return { ...response, token };
        } catch (error) {
            toast.error(error?.message);
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
            let response = await updateUser(state.user.token, data);

            return response;

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
            console.log("login", response);

            return response;

        } catch (error) {
            return rejectWithValue(error.message || "Something goes wrong!");
        }
    }
);