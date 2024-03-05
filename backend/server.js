const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require("helmet");

require("dotenv").config();
require("./socket")(io);

const groupRoute = require("./router/group");
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const privateRoute = require("./router/private");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

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
