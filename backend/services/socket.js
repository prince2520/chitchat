const { SOCKET_EVENT}  = require("../utils/socket_event");


const users = new Map();

module.exports = (io) => {
  io.on("connection", function (socket) {
   
    // USER - initiate socket
    socket.on(SOCKET_EVENT.USER_CONNECT, (userId) => {

      if(users.has(userId)){
        users.delete(userId);
        socket.to(userId).emit(SOCKET_EVENT.GET_AUTO_LOGOUT, { userId: userId,  alreadyLogin : true});
      }

      users.set(userId, socket.id);
      socket.join(userId);

      io.emit(SOCKET_EVENT.GET_USER_CONNECTED, userId);
    });

    // USER - disconnect socket
    socket.on(SOCKET_EVENT.DISCONNECT,() => {
      socket.leave();
    });

    

    // GROUP - join group
    socket.on(SOCKET_EVENT.JOIN_GROUP, ({ groups }) => {
      groups?.map((group) => {
        if (group._id) {
          socket.join(group._id);
        }
        return group;
      });
    });

    // GROUP - remove user from group
    socket.on(SOCKET_EVENT.REMOVE_USER_GROUP, function ({ data }) {
      socket.to(data.groupId).emit(SOCKET_EVENT.GET_REMOVE_USER_GROUP, { data: data });
    });

    // GROUP - update group detail
    socket.on(SOCKET_EVENT.UPDATED_GROUP, function ({ data }) {
      socket.to(data.groupId).emit(SOCKET_EVENT.GET_UPDATED_GROUP, { data: data });
    });

    // GROUP - block user from group
    socket.on(SOCKET_EVENT.BLOCK_USER, function ({ data }) {
      socket.to(data.groupId).emit(SOCKET_EVENT.GET_BLOCK_USER, { data: data });
    });

    // GROUP - unblock user from group
    socket.on(SOCKET_EVENT.UNBLOCK_USER, function ({ data }) {
      socket.to(data.groupId).emit(SOCKET_EVENT.GET_UNBLOCK_USER, { data: data });
    });

    // GROUP - add member to group
    socket.on(SOCKET_EVENT.ADD_MEMBER_GROUP, function ({ data }) {
      socket.to(data.groupId).emit(SOCKET_EVENT.GET_ADD_MEMBER_GROUP, { data: data });
    });

    // GROUP - leave member to group
    socket.on(SOCKET_EVENT.LEAVE_MEMBER_GROUP, function ({ data }) {
      socket.to(data.groupId).emit(SOCKET_EVENT.GET_LEAVE_MEMBER_GROUP, { data: data });
    });

    // GROUP - leave Group
    socket.on(SOCKET_EVENT.LEAVE_GROUP, function ({ groupId }) {
      socket.leave(groupId);
    });

    // PRIVATE - add private User
    socket.on(SOCKET_EVENT.ADD_PRIVATE, ({ data }) => {
      data.private.users?.map((user) => {
        let userId = user._id;
        if (userId === data.userId) return;
        socket.in(userId).emit(SOCKET_EVENT.GET_ADD_PRIVATE, { data: data });
      });
    });

    

    // VIDEO & AUDIO CALL (PRIVATE)

    // PRIVATE -> Call
    socket.on(SOCKET_EVENT.CALL, ({ callData }) => {
      socket.in(callData.userToCall).emit(SOCKET_EVENT.GET_CALL, { callData });
    });

    // PRIVATE -> Call Accepted
    socket.on(SOCKET_EVENT.CALL_ACCEPTED, ({ data }) => {
      socket.in(data.userToCall).emit(SOCKET_EVENT.GET_CALL_ACCEPTED, { data });
    });

    // PRIVATE -> END CALL
    socket.on(SOCKET_EVENT.END_CALL, ({ data }) => {
      socket.in(data.userToCall).emit(SOCKET_EVENT.GET_END_CALL, { data });
    });



    // GROUP & PRIVATE - send message
    socket.on(SOCKET_EVENT.SEND_MESSAGE, ({ data }) => {
      if (!data.users) return console.log("Users not defined");

      if (data.selectedType === "Group") {
        socket.to(data.chatId).emit(SOCKET_EVENT.GET_SEND_MESSAGE, { data: data });
      } else {
        data.users.forEach((user) => {
          let userId = user._id;
          if (userId === data.data.userId) return;
          socket.in(userId).emit(SOCKET_EVENT.GET_SEND_MESSAGE, { data: data });
        });
      }
    });

     // GROUP & PRIVATE - remove chat
     socket.on(SOCKET_EVENT.REMOVE_CHAT, ({ data }) => {
      if (data.type === "Group") {
        io.to(data.chatId).emit(SOCKET_EVENT.GET_REMOVE_CHAT, { data });
        socket.leave(data.chatId);
      } else {
        io.to(data.privatUserId).emit(SOCKET_EVENT.GET_REMOVE_CHAT, { data });
      }
    });

  });
};
