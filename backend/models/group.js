const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    groupImageUrl: {
      type: String,
      required: false,
      default: "https://i.imgur.com/nHlY97n.png",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: false,
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
