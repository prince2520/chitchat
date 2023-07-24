const Room = require('../models/group');
const mongoose = require('mongoose');
const User = require('../models/user');
const {validationResult} = require("express-validator");

exports.createRoom = async (req, res, next) => {
    const groupName = req.body.groupName;
    const userId = mongoose.Types.ObjectId(req.body.userId);
    const groupImageUrl = req.body.groupImageUrl;

    const invalidInput = validationResult(req);

    if (!invalidInput.isEmpty()) {
        return res.status(422).json({success:false, message: invalidInput.errors[0].msg})
    } else {
        const roomFound = await Room.findOne({groupName: groupName})
        const userFound = await User.findOne({_id: userId})

        if (!roomFound) {
            let createGroup;

            if(groupImageUrl){
                createGroup = new Room({
                    groupName: groupName,
                    groupImageUrl: groupImageUrl,
                    createdBy: userId
                });
            }else {
                createGroup = new Room({
                    groupName: groupName,
                    createdBy: userId
                });
            }

            createGroup.save().then(saveGroup => {
                saveGroup.user.push(userId)
                saveGroup.save().then(userSaveInGroup => {
                    userFound?.joinRoom.push(userSaveInGroup._id);
                    userFound?.save();
                    return res.status(200).json({
                        success: true,
                        message: groupName + ' group created successfully!',
                        groupData: userSaveInGroup
                    })
                })
            });
        } else {
            let groupInUserFound;
            for (const groupInUser of userFound.joinRoom) {
                groupInUserFound = groupInUser.toString() === roomFound._id.toString();
            }
            if (groupInUserFound) {
                return res.status(200).json({success: false, message: 'User already join this group.'})
            } else {
                return res.status(200).json({success: false, message: 'Join this Group'});
            }
        }
    }
};

exports.fetchRoomMessages = async (req, res, next) => {
    const roomName = req.query.roomName
    const result = await Room.findOne({groupName: roomName}).populate({
        path: 'messages',
        populate: {path: 'user'}
    });

    let messages = result.messages.map(message =>({
        messageId: message._id,
        username: message.user.userName,
        message: message.message,
        profileImageUrl: message.user.profileImageUrl,
        isOpenAIMsg: message.isOpenAIMsg
    }));

    if (result) {
        return res.status(200).json({success:true, messages: messages})
    } else {
        return res.status(200).json({success:false, message: []})
    }
};

exports.fetchRoomNames = async (req, res, next) => {
    const userId = mongoose.Types.ObjectId(req.query.userId);

    const roomName = await User.findOne({_id: userId}).populate('joinRoom');

    if (roomName) {
        return res.status(200).json({success:true, joinGroup: roomName.joinRoom})
    } else {
        return res.status(200).json({success:false, message:'Room empty!' ,joinGroup: []})
    }
}


exports.joinGroup = async (req, res, next) => {
    const groupName = req.body.groupName;
    const userId = mongoose.Types.ObjectId(req.body.userId);

    const groupFound = await Room.findOne({groupName: groupName});
    const userFound = await User.findOne({_id: userId})

    let groupInUserFound;

    if (groupFound) {
        for (const userInGroup of groupFound.user) {
            groupInUserFound = userInGroup.toString() === userId.toString();
        }

        if (groupInUserFound) {
            return res.status(202).json({success:false, message: "User already joined this group!"})
        } else {
            groupFound?.user.push(userFound.id);
            userFound?.joinRoom.push(groupFound._id);
            await groupFound?.save();
            await userFound?.save();
            return res.status(202).json({success: true, message: 'Group join successfully!', groupData: groupFound});
        }

    } else {
        return res.status(404).json({success: true, message: 'Group Not found!'})
    }
}
