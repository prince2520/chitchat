module.exports = (io) => {
  io.on("connection", function (socket) {

    // Connect the user
    socket.on("user_connected", (userId) => {
      socket.join(userId);
      io.emit("received_user_connected", userId);
    });

    // Join the group
    socket.on("join_group", ({ groups }) => {
      groups?.map((group) => {
        if (group._id) {
          socket.join(group._id);
        }
        return group;
      });
    });

    // Add private User
    socket.on("add_private", ({ data }) => {
      data.private.users?.map((user) => {
        let userId = user._id;
        if (userId === data.userId) return;
        socket.in(userId).emit("recived_private_user", { data: data });
      })
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

    // Leave Group
    socket.on("leave_group", function ({ groupId }) {
      socket.leave(groupId);
    });

    // Disconnect the user
    socket.on("disconnect", function (userId) {
      socket.leave(userId);
    });
  });
};
