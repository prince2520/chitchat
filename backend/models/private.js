const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const private = new Schema({
    privateMessages: [
        {
            type: Schema.Types.ObjectId,
            ref:'Message',
            required: true
        }
    ],
    user : [{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    }],
})


module.exports = mongoose.model('PrivateChat', private)
