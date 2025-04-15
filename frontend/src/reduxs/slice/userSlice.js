import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUserThunk, loginThunk, updateUserThunk } from "../thunk/userThunk";

function updateUserState(state, action) {
  const {
    _id,
    name,
    status,
    highResUrl,
    lowResUrl,
    email,
  } = action.payload.user;

  state._id = _id;
  state.name = name;
  state.status = status;
  state.highResUrl = highResUrl
  state.lowResUrl = lowResUrl
  state.email = email;
  state.token = action.payload.token; 
  state.isAuth = true
}


const initialUserState = {
  _id: "",
  name: "",
  email: "",
  status: "",
  highResUrl: "",
  lowResUrl: "",
  token : "",
  isAuth : false,
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateIsAuth(state, action){
      state.isAuth = action.payload;
    },
    updateToken(state,action){
      state.token = action.payload;
    },
    saveUserData(state, action) {
      state._id = action.payload._id ? action.payload._id : state._id;
      state.name = action.payload.name;
      state.status = action.payload.status;
      state.highResUrl = action.payload.highResUrl || state.highResUrl;
      state.lowResUrl = action.payload.lowResUrl || state.lowResUrl;
      state.email = action.payload.email || state.email;
      state.groups = action.payload.groups || state.groups;
      state.privates = action.payload.privates || state.privates;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, updateUserState)
      .addCase(getUserThunk.rejected, (_, action) => {
        toast(`${action.payload}`, {
          type: "error"
        });
      })

    builder
      .addCase(updateUserThunk.fulfilled, updateUserState)
      .addCase(updateUserThunk.rejected, (_, action) => {
        toast(`${action.payload}`, {
          type: "error"
        });
      })

    builder
      .addCase(loginThunk.fulfilled, updateUserState)
      .addCase(loginThunk.rejected, (_, action) => {
        toast(`${action.payload}`, {
          type: "error"
        });
      })
  }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
