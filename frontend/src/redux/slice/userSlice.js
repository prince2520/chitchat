import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
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
  state.isAuth = true;

  toast.success(`${action.payload.message}`);
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, updateUserState)
      .addCase(getUserThunk.rejected, (_, action) => {
        toast.error(`${action.payload}`);
      })

    builder
      .addCase(updateUserThunk.fulfilled, updateUserState)
      .addCase(updateUserThunk.rejected, (_, action) => {
        toast.error(`${action.payload}`);
      })

    builder
      .addCase(loginThunk.fulfilled, updateUserState)
      .addCase(loginThunk.rejected, (_, action) => {
        toast.error(`${action.payload}`);
      })
  }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
