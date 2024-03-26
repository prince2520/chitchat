import { createSlice } from "@reduxjs/toolkit";

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
    callingHandler(state, action) {
      console.log("calling handler action", action.payload);
      state.callData = action.payload.callData;
      state.isCalling = action.payload.isCalling;
      state.isReceivingCall = action.payload.isReceivingCall;
    },

    callAcceptedHandler(state) {
      state.callAccepted = true;
    },

    receivingCallHandler(state, action) {
      state.isReceivingCall = action.payload.isReceivingCall;
      state.receivingCallDetails = action.payload.receivingCallDetails;
    },

    callEndedHandler(state) {
      state.isReceivingCall = false;
      state.callAccepted = false;
      state.receivingCallDetails = null;
      state.callingDetails = null;
      state.callEnded = true;
    },
  },
});

export const VideoAudioCallActions = VideoAudioCallSlice.actions;
export default VideoAudioCallSlice.reducer;
