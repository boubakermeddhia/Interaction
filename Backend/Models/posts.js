const mongoose=require('mongoose')

const Schema=mongoose.Schema

const postschema=new Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedfile:String,
    likecount:{
        type:[String],
        default:[]
    },
    createdat:{
        type:Date,
        default:new Date()
    }
})

const Post=mongoose.model('post',postschema)

module.exports= Post