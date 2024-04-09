const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select : false
  },
  status: {
    type: String,
    required: true,
    default: "Hey there! I am using ChatApp",
  },
  highResUrl: {
    type: String,
    required: true,
    default: "https://i.imgur.com/9btv3K6.png",
  },
  lowResUrl: {
    type: String,
    required: true,
    default: "https://i.imgur.com/vwW3cKz.png",
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  ],
  privates: [
    {
      type: Schema.Types.ObjectId,
      ref: "Private",
      required: true,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
