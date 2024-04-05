import io from "socket.io-client";

export let socket = null;

// USER - initiate socket
export const socketInitiate = (userId) => {
  socket = io(process.env.REACT_APP_SERVER_URL, { transports: ["websocket"] });
  socket.emit("user_connect", userId);
};

// USER - disconnect socket
export const socketDisconnect = (userId) => {
  if (socket) {
    socket.disconnect(userId);
  }
};

// GROUP
// GROUP - join group
export const socketJoinGroup = (groups) => {
  if (socket) {
    socket.emit("join_group", { groups });
  }
};

// GROUP - remove user from group
export const socketRemoveUserGroup = (data) => {
  if (socket) {
    socket.emit("remove_user_group", { data });
  }
};

// GROUP - get remove user from group
export const socketGetRemoveUserGroup = (cb) => {
  if (socket) {
    socket.on("get_remove_user_group", ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - updated group
export const socketUpdatedGroup = (data) => {
  if (socket) {
    socket.emit("updated_group", { data });
  }
};

// GROUP - get updated group
export const socketGetUpdatedGroup = (cb) => {
  if (socket) {
    socket.on("get_updated_group", ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - block user from group
export const socketBlockUser = (data) => {
  if (socket) {
    socket.emit("blockUser", { data });
  }
};

// GROUP - get block user from group
export const socketGetBlockUser = (cb) => {
  if (socket) {
    socket.on("get_blockUser", ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - unblock user from group
export const socketUnblockUser = (data) => {
  if (socket) {
    socket.emit("unblockUser", { data });
  }
};

// GROUP - get unblock user from group
export const socketGetUnblockUser = (cb) => {
  if (socket) {
    socket.on("get_unblockUser", ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - add member to group
export const socketAddMemberGroup = (data) => {
  if (socket) {
    socket.emit("addMember_group", { data });
  }
};

// GROUP - get add member to group
export const socketGetAddMemberGroup = (cb) => {
  if (socket) {
    socket.on("get_addMember_group", ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - leave member to group
export const socketLeaveMemberGroup = (data) => {
  if (socket) {
    socket.emit("leaveMember_group", { data });
  }
};

// GROUP - get leave member to group
export const socketGetLeaveMemberGroup = (cb) => {
  if (socket) {
    socket.on("get_leaveMember_group", ({ data }) => {
      cb(null, { data });
    });
  }
};

// PRIVATE 
// PRIVATE - add private User
export const socketAddPrivate = (data) => {
  if (socket) {
    socket.emit("add_private", { data });
  }
};

// PRIVATE - get add private User
export const socketGetAddPrivate = (cb) => {
  if (socket) {
    socket.on("get_add_private", ({ data }) => {
      return cb(null, { data });
    });
  }
};

// VIDEO & Audio Call (PRIVATE)

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

// PRIVATE -> Off Call Accepted
export const socketOffCallAccepted = () => {
  if (socket) {
    socket.off("get_callAccepted");
  }
};

// GROUP & PRIVATE

// GROUP & PRIVATE - send message
export const socketSendMessage = (data) => {
  if (socket) {
    socket.emit("send_message", { data });
  }
};

// GROUP & PRIVATE - get send message
export const socketGetSendMessage = (cb) => {
  if (socket) {
    socket.on("get_send_message", ({ data }) => {
      return cb(null, { data });
    });
  }
};

// GROUP & PRIVATE - remove chat
export const socketRemoveChat = (data) => {
  socket.emit("remove_chat", { data });
};

// GROUP & PRIVATE - get remove chat
export const socketGetRemoveChat = (cb) => {
  socket.on("get_remove_chat", ({ data }) => {
    cb(data);
  });
};
