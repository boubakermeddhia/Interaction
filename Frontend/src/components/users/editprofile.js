import React from 'react'
import {Link} from 'react-router-dom'
import {Consumer} from '../../context'
import {useHistory} from 'react-router-dom'
export default function Editprofile() {
    const  history=useHistory()
    return (
        <Consumer>
            {value=>{
                const {firstname,issignin,imgsrc,handlefile,handlechange,lastname,email,editprofile}=value
                {if (!issignin) {
                    history.push('/')
                }else{
                return(
                    <div className="container rounded bg-white mt-5">
                    <div className="row">
                        <div className="col-md-4 border-right">
                            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src={!imgsrc?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png":imgsrc} width="90"/><span className="font-weight-bold">{firstname} {lastname}</span><span className="text-black-50">{email}</span></div>
                        </div>
                        <div className="col-md-8">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1"></i>
                                        <Link to="/">Back to home</Link>
                                    </div>
                                    <h6 className="text-right">Edit Profile</h6>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><input onChange={handlechange} name="firstname" type="text" className="form-control" placeholder={firstname}/></div>
                                    <div className="col-md-6"><input onChange={handlechange} name="lastname"  type="text" className="form-control"  placeholder={lastname}/></div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6"><input disabled onChange={handlechange} name="email" type="text" className="form-control" placeholder={email}/></div>
                                    
                                    <div className="col-md-6"><input onChange={handlechange} name="password" type="text" className="form-control" placeholder="Password"/></div>
                                </div>
                                <div className="row mt-3">
        
                                    <div className="col-md-6">
                                        <input type="file" multiple={false} onChange={handlefile}/>
                                    </div>
                                </div>
                                <div className="mt-5 text-right"><button className="btn btn-primary profile-button" onClick={editprofile} type="button">Edit Profile</button></div>
                                       </div>
                                  </div>
                              </div>
                     </div>
                )
            }
           
        }
    }
}
            </Consumer>
    )
}
