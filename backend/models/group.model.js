const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    highResUrl: {
      type: String,
      required: false,
      default: "https://i.imgur.com/sFlcbYx.png",
    },
    lowResUrl: {
      type: String,
      required: false,
      default: "https://i.imgur.com/Pq8Irug.png",
    },
    status: {
      type: String,
      required: true,
      default: "Let's connect, share, and laugh together. ",
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
    blockList : [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      }
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
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
