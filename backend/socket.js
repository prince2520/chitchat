module.exports = (io) => {
  io.on("connection", function (socket) {
    // USER - Connect
    socket.on("user_connected", (userId) => {
      socket.join(userId);
      io.emit("received_user_connected", userId);
    });

    // GROUP - Join
    socket.on("join_group", ({ groups }) => {
      groups?.map((group) => {
        if (group._id) {
          socket.join(group._id);
        }
        return group;
      });
    });

    // PRIVATE - add private User
    socket.on("add_private", ({ data }) => {
      data.private.users?.map((user) => {
        let userId = user._id;
        if (userId === data.userId) return;
        socket.in(userId).emit("recived_private_user", { data: data });
      });
    });

    // GROUP - remove 
    socket.on("remove_chat", ({ data }) => {
      console.log("remove", data);
      if (data.type === "Group") {
        io.to(data.chatId).emit("received_remove_chat", { data });
        socket.leave(data.chatId);
      } else {
        io.to(data.privatUserId).emit("received_remove_chat", { data });
      }
    });

    // Send  message to receiver
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

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
      socket
        .in(userToCall)
        .emit("callUser", { signal: signalData, from, name });
    });

    socket.on("answerCall", (data) => {
      socket.in(data.to).emit("callAccepted", data.signal);
    });

    // GROUP - leave Group
    socket.on("leave_group", function ({ groupId }) {
      socket.leave(groupId);
    });

    // GROUP - remove user 
    socket.on("remove_user_group", function ({ data }) {
      socket
        .to(data.groupId)
        .emit("recieved_remove_user_group", { data: data });
    });

    // GROUP - update group detail
    socket.on("update_group_detail", function ({ data }) {
      socket
        .to(data.groupId)
        .emit("get_update_group_detail", { data: data });
    });

    // disconnect the user
    socket.on("disconnect", function (userId) {
      socket.leave(userId);
    });
  });
};
