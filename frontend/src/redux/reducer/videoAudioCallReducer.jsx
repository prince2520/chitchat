export const callingHandler = (state, action) => {
    state.callData = action.payload.callData;
    state.isCalling = action.payload.isCalling;
    state.isReceivingCall = action.payload.isReceivingCall;
};

export const callAcceptedHandler = (state) => {
    state.callAccepted = true;
};

export const receivingCallHandler = (state, action) => {
    state.isReceivingCall = action.payload.isReceivingCall;
    state.receivingCallDetails = action.payload.receivingCallDetails;
};

export const callEndedHandler = (state) =>  {
    state.isReceivingCall = false;
    state.callAccepted = false;
    state.receivingCallDetails = null;
    state.callingDetails = null;
    state.callEnded = true;
}