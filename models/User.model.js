const { required } = require('joi');
const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true
    },
    role:{
        type:String,
        required:true,
        enum:['seller','buyer']
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);