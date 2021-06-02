import React from 'react'
import {Consumer} from '../../context'
import Comments from './comments'
import {CircularProgress } from '@material-ui/core'
export default function Comment() {

    return (
        <Consumer>
   { value=>{
        const {handlechange,loadingcmnt,postcomment,getcomment}=value
        return(
            <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Comment</h5>
                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                     <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
            <div className="modal-body">
               <div className="panel-body">
                    <ul className="chat">
                     {loadingcmnt?<div className="container"><CircularProgress/></div>:""}
                     { getcomment.map((res)=>{
                        return (<Comments key={res._id} comment={res} />)
                     })
                     }
                    </ul>
                </div>
            </div>
            <form autoComplete="off" noValidate>
            <div className="modal-footer">
                    <input id="btn-input" name="comment" type="text" onChange={handlechange} className="form-control input-sm" placeholder="Type your Comment here..." />
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" onClick={(e)=>postcomment(e)} className="btn btn-warning">Comment</button>
             </div>
            </form>
                </div>
                    </div>
        )
    }}
</Consumer>
    )
}

