import React from 'react'
import moment from 'moment'
export default function Comments({comment}) {
    return (
                                        <li className="left clearfix">
                                        <span className="chat-img pull-left">
                                        <img style={{width:"50px","border-radius":"20px"}} src={comment.user.imageUrl?comment.user.imageUrl:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="User Avatar" className="img-circle" />
                                         </span>
                                        <div className="chat-body clearfix">
                                            <div className="header">
                                                <strong className="primary-font">{comment.user.name}</strong> <small className="pull-right text-muted">
                                                    <span className="glyphicon glyphicon-time"></span>{moment(comment.datecomment).fromNow()}</small>
                                            </div>
                                            <p>
                                             {comment.comment}
                                            </p>
                                        </div>
                                    </li>
        
    )
}

