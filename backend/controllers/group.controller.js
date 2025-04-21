const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

const User = require("../models/user.model");
const Group = require("../models/group.model");
const Message = require("../models/message.model");

exports.createGroup = async (req, res, next) => {
  const name = req.body.name;
  const status = req.body.status;

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
      status: status,
      createdBy: userId,
      users: [userId],
    };

    const newGroup = new Group(data);

    const saveGroup = await newGroup.save();

    if (!saveGroup) {
      let error = new Error("New group not created!");
      error.statusCode = StatusCodes.NOT_IMPLEMENTED;
      throw error;
    }

    userFound?.groups.push(saveGroup._id);

    const groupSaveInUser = await userFound.save();

    if (!groupSaveInUser) {
      let error = new Error("Group not saved in user.");
      error.statusCode = StatusCodes.NOT_IMPLEMENTED;
      throw error;
    }

    const group = await Group.findOne({ _id: saveGroup._id })
    .populate([
      { path: "messages", populate: "user" },
      { path: "blockList", populate: "user" },
      "users"
    ]);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Group created successfully.",
      data: group,
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
      { path: "blockList", populate: "user" },
      { path: "messages", populate: "user" }
    ])

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
      userInGroupFound = userInGroup._id.toString() === userId.toString();
    }

    if (userInGroupFound) {
      let error = new Error("User already joined this group!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    groupFound?.users.push(userId);
    userFound?.groups.push(groupFound._id);

    const saveGroup = await groupFound.save();
    if (!saveGroup) {
      let error = new Error("Group not added to users!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const saveUser = await userFound.save();
    if (!saveUser) {
      let error = new Error("User not added to group!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    };

    const group = await Group.findOne({ _id: groupFound._id })
    .populate([
      { path: "messages", populate: "user" },
      { path: "blockList", populate: "user" },
      "users"
    ]);
    

    return res.status(202).json({
      success: true,
      message: `"${groupFound.name}" joined successfully!`,
      groupData: group
    });
  } catch (err) {
    next(err);
  }
};

exports.saveGroupMessage = async (req, res, next) => {
  let message, isOpenAIMsg, type, url, size, chatId, userId;

  chatId = mongoose.Types.ObjectId(req.body.chatId);

  message = req.body.data.message ?? "";
  isOpenAIMsg = req.body.data.isOpenAIMsg;
  url = req.body.data.url ?? "";
  size = req.body.data.size ?? 0;
  type = req.body.data.type;
  userId = mongoose.Types.ObjectId(req.userId);

  try {
    const groupFound = await Group.findOne({ _id: chatId });

    if (!groupFound) {
      let error = new Error("Group not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    if (!groupFound.users.includes(userId)) {
      let error = new Error("You have'nt joined this group!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    if (groupFound.blockList.includes(userId)) {
      let error = new Error("You are blocked from these group.");
      error.statusCode = StatusCodes.UNAUTHORIZED;
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
      let error = new Error("Message not created!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    const poulateUserSaveNewMsg = await saveNewMessage
      .populate("user")
      .execPopulate();

    groupFound?.messages.push(poulateUserSaveNewMsg._id);

    const saveGroup = await groupFound.save();

    if (!saveGroup) {
      let error = new Error("Message not added to group!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Message send successfully!",
      data: poulateUserSaveNewMsg,
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


    if (groupFound.createdBy.toString() != adminId.toString()) {
      let error = new Error("You are not admin of this group!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    if (groupFound.blockList.includes(blockUserId)) {
      let error = new Error("You already block this user!");
      error.statusCode = StatusCodes.CONFLICT;
      throw error;
    }

    groupFound.blockList.push(blockUserId);
    await groupFound.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `User blocked successfully!`,
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

    if (groupFound.createdBy.toString() !== adminId.toString()) {
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

    await Message.deleteMany({ _id: groupFound.messages });
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
  const adminUserId = mongoose.Types.ObjectId(req.userId);

  const groupId = mongoose.Types.ObjectId(req.body.groupId);

  try {
    const groupFound = await Group.findOne({ _id: groupId });

    if (!groupFound) {
      let error = new Error("User not found!");
      error.statusCode = StatusCodes.NOT_FOUND;
      throw error;
    }

    if (groupFound.createdBy.toString() != adminUserId.toString()) {
      let error = new Error("You are not authorized to edit this group!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    groupFound.name = name;
    groupFound.status = status;

    if (highResUrl && lowResUrl) {
      groupFound.highResUrl = highResUrl;
      groupFound.lowResUrl = lowResUrl;
    }

    const saveGroup = await groupFound.save();

    if (!saveGroup) {
      let error = new Error("Group not edited successfully!");
      error.statusCode = StatusCodes.UNAUTHORIZED;
      throw error;
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Group edited successfully!",
    });
  } catch (err) {
    next(err);
  }
};
