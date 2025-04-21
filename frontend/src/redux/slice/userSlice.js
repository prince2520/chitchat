import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginThunk, updateUserThunk } from "../thunk/userThunk";
import { updateIsAuthReducer, updateTokenReducer, updateUserReducer } from "../reducer/userReducer";

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
    updateIsAuthReducer,
    updateTokenReducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserThunk.fulfilled, updateUserReducer)
      .addCase(getUserThunk.rejected, (_, action) => {
        toast.error(`${action.payload}`);
      })

    builder
      .addCase(updateUserThunk.fulfilled, updateUserReducer)
      .addCase(updateUserThunk.rejected, (_, action) => {
        toast.error(`${action.payload}`);
      })

    builder
      .addCase(loginThunk.fulfilled, updateUserReducer)
      .addCase(loginThunk.rejected, (_, action) => {
        toast.error(`${action.payload}`);
      })
  }
});

export const UserActions = UserSlice.actions;
export default UserSlice.reducer;
