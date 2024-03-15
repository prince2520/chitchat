const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const groupRoute = require("./routes/group.route");
const helperRoute = require("./routes/helper.route");
const privateRoute = require("./routes/private.route");

const {errorHandler} = require("./middleware/error.middleware");
const {cors} = require("./middleware/cors.middleware");

const bodyParser = require("body-parser");
const helmet = require("helmet");

require("dotenv").config();
require("./services/socket")(io);
require("./services/connectDB").connectDB(server);

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// cors error handling 
app.use(cors);

// routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/group", groupRoute);
app.use("/helper", helperRoute);
app.use("/private", privateRoute);

// error handling
app.use(errorHandler);

