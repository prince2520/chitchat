const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
        required: false
    },
    isOpenAIMsg: {
        type: Boolean,
        default: false,
        required: false
    },
    url:{
        type: String,
        required: false,
        default: ''
    },
    size:{
        type: Number,
        required: false,
        default: 0
    },
    messageType:{
        type: String,
        default: 'string',
        required: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: false
    },
    room: {
        type: Schema.Types.ObjectId,
        ref:'Room',
        required: false
    }
},{timestamps:true})


module.exports = mongoose.model('Message', messageSchema)
