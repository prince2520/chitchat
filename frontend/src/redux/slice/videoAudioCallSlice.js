import { createSlice } from "@reduxjs/toolkit";
import { callAcceptedHandler, callEndedHandler, callingHandler, receivingCallHandler } from "../reducer/videoAudioCallReducer";

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
    callingHandler,
    callAcceptedHandler,
    receivingCallHandler,
    callEndedHandler,
  },
});

export const VideoAudioCallActions = VideoAudioCallSlice.actions;
export default VideoAudioCallSlice.reducer;
