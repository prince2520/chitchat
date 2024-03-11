const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: false,
    },
    isOpenAIMsg: {
      type: Boolean,
      default: false,
      required: false,
    },
    url: {
      type: String,
      required: false,
      default: "",
    },
    size: {
      type: Number,
      required: false,
      default: 0,
    },
    type: {
      type: String,
      default: "string",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
