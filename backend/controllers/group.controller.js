const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

// Import - Models
const User = require("../models/user.model");
const Group = require("../models/group.model");
const Message = require("../models/message.model");

// POST -> Create group
exports.createGroup = async (req, res, next) => {
  
  // Group -> data
  const name = req.body.name;
  const userId = mongoose.Types.ObjectId(req.userId);

  try {
    const userFound = await User.findOne({ _id: userId });

    if (!userFound) {
      let error = new Error("User not found.");
      error.statusCode = StatusCodes.BAD_REQUEST;
      throw error;
    }

    const data = {
      name: name,
      createdBy: userId,
    };

    const newGroup = new Group(data);

    newGroup
      .save()
      .then((saveGroup) => {
        saveGroup.users.push(userId);
        saveGroup
          .save()
          .then((data) => {
            userFound?.groups.push(data._id);
            userFound
              .save()
              .then(() => {
                return res.status(StatusCodes.OK).json({
                  success: true,
                  message: "Group created successfully.",
                  data: data,
                });
              })
              .catch(() => {
                let error = new Error("Group not saved in user.");
                error.statusCode = StatusCodes.NOT_IMPLEMENTED;
                throw error;
              });
          })
          .catch(() => {
            let error = new Error("User not added to group.");
            error.statusCode = StatusCodes.NOT_IMPLEMENTED;
            throw error;
          });
      })
      .catch(() => {
        let error = new Error("New group not created!");
        error.statusCode = StatusCodes.NOT_IMPLEMENTED;
        throw error;
      });
  } catch (err) {
    next(err);
  }
};

exports.joinGroup = async (req, res, next) => {
  const groupId = req.body.groupId;
  const userId = mongoose.Types.ObjectId(req.userId);

  try {
    const MAX_USER_IN_GROUP = 20;

    const groupFound = await Group.findOne({ _id: groupId }).populate([
      "users",
      "messages",
    ]);

    if (!groupFound) {
      let error = new Error("Group not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const userFound = await User.findOne({ _id: userId });

    if (!userFound) {
      let error = new Error("User does not exist!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    let userInGroupFound;

    if (groupFound.users.length >= MAX_USER_IN_GROUP) {
      let error = new Error("Max number of user already joined this group");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    for (const userInGroup of groupFound.users) {
      userInGroupFound = userInGroup.toString() === userId.toString();
    }

    if (userInGroupFound) {
      let error = new Error("User already joined this group!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    groupFound?.users.push(userId);
    userFound?.groups.push(groupFound._id);

    groupFound
      ?.save()
      .then(() => {
        userFound
          ?.save()
          .then(() => {
            return res.status(202).json({
              success: true,
              message: "Group join successfully!",
              groupData: groupFound,
            });
          })
          .catch(() => {
            let error = new Error("Group not added to users!");
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
          });
      })
      .catch(() => {
        let error = new Error("User not added to group!");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
      });
  } catch (err) {
    next(err);
  }
};

exports.saveGroupMessage = (req, res, next) => {
  let message, isOpenAIMsg, type, url, size, chatId, userId;

  chatId = mongoose.Types.ObjectId(req.body.chatId);

  // Message Data
  message = req.body.data.message ? req.body.data.message : "";
  isOpenAIMsg = req.body.data.isOpenAIMsg;
  url = req.body.data.url ? req.body.data.url : "";
  size = req.body.data.size ? req.body.data.size : 0;
  type = req.body.data.type;
  userId = mongoose.Types.ObjectId(req.userId);

  try {
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
          .then((res) => res.populate("user").execPopulate())
          .then((data) => {
            group?.messages.push(data._id);
            group.save().then(() => {
              return res.status(StatusCodes.OK).json({
                success: true,
                message: "Message send successfully!",
                data: data,
              });
            });
          })
          .catch(() => {
            let error = new Error("Message not created!");
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
          });
      })
      .catch(() => {
        let error = new Error("Group not found!");
        error.statusCode = StatusCodes.NOT_FOUND;
        throw error;
      });
  } catch (err) {
    next(err);
  }
};

exports.blockUser = async (req, res, next) => {
  const adminId = mongoose.Types.ObjectId(req.userId);

  let blockUserId, groupId;
  groupId = mongoose.Types.ObjectId(req.body.groupId);
  blockUserId = mongoose.Types.ObjectId(req.body.blockUserId);

  try {
    let groupFound = await Group.findOne({ _id: groupId });

    if (!groupFound) {
      let error = new Error("Group not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    if (groupFound.createdBy !== adminId) {
      let error = new Error("You are not admin of this group!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    groupFound.blockList.push(blockUserId);
    await groupFound.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User blocked successfully!",
    });
  } catch (err) {
    next(err);
  }
};

exports.unBlockUser = async (req, res, next) => {
  const adminId = mongoose.Types.ObjectId(req.userId);

  let unBlockUserId, groupId;

  groupId = mongoose.Types.ObjectId(req.body.groupId);
  unBlockUserId = mongoose.Types.ObjectId(req.body.blockUserId);

  try {
    let groupFound = await Group.findOne({ _id: groupId });

    if (!groupFound) {
      let error = new Error("Group not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    if (groupFound.createdBy !== adminId) {
      let error = new Error("You are not admin of this group!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    groupFound.blockList.pull(unBlockUserId);
    await groupFound.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User unblocked successfully!",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteGroup = async (req, res, next) => {

  const groupId = mongoose.Types.ObjectId(req.body.chatId);

  try {
    const groupFound = await Group.findOne({ _id: groupId });
    
    if (groupFound.createdBy != req.userId) {
      let error = new Error("You are not authorized to delete this group!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    if (!groupFound) {
      let error = new Error("Group not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const users = [...groupFound.users].map((user) =>
      mongoose.Types.ObjectId(user)
    );

    await Message.deleteMany({_id : groupFound.messages});
    await groupFound.remove();

    await User.updateMany(
      { _id: { $in: users } },
      { $pull: { groups: groupId } },
      { multi: true }
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Group Deleted!",
    });
    
  } catch (err) {
    next(err);
  }
};

// remove a user from the group
exports.leaveGroup = async (req, res, next) => {
  const userId = mongoose.Types.ObjectId(req.userId);
  const groupId = mongoose.Types.ObjectId(req.body.chatId);

  try {
    const groupFound = await Group.findOne({ _id: groupId });

    if (!groupFound) {
      let error = new Error("Group not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const userFound = await User.findOne({ _id: userId });

    if (!userFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    if (groupFound.users.includes(userId)) {
      groupFound.users.pull(userId);
      userFound.groups.pull(groupId);

      await groupFound.save();
      await userFound.save();

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "User left successfully!",
      });
    } else {
      let error = new Error("User not int his group!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

// Remove user from group
exports.removeUser = async (req, res, next) => {
  const adminId = mongoose.Types.ObjectId(req.userId);

  const groupId = mongoose.Types.ObjectId(req.body.groupId);
  const removeUserId = mongoose.Types.ObjectId(req.body.removeUserId);

  try {
    const groupFound = await Group.findOne({ _id: groupId });

    if (!groupFound) {
      let error = new Error("Group not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const removeUserFound = await User.findOne({ _id: removeUserId });

    if (!removeUserFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    groupFound.users.pull(removeUserId);
    removeUserFound.groups.pull(groupId);

    await removeUserFound.save();
    await groupFound.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User removed successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Edit a group
exports.editGroup = async (req, res, next) => {
  /// Group Data
  const name = req.body.name;
  const status = req.body.status;
  const lowResUrl = req.body.lowResUrl;
  const highResUrl = req.body.highResUrl;

  const groupId = mongoose.Types.ObjectId(req.body.groupId);

  try {
    const groupFound = await Group.findOne({ _id: groupId });

    if (!groupFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    groupFound.name = name;
    groupFound.status = status;

    if (highResUrl && lowResUrl) {
      groupFound.highResUrl = highResUrl;
      groupFound.lowResUrl = lowResUrl;
    }

    await groupFound.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Group edited successfully!",
    });

  } catch (err) {
    next(err);
  }
};
