import io from 'socket.io-client';

let socket;

export const initiateSocket = (userId) => {
    socket = io(process.env.REACT_APP_SERVER_URL, {transports: ['websocket']});
    socket.emit('user_connected', userId);
}

export const sendChatMessageHandler = (data) => {
    if(socket){
        socket.emit('send_message',{data});
    }
};

export const getCallAcceptedHandler= (cb) => {
    socket.on('callAccepted', (signal) => {
        cb(signal);
    });
}

export const getCall = (cb) => {
    socket.on('callUser', ({from, name: callerName, signal }) => {
        console.log({from, name: callerName, signal });
        cb(null, {isReceivingCall: true, from, name: callerName, signal});
    });
}

export const sendAnswerCallHandler = ({data, call}) => {
    socket.emit('answerCall', { signal: data, to: call.from });
}

export const sendCallUserHandler = ({userToCall, signalData, from , name }) => {

    socket.emit('callUser', { userToCall, signalData, from, name});
}

export const getChatMessage = (cb) => {
    if(!socket){
        return true
    }else{
        socket.on("received_message",({messageData})=>{
            return cb(null,{messageData})
        })
    };
}

export const disconnectSocket = (userId) => {
    if(socket){
        socket.disconnect(userId);
    }
}

