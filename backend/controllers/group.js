const mongoose = require("mongoose");
const User = require("../models/user");
const Group = require("../models/group");
const Message = require("../models/message");
const { validationResult } = require("express-validator");
const group = require("../models/group");


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
      saveGroup.save().then((data) => {
        userFound?.groups.push(data._id);
        userFound?.save();
        return res.status(200).json({
          success: true,
          message: name + " group created successfully!",
          data: data,
        });
      });
    });
  }
};


exports.joinGroup = async (req, res, next) => {
  const _id = req.body.groupId;
  const userId = mongoose.Types.ObjectId(req.body.userId);

  const MAX_USER_IN_GROUP = 20;

  const groupFound = await Group.findOne({ _id: _id }).populate();
  const userFound = await User.findOne({ _id: userId });

  let userInGroupFound;

  if (groupFound) {

    if(groupFound.users.length >= MAX_USER_IN_GROUP) {
      return res
      .status(202)
      .json({ success: false, message: "Max number of user already joined this group" });
    }

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
