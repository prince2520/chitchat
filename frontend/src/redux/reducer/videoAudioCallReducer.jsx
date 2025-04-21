export const callingReducer = (state, action) => {
    state.callData = action.payload.callData;
    state.isCalling = action.payload.isCalling;
    state.isReceivingCall = action.payload.isReceivingCall;
};

export const callAcceptedReducer = (state) => {
    state.callAccepted = true;
};

export const receivingCallReducer = (state, action) => {
    state.isReceivingCall = action.payload.isReceivingCall;
    state.receivingCallDetails = action.payload.receivingCallDetails;
};

export const callEndedReducer = (state) =>  {
    state.isReceivingCall = false;
    state.callAccepted = false;
    state.receivingCallDetails = null;
    state.callingDetails = null;
    state.callEnded = true;
}