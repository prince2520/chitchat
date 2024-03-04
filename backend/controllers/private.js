const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const Private = require("../models/private");

exports.createPrivate = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.body.userId);
  const chatId = mongoose.Types.ObjectId(req.body.chatId);

  const private = await Private.findOne({
    users: { $all: [userId, chatId]},
  });

  const sender = await User.findOne({ _id: userId });
  const receiver = await User.findOne({ _id: chatId });

  if (private) {
    return res
      .status(200)
      .json({ success: false, message: "Private user already added!" });
  } else {
    const newPrivate = new Private({
      users: [userId, chatId],
    });
    newPrivate
      .save()
      .then((data) => {
        sender.privates.push(data._id);
        receiver.privates.push(data._id);
        
        sender.save();
        receiver.save();

        return res
          .status(202)
          .json({ success: true, message: "User added to Private Chat!" });
      })
      .catch(() => {
        return res
          .status(404)
          .json({ success: false, message: "Something goes wrong!" });
      });
  }
};

exports.fetchPrivate = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.query.userId);

  const privateFound = await Private.find({
    users: { $in: [userId] },
  }).populate("users");

  if (privateFound) {
    return res.status(200).json({
      success: true,
      message: "Private User fetched successfully!",
      data: privateFound,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Something goes wrong!",
    });
  }
};

exports.sendPrivateMessage = async (req, res) => {
  let message, isOpenAIMsg, type, url, size, chatId, userId;

  chatId = mongoose.Types.ObjectId(req.body.chatId);

  // Message Data
  message = req.body.message;
  isOpenAIMsg = req.body.isOpenAIMsg;
  url = req.body.url ? req.body.url : "";
  size = req.body.size ? req.body.size : 0;
  type = req.body.type;
  userId = mongoose.Types.ObjectId(req.body.userId);

  const private = await Private.findOne({
    user: { $all: [userId, chatId] },
  });

  if (privateUser) {
    const newMessage = new Message({
      message: message,
      isOpenAIMsg: isOpenAIMsg,
      url: url,
      size: size,
      type: type,
      user: userId,
    });

    newMessage.save().then(() => {
      private?.messages.push(newMessage._id);
      private
        .save()
        .then(() => {
          return res
            .status(200)
            .json({ success: true, message: "Message saved Successfully!" });
        })
        .catch(() => {
          return res
            .status(404)
            .json({ success: true, message: "Something goes wrong!" });
        });
    });
  }
};
