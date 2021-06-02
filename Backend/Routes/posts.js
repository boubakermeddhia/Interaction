const express=require('express')
const router=express.Router()
const Post = require('../Models/posts')
const Auth =require('../middleware/auth.js')


router.route('/getposts').get(async(req,res)=>{
    
    try {
        await Post.find()
        .then(s=>res.status(200).json(s))
    } catch (error) {
        res.status(400).json({error})
    }
    
})
router.route('/createdpost').post(async (req,res,Auth)=>{
    const post=req.body
    const newpost=new Post(post)
    try {
      await  newpost.save()
        res.status(200).json(newpost)
    } catch (error) {
        res.status(400).json({error})
    }
})
router.route('/update/:id').put(async (req,res,Auth)=>{
    const post=req.body
    await Post.findByIdAndUpdate(req.params.id,post,{new:true})
    .then(exercice=>res.json(exercice))
    .catch(err=>res.status(400).json('ERROR: ' + err))
})

router.route('/delete/:id').delete(async (req,res,Auth)=>{
    try {
       const data= await Post.findByIdAndDelete(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(err)
    }
    
    
})
router.route('/likepost/:id').put(async (req,res,Auth)=>{
    const post=req.body
    let like=await Post.findById(req.params.id)

    const index=like.likecount.findIndex((id)=>id===String(post.userid))
    if (index===-1) {
        like.likecount.push(post.userid)
    }else{
        like.likecount=like.likecount.filter((id)=>id!=String(post.userid))
    }
    await Post.findByIdAndUpdate(req.params.id,like,{new:true})
    .then(exercice=>res.json(exercice))
    .catch(err=>res.status(400).json('ERROR: ' + err))
})


module.exports=router