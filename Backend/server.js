const express=require('express')
const bodyParser = require('body-parser')
const cors=require('cors')
const mongoose=require('mongoose')
const routeruser=require('./Routes/users')
const routerpost=require('./Routes/posts')
const routercomment=require('./Routes/comment')

const app=express()

app.use(bodyParser.json({limit:"30mb",extend:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/users',routeruser)
app.use('/posts',routerpost)
app.use('/comment',routercomment)

const uri="mongodb+srv://dhia:dhia@cluster0.nkcjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
const connection=mongoose.connection
connection.once('open',()=>{
    console.log("mongo db connection established successfully")
})
mongoose.set('useFindAndModify',false)
var port = process.env.PORT || 8080;
app.listen(port,()=>console.log("Server is Running"))