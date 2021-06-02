const express=require('express')
const router=express.Router()
const Auth =require('../middleware/auth.js')
const Comment = require('../Models/comment')
const User=require('../Models/users')

getuser=async(id)=>{
    return await User.findById(id)
}

router.route('/getcomment/:id').get(async(req,res)=>{
    
    try {
        var l=[]
        const result=await Comment.find({idphoto:req.params.id})
        for(let i=0;i<result.length;i++){
            try{
                var user=await getuser(result[i].iduser)
            }catch (error) {
                res.status(400).json({error})
            }
            l.push({idphoto:result[i].idphoto,comment:result[i].comment,datecomment:result[i].datecomment,user:user})
        }
        res.status(200).json(l)
       
    } catch (error) {
        res.status(400).json("cannot find")
    }
    
})

router.route('/postcomment').post(async(req,res)=>{

    try {
        const newcomment = new Comment(req.body)
        await newcomment.save()
        res.status(200).json(newcomment)
    } catch (error) {
        res.status(400).json({error})
    }
})



module.exports=router