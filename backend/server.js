const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");

require("dotenv").config();

const groupRoute = require("./router/group");
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const privateRoute = require("./router/private");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

let users = [];

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/group", groupRoute);
app.use("/private", privateRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/", (req, res, next) => {
  res.status(200).json({ message: "Server is Working..." });
  next();
});

io.on("connection", function (socket) {
  // Connect the user
  socket.on("user_connected", (userId) => {
    socket.join(userId);
    io.emit("received_user_connected", userId);
  });

  // Join the group
  socket.on("join_group", ({ groups }) => {
    console.log('groups', groups)
    groups?.map((group) => {
      if (group._id) {
        socket.join(group._id);
      }
      return group;
    });
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
    socket.in(userToCall).emit("callUser", { signal: signalData, from, name });
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
    io.emit("user_connected", users);
  });
});

const MONGO_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.isorui9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0
`;
mongoose
  .connect(MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((done) => {
    console.log("Connected");
    server.listen(process.env.PORT || 5000);
  });
