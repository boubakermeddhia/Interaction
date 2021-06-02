const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../Models/users')
const router=express.Router()

router.route('/signup').post(async(req,res)=>{
    const params=req.body
    try {
        const existinguser= await User.findOne({email:params.email})
        if (existinguser){
           return res.status(400).json({messsage:'Error Authientication User exist!!'})
        }
        if(params.password!=params.confirmpassword){
            return res.status(400).json({message:'Error Password is not same'})
        }
        const hashedpassword=await bcrypt.hash(params.password,12)
        const createuser=new User({email:params.email,imageUrl:params.imageUrl,password:hashedpassword,name:`${params.firstname} ${params.lastname}`})
              createuser.save()
        return  res.status(200).json({message:"User Successfully created"})

    } catch (error) {
        res.status(200).json(error)
    }
})

router.route('/signin').post(async(req,res)=>{
    const params=req.body
    try{
        const existinguser= await User.findOne({email:params.email})
    if (!existinguser){
       return res.status(400).json({message:'Error Authientication User not found'})
    }
    const passwordverifed=await bcrypt.compare(params.password,existinguser.password)
    if(!passwordverifed){
        return  res.status(400).json({message:'Error Authientication password is Invalid'})
    }
        const token=jwt.sign({email:existinguser.email,id:existinguser._id},'test',{expiresIn:'1h'})
        return res.status(200).json({result:existinguser,token})

    }catch(error){
        
        return  res.status(400).json({error})
        
    }

})
router.route('/update/:id').put(async(req,res)=>{
    const params=req.body
    const id=req.params.id
    try {
        const hashedpassword=await bcrypt.hash(params.password,12)
        const updateuser=await User.findByIdAndUpdate(id,{imageUrl:params.imageUrl,password:hashedpassword,name:`${params.firstname} ${params.lastname}`},{new:true})
        return  res.status(200).json({result:updateuser})
    } catch (error) {
        res.status(200).json(error)
    }
})



module.exports=router