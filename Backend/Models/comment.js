const mongoose=require('mongoose')

const Schema=mongoose.Schema
const commentschema= new Schema({
    idphoto:String,
    comment:String,
    iduser:String,
    datecomment:{
        type:Date,
        default:new Date()
    },

})

const Comment=mongoose.model('comment',commentschema)

module.exports=Comment