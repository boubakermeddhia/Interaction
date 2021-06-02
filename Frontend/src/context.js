import React, { Component } from 'react'
import axios from 'axios'


const provider=React.createContext()


export default class Context extends Component {
state={
            posts:[],
            loading:true,
            creator:'',
            title:'',
            message:'',
            tags:'',
            selectedfile:null,
            clickedpost:false,
            idmodi:null,
            idpag:0,
            issignin:false,
            showpassword:false,
            firstname:'',
            lastname:'',
            email:'',
            password:'',
            confirmpassword:'',
            signup:false,
            imgsrc:'',
            name:'',
            comment:'',
            idcomment:'',
            getcomment:[],
            loadingcmnt:true

}

collect= async ()=>{

     const API=axios.create({baseURL:'http://localhost:8080/'})
     API.interceptors.request.use((req)=>{
         if(localStorage.getItem('profile')){
             req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
         }
         return req
     })
   await API.get('http://localhost:8080/posts/getposts')
    .then(res=>{
        this.setState({
            posts:res.data,
            loading:false
        })
       })
    .catch(err=>console.log(err))

   
    
}

componentDidMount=()=>{
this.collect()
const x=localStorage.getItem('profile')
if (x!=null ){
    this.setState({
        issignin:true,
        imgsrc:JSON.parse(x).imageUrl,
        name:JSON.parse(x).name,
        lastname:JSON.parse(x).name.split(" ")[0],
        firstname:JSON.parse(x).name.split(" ")[1],
        email:JSON.parse(x).email
    })
}

}

convertobas64=(file)=>{

        return (
            new Promise(function (resolve, reject) {
             let reader = new FileReader();
             reader.onload = function () { resolve(reader.result); };
             reader.onerror = function (error) { reject(error); };
             reader.readAsDataURL(file);
             
         }))
}

handlefile= async (e)=>{
    const file=e.target.files[0]
    const base64= await this.convertobas64(file)
    this.setState({
        selectedfile:base64
       })
}

showupdate=(e,id)=>{
    e.preventDefault()
    const post=this.state.posts.filter((res)=>res._id==id)[0]
    this.setState({
        creator:post.creator,
        title:post.title,
        message:post.message,
        tags:post.tags,
        clickedpost:!this.state.clickedpost,
        idmodi:id,
        selectedfile:post.selectedfile
    })

}

updatepost=async(e,x)=>{
    e.preventDefault()
    const res={
        creator:this.state.creator,
        title:this.state.title,
        message:this.state.message,
        tags:this.state.tags,
        selectedfile:this.state.selectedfile
    }
    const API=axios.create({baseURL:'http://localhost:8080/'})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
   await axios.put('http://localhost:8080/posts/update/'+x,{...res,name:JSON.parse(localStorage.getItem('profile')).name})
    .then(()=>{
            this.setState({
                        clickedpost:false
            },()=>this.collect())
    })

}

handlechange=(e)=>{
         e.preventDefault()
        const name =e.target.name
        const value=e.target.value
        this.setState({
         [name]:value
        })
}

handlesubmitpost=async(e,x)=>{
  e.preventDefault()
   const user=JSON.parse(localStorage.getItem('profile'))
    const res={
        creator:(user?._id || user?.googleId),
        title:this.state.title,
        message:this.state.message,
        tags:[this.state.tags],
        selectedfile:this.state.selectedfile
    }
    const API=axios.create({baseURL:'http://localhost:8080/'})
    API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${user.token}`
    }
    return req
})

    await API.post('http://localhost:8080/posts/createdpost',{...res,name:user.name})
    .then(setTimeout(() => {this.collect()
    },1500))
    .catch(console.log('error'))
   
} 

clear=(e)=>{
       e.preventDefault()
       this.setState({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedfile:'',
       })
}

deletepost=async(e,id)=>{
    e.preventDefault()
    const API=axios.create({baseURL:'http://localhost:8080/'})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
    await axios.delete('http://localhost:8080/posts/delete/'+id)
    .then(setTimeout(() => {this.collect()
    },1500))
    .then(err=>console.log(err))
    if (this.state.posts.length) {
        this.setState({
            idpag:0
        })
    }
}

likepost=async(e,id)=>{
    e.preventDefault()
    const client=JSON.parse(localStorage.getItem('profile'))
    const user={
            userid: client?._id || client?.googleId
    }
    const API=axios.create({baseURL:'http://localhost:8080/'})
    API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
    await API.put('http://localhost:8080/posts/likepost/'+id,user)
    .then(setTimeout(() => {this.collect()
    },1500))
}

googlefailure=()=>{
    console.log('try again later')
}

googlesuccess=async(res)=>{
    const result=res?.profileObj
    const token=res?.tokenId
    try {
     await localStorage.setItem('profile',JSON.stringify({...result,token}))
      this.setState({
        issignin:true,
        name:JSON.parse(localStorage.getItem('profile')).name,
        imgsrc:JSON.parse(localStorage.getItem('profile')).imageUrl
    })
    } catch (error) {
        console.log(error)
    }

}

setshowpassword=()=>{
    this.setState({
        showpassword:!this.state.showpassword
    })
}

switchmode=()=>{
    this.setState({
        signup:!this.state.signup,

    })
}

handlesubmit=async (e)=>{
e.preventDefault()
const {email,password,firstname,lastname,confirmpassword}=this.state
if(this.state.signup){
    const API=axios.create({baseURL:'http://localhost:8080'})
        API.interceptors.request.use((req)=>{
            if(localStorage.getItem('profile')){
                req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
            }
            return req
        })
    await API.post('/users/signup',{email,password,firstname,lastname,confirmpassword})
    window.location='/auth'
}else{
    const API=axios.create({baseURL:'http://localhost:8080'})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
    await API.post('/users/signin',{email,password})
    .then(res=>{
        let result=res.data.result
        let token=res.data.token
        localStorage.setItem('profile',JSON.stringify({...result,token}))
        this.setState({
            issignin:true,
            name:result.name,
            imgsrc:result.imageUrl,
            name:result.name,
            lastname:result.name.split(" ")[0],
            firstname:result.name.split(" ")[1],
            email:result.email
         })
    })
}
}

logout=()=>{
    localStorage.clear()
    this.setState({
        issignin:false
    })
}

editprofile=async(e)=>{
    e.preventDefault()
    const id=JSON.parse(localStorage.getItem('profile'))._id
    const token=JSON.parse(localStorage.getItem('profile')).token
    const res={
        firstname:this.state.firstname,
        lastname:this.state.lastname,
        password:this.state.password,
        imageUrl:this.state.selectedfile
    }
    const API=axios.create({baseURL:'http://localhost:8080/'})
    API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
   localStorage.clear()
   await axios.put('http://localhost:8080/users/update/'+id,res)
    .then((res)=>{
            localStorage.setItem('profile',JSON.stringify({...res.data.result,token}))
            this.setState({
                firstname:res.data.firstname,
                lastname:res.data.lastname,
                email:res.data.email,
                imgsrc:res.data.selectedfile
            })
            window.location='/'
        })

}

comment=(e,id)=>{
    e.preventDefault()
    this.setState({
        getcomment:[],
        idcomment:id,
        loadingcmnt:true
    },()=>this.showcomment())
}

showcomment=async()=>{
    const API=axios.create({baseURL:'http://localhost:8080/'})
    API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})
    await API.get('http://localhost:8080/comment/getcomment/'+this.state.idcomment)
    .then(res=>this.setState({
        getcomment:res.data,
        loadingcmnt:false
    }))
   

}

postcomment=async(e)=>{
    e.preventDefault()
    const user=JSON.parse(localStorage.getItem('profile'))
    const res={
        comment:this.state.comment,
        idphoto:this.state.idcomment,
        datecomment:new Date(),
        iduser:user?.googleId||user?._id

    }
    const API=axios.create({baseURL:'http://localhost:8080/'})
    API.interceptors.request.use((req)=>{
        if(localStorage.getItem('profile')){
            req.headers.authorization=`Bearer ${user.token}`
        }
        return req
    })
        await API.post('http://localhost:8080/comment/postcomment',res)
        .then( this.setState({
            loadingcmnt:true,
            comment:""
        }),setTimeout(() => {
            this.showcomment()
        },1500))
       
}

render() {
        return (
            <provider.Provider value={{...this.state,clear:this.clear,handlechange:this.handlechange
            ,handlesubmitpost:this.handlesubmitpost,handlefile:this.handlefile,
            precpage:this.precpage,postcomment:this.postcomment,editprofile:this.editprofile,comment:this.comment,logout:this.logout,handlesubmit:this.handlesubmit,googlesuccess:this.googlesuccess,switchmode:this.switchmode,setshowpassword:this.setshowpassword,googlefailure:this.googlefailure,updatepost:this.updatepost,deletepost:this.deletepost,nextpage:this.nextpage,showupdate:this.showupdate,likepost:this.likepost}}>
                {this.props.children}
            </provider.Provider>
        )
}

}



const Consumer=provider.Consumer
export {Context,Consumer}