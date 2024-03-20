import { createSlice } from "@reduxjs/toolkit";

const initialVideoAudioCallState = {
  isCalling: false,
  isReceivingCall: false,

  callingDetails: null,
  callAccepted: false,
  callEnded: true,
};

const VideoAudioCallSlice = createSlice({
  name: "videoAudioCall",
  initialState: initialVideoAudioCallState,
  reducers: {
    callingHandler(state, action) {
      state.isCalling = action.payload.isCalling;
      state.callingDetails = action.payload.callingDetails;
      state.isReceivingCall = action.payload.isReceivingCall;
    },
    callAcceptedHandler(state, action) {
      state.callAccepted = action.payload.callAccepted;
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
