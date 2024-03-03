const mongoose = require("mongoose");
const User = require("../models/user");
const Group = require("../models/group");
const Message = require("../models/message");
const { validationResult } = require("express-validator");

exports.createGroup = async (req, res) => {
  const name = req.body.name;
  const groupImageUrl = req.body.groupImageUrl;
  const userId = mongoose.Types.ObjectId(req.body.userId);

  const invalidInput = validationResult(req);

  if (!invalidInput.isEmpty()) {
    return res
      .status(422)
      .json({ success: false, message: invalidInput.errors[0].msg });
  } else {
    const userFound = await User.findOne({ _id: userId });

    let data = {
      name: name,
      groupImageUrl: groupImageUrl,
      createdBy: userId,
    };

    if (groupImageUrl) {
      data = { ...data, groupImageUrl: groupImageUrl };
    }

    let newGroup = new Group(data);

    newGroup.save().then((saveGroup) => {
      saveGroup.users.push(userId);
      saveGroup.save().then((saveUserInGroup) => {
        userFound?.groups.push(saveUserInGroup._id);
        userFound?.save();
        return res.status(200).json({
          success: true,
          message: name + " group created successfully!",
          group: saveUserInGroup,
        });
      });
    });
  }
};

exports.fetchGroup = async (req, res, next) => {
  const _id = req.query._id;
  const result = await GroupChat.findOne({ _id: _id }).populate({
    path: "messages",
    populate: { path: "users" },
  });

  let messages = result.messages.map((message) => ({
    _id: message._id,
    username: message.user.userName,
    message: message.message,
    profileImageUrl: message.user.profileImageUrl,
    isOpenAIMsg: message.isOpenAIMsg,
    messageType: message.messageType,
    url: message.url,
    size: message.size,
    createdAt: message.createdAt,
  }));

  if (result) {
    return res.status(200).json({ success: true, messages: messages });
  } else {
    return res.status(200).json({ success: false, message: [] });
  }
};

exports.joinGroup = async (req, res, next) => {
  const _id = req.body.groupId;
  const userId = mongoose.Types.ObjectId(req.body.userId);

  const groupFound = await Group.findOne({ _id: _id }).populate();
  const userFound = await User.findOne({ _id: userId });

  let userInGroupFound;

  if (groupFound) {
    for (const userInGroup of groupFound.users) {
      userInGroupFound = userInGroup.toString() === userId.toString();
    }

    if (userInGroupFound) {
      return res
        .status(202)
        .json({ success: false, message: "User already joined this group!" });
    } else {
      groupFound?.users.push(userId);
      userFound?.groups.push(groupFound._id);
      await groupFound?.save();
      await userFound?.save();
      return res.status(202).json({
        success: true,
        message: "Group join successfully!",
        groupData: groupFound,
      });
    }
  } else {
    return res.status(404).json({ success: true, message: "Group Not found!" });
  }
};

exports.sendGroupMessage = (req, res) => {
  console.log(req.body.data)
  let message, isOpenAIMsg, type, url, size, chatId, userId;

  chatId = mongoose.Types.ObjectId(req.body.chatId);

  // Message Data
  message = req.body.data.message;
  isOpenAIMsg = req.body.data.isOpenAIMsg;
  url = req.body.data.url ? req.body.data.url : "";
  size = req.body.data.size ? req.body.data.size : 0;
  type = req.body.data.type;
  userId = mongoose.Types.ObjectId(req.body.data.userId);

  const invalidInput = validationResult(req);

  if (!invalidInput.isEmpty()) {
    return res.status(422).json({ invalidInput: invalidInput });
  } else {
    Group.findOne({ _id: chatId })
      .then((group) => {
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
          .then(res => res.populate('user').execPopulate())
          .then((data) => {
            group?.messages.push(data._id);
            group.save().then(() => {
              console.log('data', data)
              return res.status(200).json({
                success: true,
                message: "message send successfully!",
                data: data,
              });
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
