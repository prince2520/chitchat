import io from "socket.io-client";
import { SOCKET_EVENT } from "../utils/SocketEvent";

export let socket = null;

// USER - initiate socket
export const socketInitiate = (userId) => {
  console.log(userId);
  socket = io(process.env.REACT_APP_SERVER_URL, { transports: ["websocket"] });
  socket.emit(SOCKET_EVENT.USER_CONNECT, userId);
  
};

// USER - disconnect socket
export const socketDisconnect = ({ userId }) => {
  if (socket) {
    socket.disconnect();
  }
};

// USER - disconnect socket
export const socketGetAutoLogout = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_AUTO_LOGOUT, ({ userId, alreadyLogin }) => {
      cb(null, { userId, alreadyLogin });
    });
  }
};

// GROUP
// GROUP - multiple join group
export const socketJoinGroups = (groups) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_GROUPS, { groups });
  }
};

// GROUP - single join group
export const socketJoinGroup = (groupId) => {
  console.log(groupId);
  if (socket) {
    socket.emit(SOCKET_EVENT.JOIN_GROUP, { groupId });
  }
};


// GROUP - remove user from group
export const socketRemoveUserGroup = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.REMOVE_USER_GROUP, { data });
  }
};

// GROUP - get remove user from group
export const socketGetRemoveUserGroup = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_REMOVE_USER_GROUP, ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - updated group
export const socketUpdatedGroup = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.UPDATED_GROUP, { data });
  }
};

// GROUP - get updated group
export const socketGetUpdatedGroup = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_UPDATED_GROUP, ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - block user from group
export const socketBlockUser = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.BLOCK_USER, { data });
  }
};

// GROUP - get block user from group
export const socketGetBlockUser = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_BLOCK_USER, ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - unblock user from group
export const socketUnblockUser = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.UNBLOCK_USER, { data });
  }
};

// GROUP - get unblock user from group
export const socketGetUnblockUser = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_UNBLOCK_USER, ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - add member to group
export const socketAddMemberGroup = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.ADD_MEMBER_GROUP, { data });
  }
};

// GROUP - get add member to group
export const socketGetAddMemberGroup = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_ADD_MEMBER_GROUP, ({ data }) => {
      cb(null, { data });
    });
  }
};

// GROUP - leave member to group
export const socketLeaveMemberGroup = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.LEAVE_MEMBER_GROUP, { data });
  }
};

// GROUP - get leave member to group
export const socketGetLeaveMemberGroup = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_LEAVE_MEMBER_GROUP, ({ data }) => {
      cb(null, { data });
    });
  }
};

// PRIVATE
// PRIVATE - add private User
export const socketAddPrivate = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.ADD_PRIVATE, { data });
  }
};

// PRIVATE - get add private User
export const socketGetAddPrivate = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_ADD_PRIVATE, ({ data }) => {
      return cb(null, { data });
    });
  }
};

// VIDEO & Audio Call (PRIVATE)

// PRIVATE -> Call
export const socketCall = (callData) => {
  socket.emit(SOCKET_EVENT.CALL, { callData });
};

// PRIVATE -> Get Call
export const socketGetCall = (cb) => {
  socket.on(SOCKET_EVENT.GET_CALL, ({ callData }) => {
    cb(null, { callData });
  });
};

// Private -> Call Accepted
export const socketCallAccepted = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.CALL_ACCEPTED, { data });
  }
};

// Private -> Get Call Accepted
export const socketGetCallAccepted = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_CALL_ACCEPTED, ({ data }) => {
      cb(null, { data });
    });
  }
};

// PRIVATE -> End Call
export const socketEndCall = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.END_CALL, { data });
  }
};

// PRIVATE -> Get End Call
export const socketGetEndCall = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_END_CALL, ({ data }) => {
      cb(null, { data });
    });
  }
};

// PRIVATE -> Off Call Accepted
export const socketOffCallAccepted = () => {
  if (socket) {
    socket.off(SOCKET_EVENT.GET_CALL_ACCEPTED);
  }
};

// GROUP & PRIVATE

// GROUP & PRIVATE - send message
export const socketSendMessage = (data) => {
  if (socket) {
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, { data });
  }
};

// GROUP & PRIVATE - get send message
export const socketGetSendMessage = (cb) => {
  if (socket) {
    socket.on(SOCKET_EVENT.GET_SEND_MESSAGE, ({ data }) => {
      return cb(null, { data });
    });
  }
};

// GROUP & PRIVATE - remove chat
export const socketRemoveChat = (data) => {
  socket.emit(SOCKET_EVENT.REMOVE_CHAT, { data });
};

// GROUP & PRIVATE - get remove chat
export const socketGetRemoveChat = (cb) => {
  socket.on(SOCKET_EVENT.GET_REMOVE_CHAT, ({ data }) => {
    cb(data);
  });
};
