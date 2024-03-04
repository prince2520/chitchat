const mongoose = require("mongoose");
const User = require("../models/user");
const Message = require("../models/message");
const Private = require("../models/private");

exports.createPrivate = async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.body.userId);
  const chatId = mongoose.Types.ObjectId(req.body.chatId);

  const private = await Private.findOne({
    users: { $all: [userId, chatId] },
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
  message = req.body.data.message;
  isOpenAIMsg = req.body.data.isOpenAIMsg;
  url = req.body.data.url ? req.body.data.url : "";
  size = req.body.data.size ? req.body.data.size : 0;
  type = req.body.data.type;
  userId = mongoose.Types.ObjectId(req.body.data.userId);

  const private = await Private.findOne({_id: chatId});

  if (private) {
    const newMessage = new Message({
      message,
      isOpenAIMsg,
      url,
      size,
      type,
      user: userId,
    });

    newMessage
      .save()
      .then((res) => res.populate("user").execPopulate())
      .then((data) => {
        private?.messages.push(data._id);
        private
          .save()
          .then(() => {
            return res.status(200).json({
              data : data,
              success: true,
              message: "Message saved Successfully!",
            });
          })
          .catch(() => {
            return res
              .status(404)
              .json({ success: true, message: "Something goes wrong!" });
          });
      });
  }
};
