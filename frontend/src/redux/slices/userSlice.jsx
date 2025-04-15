import { createSlice } from "@reduxjs/toolkit";
import { getUserThunk, loginThunk, updateUserThunk } from "../thunks/userThunk";
import { toast } from "react-toastify";

const initialUserState = {
  _id: "",
  name: "",
  email: "",
  status: "",
  highResUrl: "",
  lowResUrl: "",

  isAuth: false
};

function updateUserState(state, action) {
  const {
    _id,
    name,
    status,
    highResUrl,
    lowResUrl,
    email,
  } = action.payload;

  state = {
    ...state,
    _id,
    name,
    status,
    highResUrl,
    lowResUrl,
    email,
    isAuth: true
  };
}

const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    updateIsAuth(state, action) {
      state.isAuth = action.payload;
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
