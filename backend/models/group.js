const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const roomSchema =  new Schema({
    groupName: {
        type: String,
        required:false
    },
    groupImageUrl:{
      type:String,
      required:false,
      default:"https://i.imgur.com/nHlY97n.png"
    },
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref:'Message',
            required: false
        }
    ],
    user : [{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: false
    }],
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})


module.exports = mongoose.model('Room',roomSchema)
