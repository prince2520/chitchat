import { createSlice } from "@reduxjs/toolkit";
import { callAcceptedReducer, callEndedReducer, callingReducer, receivingCallReducer } from "../reducer/videoAudioCallReducer";

const initialVideoAudioCallState = {
  isCalling: false,
  isReceivingCall: false,

  callAccepted: false,
  callEnded: true,

  callData: {
    userToCall: null,
    callingType: null,
    data: {
      user: null,
      signal: null,
    }
  },
};

const VideoAudioCallSlice = createSlice({
  name: "videoAudioCall",
  initialState: initialVideoAudioCallState,
  reducers: {
    callingReducer,
    callAcceptedReducer,
    receivingCallReducer,
    callEndedReducer
  },
});

export const VideoAudioCallActions = VideoAudioCallSlice.actions;
export default VideoAudioCallSlice.reducer;
