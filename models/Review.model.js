const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true,
    },
    comments:{
        type:String,
    }
})

module.exports=mongoose.model('Review',reviewSchema);