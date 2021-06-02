const jwt=require('jsonwebtoken')

const Auth=async(req,res,next)=>{

  try {
       const token=req.headers.authorization.split(" ")[1]
             const iscustomauth=token.length<500
             let decodedata
             if (token && iscustomauth){
                 decodedata=jwt.verify(token,'test')
                 req.userid=decodedata?.id
             }else{
                 decodedata=jwt.decode(token)
                 req.userid=decodedata?.sub
             }
             next()
         } catch (error) {
             console.log(error)
    }
}

module.exports=Auth