import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginThunk, updateUserThunk } from "../thunk/userThunk";
import { updateIsAuth, updateToken, updateUserState } from "../reducer/userReducer";

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
    updateIsAuth,
    updateToken
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
