const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    privateUser: [{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }],
    joinRoom:[{
        type: Schema.Types.ObjectId,
        ref:'Room',
        required: true
    }],
    password: {
      type:String,
      required: true
    },
    messages:[{
        type: Schema.Types.ObjectId,
        ref:'Message',
        required: true
    }],
    profileImageUrl: {
        type: String,
        required:false,
        default:"https://i.imgur.com/9btv3K6.png"
    },
    Status:{
        type:String,
        required:false,
        default:'Hey there! I am using ChatApp'
    }
})


module.exports = mongoose.model('User', userSchema)
