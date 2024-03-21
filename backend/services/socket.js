/*
USER - 
GROUP - 
PRIVATE -
*/

module.exports = (io) => {
  io.on("connection", function (socket) {
    // USER - initiate the socket
    socket.on("user_connect", (userId) => {
      socket.join(userId);
      io.emit("get_user_connected", userId);
    });

    // USER - disconnect the user
    socket.on("disconnect", function (userId) {
      socket.leave(userId);
    });

    // GROUP - join
    socket.on("join_group", ({ groups }) => {
      groups?.map((group) => {
        if (group._id) {
          socket.join(group._id);
        }
        return group;
      });
    });

    // GROUP - remove
    socket.on("remove_chat", ({ data }) => {
      if (data.type === "Group") {
        io.to(data.chatId).emit("received_remove_chat", { data });
        socket.leave(data.chatId);
      } else {
        io.to(data.privatUserId).emit("received_remove_chat", { data });
      }
    });

    // GROUP - remove user
    socket.on("remove_user_group", function ({ data }) {
      socket
        .to(data.groupId)
        .emit("recieved_remove_user_group", { data: data });
    });

    // GROUP - update group detail
    socket.on("updated_group_detail", function ({ data }) {
      socket.to(data.groupId).emit("get_updated_group_detail", { data: data });
    });

    // GROUP - leave Group
    socket.on("leave_group", function ({ groupId }) {
      socket.leave(groupId);
    });

    // PRIVATE - add private User
    socket.on("add_private", ({ data }) => {
      data.private.users?.map((user) => {
        let userId = user._id;
        if (userId === data.userId) return;
        socket.in(userId).emit("recived_private_user", { data: data });
      });
    });

    // GROUP & PRIVATE - Send  message to receiver
    socket.on("send_message", ({ data }) => {
      if (!data.users) return console.log("Users not defined");

      if (data.selectedType === "Group") {
        socket.to(data.chatId).emit("received_message", { data: data });
      } else {
        data.users.forEach((user) => {
          let userId = user._id;
          if (userId === data.data.userId) return;
          socket.in(userId).emit("received_message", { data: data });
        });
      }
    });

    // VIDEO CALL (PRIVATE)
    // PRIVATE -> Call User
    socket.on("call", ({callData }) => {
      console.log("call", callData);
      socket.in(callData.userToCall).emit("get_call", { callData });
    });

    // PRIVATE -> Call Accepted
    socket.on("callAccepted", ({data}) => {
      console.log("callAccepted", data);
      socket.in(data.userToCall).emit("get_callAccepted", {data});
    });

    // PRIVATE -> END CALL
    socket.on("endCall", ({data}) => {
      console.log("endCall", data);
      socket.in(data.to._id).emit("get_endCall", {data});
    });
  });
};
