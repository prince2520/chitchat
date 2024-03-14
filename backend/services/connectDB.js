const mongoose = require("mongoose");
const {MONGO_URL} = require('../constants/constants');

module.exports = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then((done) => {
      console.log("Connected");
      server.listen(process.env.PORT || 5000);
    });
};
