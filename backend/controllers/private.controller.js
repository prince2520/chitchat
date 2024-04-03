const mongoose = require("mongoose");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const Private = require("../models/private.model");
const { StatusCodes } = require("http-status-codes");

// POST -> create private chat
exports.createPrivate = async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const chatId = mongoose.Types.ObjectId(req.body.chatId);

  try {
    if (req.userId === req.body.chatId) {
      let error = new Error("You cannot create a private chat with yourself!");
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }

    const private = await Private.findOne({
      users: { $all: [userId, chatId] },
    });

    if (private) {
      let error = new Error("Private chat already created!");
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }

    const sender = await User.findOne({ _id: userId });

    if (!sender) {
      let error = new Error("Sender not found!");
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }

    const receiver = await User.findOne({ _id: chatId });

    if (!receiver) {
      let error = new Error("Receiver not found!");
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }

    const newPrivate = new Private({
      users: [userId, chatId],
    });

    const savePrivate = await newPrivate.save();

    if (!savePrivate) {
      let error = new Error("Private chat not saved!");
      error.statusCode = StatusCodes.NOT_IMPLEMENTED;
      throw error;
    }

    const poulateMsgUserSavePrivate = await savePrivate
      .populate([{ path: "messages", populate: "user" }, "users"])
      .execPopulate();

    sender.privates.push(poulateMsgUserSavePrivate._id);
    receiver.privates.push(poulateMsgUserSavePrivate._id);

    const saveSender = await sender.save();

    if (!saveSender) {
      let error = new Error("Private chat not saved in sender!");
      error.statusCode = StatusCodes.NOT_IMPLEMENTED;
      throw error;
    }

    const saveReceiver = await receiver.save();

    if (!saveReceiver) {
      let error = new Error("Private chat not saved in receiver!");
      error.statusCode = StatusCodes.NOT_IMPLEMENTED;
      throw error;
    }
    
    return res.status(202).json({
      success: true,
      data: poulateMsgUserSavePrivate,
      message: "Private chat created!",
    });
    
  } catch (err) {
    next(err);
  }
};

// POST -> save private message
exports.savePrivateMessage = async (req, res, next) => {
  let message, isOpenAIMsg, type, url, size, chatId, userId;

  chatId = mongoose.Types.ObjectId(req.body.chatId);

  // message data
  message = req.body.data?.message ? req.body.data.message : "";
  isOpenAIMsg = req.body.data.isOpenAIMsg;
  url = req.body.data.url ? req.body.data.url : "";
  size = req.body.data.size ? req.body.data.size : 0;
  type = req.body.data.type;
  userId = mongoose.Types.ObjectId(req.userId);

  try {
    const private = await Private.findOne({ _id: chatId });

    if (!private) {
      let error = new Error("Private chat not saved!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const newMessage = new Message({
      message,
      isOpenAIMsg,
      url,
      size,
      type,
      user: userId,
    });

    const saveNewMessage = await newMessage.save();

    if (!saveNewMessage) {
      let error = new Error("New message not created!");
      error.statusCode = StatusCodes.NOT_IMPLEMENTED;
      throw error;
    }

    const poulateUserSaveNewMsg = await saveNewMessage
      .populate("user")
      .execPopulate();

    private?.messages.push(poulateUserSaveNewMsg._id);
    const savePrivate = await private.save();

    if (!savePrivate) {
      let error = new Error("Message not saved in private!");
      error.statusCode = StatusCodes.NOT_IMPLEMENTED;
      throw error;
    }

    return res.status(200).json({
      data: poulateUserSaveNewMsg,
      success: true,
      message: "Message saved Successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// DELETE -> private chat delete
exports.deletePrivate = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const privateId = mongoose.Types.ObjectId(req.body.chatId);

  try {
    const privateFound = await Private.findOne({ _id: privateId });

    if (!privateFound) {
      let error = new Error("Private chat not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    if (privateFound.users.includes(userId)) {
      const users = [...privateFound.users];

      await Message.deleteMany({ _id: privateFound.messages });
      await privateFound.remove();

      await User.updateMany(
        { _id: { $in: users } },
        { $pull: { privates: privateId } },
        { multi: true }
      );

      return res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Private chat removed successfully!" });
    } else {
      let error = new Error("You are not authenticated!");
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};
