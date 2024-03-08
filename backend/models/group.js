const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupImageUrl: {
      type: String,
      required: false,
      default: "https://i.imgur.com/nHlY97n.png",
    },
    status: {
      type: String,
      required: false,
      default: "Let's connect, share, and laugh together. ",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: false,
      },
    ],
    blockList : [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
      }
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
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
