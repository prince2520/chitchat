import io from "socket.io-client";

/*
Frontend - Front 
Backend - Back
*/

export let socket = null;

// USER - initiate socket (Front -> Back)
export const socketInitiate = (userId) => {
  socket = io(process.env.REACT_APP_SERVER_URL, { transports: ["websocket"] });
  socket.emit("user_connect", userId);
};

// USER - disconnect socket (Front -> Back)
export const socketDisconnect = (userId) => {
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

export const socketAddPrivate = (data) => {
  if (socket) {
    socket.emit("add_private", { data });
  }
};

export const socketGetChatMessage = (cb) => {
  if (socket) {
    socket.on("received_message", ({ data }) => {
      return cb(null, { data });
    });
  }
};

export const socketGetPrivateChat = (cb) => {
  if (socket) {
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

// VIDEO AND AUDIO CALL (PRIVATE)

// PRIVATE -> Call
export const socketCall = (callData) => {
  socket.emit("call", { callData });
};

// PRIVATE -> Get Call
export const socketGetCall = (cb) => {
  socket.on("get_call", ({ callData }) => {
    cb(null, { callData });
  });
};

// Private -> Call Accepted
export const socketCallAccepted = (data) => {
  if (socket) {
    socket.emit("callAccepted", { data });
  }
};

// Private -> Get Call Accepted
export const socketGetCallAccepted = (cb) => {
  if (socket) {
    socket.on("get_callAccepted", ({ data }) => {
      cb(null, { data });
    });
  }
};

// PRIVATE -> End Call
export const socketEndCall = (data) => {
  if (socket) {
    socket.emit("endCall", { data });
  }
};

// PRIVATE -> Get End Call
export const socketGetEndCall = (cb) => {
  if (socket) {
    socket.on("get_endCall", ({ data }) => {
      cb(null, { data });
    });
  }
};

export const socketOffCallAccepted = () => {
  if (socket) {
    socket.off("get_callAccepted");
  }
};

export const socketBlockUser = (data) => {
  if (socket) {
    socket.emit("blockUser", { data });
  }
};

export const socketGetBlockUser = (cb) => {
  if (socket) {
    socket.on("get_blockUser", ({ data }) => {
      cb(null, { data });
    });
  }
};

export const socketUnblockUser = (data) => {
  if (socket) {
    socket.emit("unblockUser", { data });
  }
};

export const socketGetUnblockUser = (cb) => {
  if (socket) {
    socket.on("get_addMember_group", ({ data }) => {
      cb(null, { data });
    });
  }
};

export const socketAddMemberGroup = (data) => {
  if (socket) {
    socket.emit("addMember_group", { data });
  }
};

export const socketGetAddMemberGroup = (cb) => {
  if (socket) {
    socket.on("get_addMember_group", ({ data }) => {
      cb(null, { data });
    });
  }
};
