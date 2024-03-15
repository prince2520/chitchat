const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const privateSchema = new Schema({
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  ]
});

module.exports = mongoose.model("Private", privateSchema);
