const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
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
    },
},{timestamps:true})


module.exports = mongoose.model('Message', messageSchema)
