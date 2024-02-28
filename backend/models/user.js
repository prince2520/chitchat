const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password: {
        type:String,
        required: true
      },
    status:{
        type:String,
        required:false,
        default:'Hey there! I am using ChatApp'
    },
    profileImageUrl: {
        type: String,
        required:false,
        default:"https://i.imgur.com/9btv3K6.png"
    },
    groups:[{
        type: Schema.Types.ObjectId,
        ref:'Group',
        required: true
    }], 
    privates: [{
        type: Schema.Types.ObjectId,
        ref:'Private',
        required: true
    }]   
});


module.exports = mongoose.model('User', userSchema);
