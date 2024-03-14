import io from "socket.io-client";

/*
Frontend - Front 
Backend - Back
*/

let socket = null;

// USER - initiate socket (Front -> Back)
export const initiateSocket = (userId) => {
  socket = io(process.env.REACT_APP_SERVER_URL, { transports: ["websocket"] });
  socket.emit("user_connect", userId);
};

// USER - disconnect socket (Front -> Back)
export const disconnectSocket = (userId) => {
  if (socket) {
    socket.disconnect(userId);
  }
};

// GROUP - join Group (Front -> Back)
export const socketJoinGroup = (groups) => {
  if (socket) {
    socket.emit("join_group", { groups });
  }
};

// GROUP - updated group details (Front -> Back)
export const socketUpdatedGroup = (data) => {
  if (socket) {
    socket.emit("updated_group_detail", { data });
  }
};

// GROUP - updated group details (Back -> Front)
export const socketGetUpdatedGroup = (cb) => {
  if (socket) {
    socket.on("get_updated_group_detail", ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP & PRIVATE - send message (F -> B)
export const socketSendMessage = (data) => {
  if (socket) {
    socket.emit("send_message", { data });
  }
};


export const socketRemoveChat = (data) => {
  socket.emit("remove_chat", { data });
};

export const socketGetRemoveChat = (cb) => {
  socket.on("received_remove_chat", ({ data }) => {
    cb(data);
  });
};

export const getCallAcceptedHandler = (cb) => {
  socket.on("callAccepted", (signal) => {
    cb(signal);
  });
};

export const getCall = (cb) => {
  socket.on("callUser", ({ from, name: callerName, signal }) => {
    console.log({ from, name: callerName, signal });
    cb(null, { isReceivingCall: true, from, name: callerName, signal });
  });
};

export const sendAnswerCallHandler = ({ data, call }) => {
  socket.emit("answerCall", { signal: data, to: call.from });
};

export const sendCallUserHandler = ({ userToCall, signalData, from, name }) => {
  socket.emit("callUser", { userToCall, signalData, from, name });
};

export const socketAddPrivate = (data) => {
  if (socket) {
    socket.emit("add_private", { data });
  }
};

export const getChatMessage = (cb) => {
  if (socket) {
    socket.on("received_message", ({ data }) => {
      return cb(null, { data });
    });
  }
};

export const getPrivateChat = (cb) => {
  if(socket){
    socket.on("recived_private_user", ({ data }) => {
      return cb(null, { data });
    });
  }
};

export const socketRemoveUserGroup = (data) => {
  if (socket) {
    socket.emit("remove_user_group", { data });
  }
};

export const socketGetRemoveGroup = (cb) => {
  if (socket) {
    socket.on("recieved_remove_user_group", ({ data }) => {
      cb(null, { data });
    });
  }
};


