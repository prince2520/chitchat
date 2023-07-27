const User = require('../models/user')
const PrivateChat = require('../models/private');
const Message = require('../models/message');
const mongoose = require('mongoose')

exports.addPrivateUser = async (req, res, next) => {
    const senderId = mongoose.Types.ObjectId(req.body.senderId);
    const receiverId = mongoose.Types.ObjectId(req.body.receiverId);

    const privateUser = await PrivateChat.findOne({user: {$all: [senderId, receiverId]}});

    const findSender = await User.findOne({_id: senderId});
    const findReceiver = await User.findOne({_id: receiverId});

    if (privateUser) {
        return res.status(200).json({success: false, message: 'Private user already added!'});
    } else {
        const newPrivateChat = new PrivateChat();

        findReceiver?.privateUser.push(senderId);
        findSender?.privateUser.push(receiverId);

        await findSender.save();
        await findReceiver.save();

        newPrivateChat?.save().then(result => {
            result?.user.push(senderId);
            result?.user.push(receiverId);
            result.save()
                .then(done => {
                        return res.status(202).json({success: true, message: 'User added to Private Chat!'});
                    }
                ).catch(() => {
                return res.status(404).json({success: false, message: 'Something goes wrong!'});
            });
        });
    }
};

exports.fetchPrivateUser = async (req, res, next) => {
    const userId = mongoose.Types.ObjectId(req.query.userId);

    const privateUserFound = await PrivateChat.find({user: {$in: [userId]}}).populate('user');

    if (privateUserFound) {
        return res.status(200).json({
            success: true,
            message: 'Private User fetched successfully!',
            privateUser: privateUserFound
        });
    } else {
        return res.status(200).json({
            success: false,
            message: 'Something goes wrong!'
        });
    }
}


exports.createPersonalMessage = async (req, res, next) => {
    const senderId = mongoose.Types.ObjectId(req.body.senderId);
    const receiverId = mongoose.Types.ObjectId(req.body.receiverId);
    const message = req.body.message;
    const isOpenAIMsg = req.body.isOpenAIMsg;
    const messageType = req.body.messageType;
    const url = req.body.url ? req.body.url : '';
    const size = req.body.size ? req.body.size : 0;

    const privateUser = await PrivateChat.findOne({user: {$all: [senderId, receiverId]}});

    if (privateUser) {
        const newMessage = new Message({
            message: message,
            user: senderId,
            isOpenAIMsg: isOpenAIMsg,
            messageType: messageType,
            url: url,
            size: size
        });

        newMessage.save().then(done => {
            privateUser?.privateMessages.push(done._id);
            privateUser?.save().then(() => {
                return res.status(200).json({success: true, message: 'Message saved Successfully!'})
            }).catch(() => {
                return res.status(404).json({success: true, message: 'Something goes wrong!'})
            });
        })
    }
}

exports.fetchPrivateMessage = async (req, res, next) => {
    const senderId = mongoose.Types.ObjectId(req.query.senderId);
    const receiverId = mongoose.Types.ObjectId(req.query.receiverId);

    PrivateChat.findOne({user: {$all: [senderId, receiverId]}}).populate({
        path: 'privateMessages',
        populate: {path: 'user'}
    }).then(privateChat => {
        let messages = privateChat?.privateMessages.map(message =>({
            messageId: message._id,
            username: message.user.userName,
            message: message.message,
            profileImageUrl: message.user.profileImageUrl,
            isOpenAIMsg: message.isOpenAIMsg,
            messageType: message.messageType,
            url: message.url,
            size: message.size
        }));

        return res.status(200).json({
            success: true,
            messages: messages
        })
    }).catch(() => res.status(404).json({
        success: false,
        message: 'Something goes wrong!'
    }));
}
