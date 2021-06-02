import React from 'react'
import usesStyles from'./style'
import {Card ,CardActions , CardContent, CardMedia,Button,Typography} from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import {Consumer} from '../../context'
import CommentIcon from '@material-ui/icons/Comment';
import Comment from '../comment/comment'

export default function Posts({post}) {
    const classes=usesStyles()
    const user=JSON.parse(localStorage.getItem('profile'))
    return (
    <Consumer>
        {value=>{
                const {showupdate,comment,likepost,deletepost}=value
                const existinglike=post.likecount.filter(res=>res==(user?._id||user?.googleId)).length
                const ex=post.likecount.filter(res=>res!=(String(user?._id||user?.googleId))).length
                
            return(
               
                <div className="col-6">
                    
                <Card className={classes.card}>
                <CardMedia className ={classes.media} image={post.selectedfile}
                title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant='h6'>{post.name}</Typography>
                    <Typography variant='body2'>{moment(post.createdat).fromNow()}</Typography>
                </div>
                <div className={classes.overlay2}>
                {(user?.googleId==post?.creator || user?._id==post?.creator) && (
                        <Button  style={{color:'white'}} size="small" onClick={(e)=>showupdate(e,post._id)}>
                        <MoreHorizIcon fontSize="default"/>
                    </Button>
                    )}
                </div>
                <CardContent>
                <Typography className={classes.title} gutterBottom variant='h8'>{post.tags.map(res=>"#"+res)}</Typography>
                </CardContent>
                <CardContent>
                <Typography className={classes.title} gutterBottom variant='h8'>{post.title}</Typography>
                </CardContent>
                <CardContent>
                <Typography className={classes.title} gutterBottom variant='h9'>{post.message}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                <Button  color='primary' size="small" disabled={!user?.name} onClick={(e)=>{likepost(e,post._id)}}>
                        <ThumbUpAltIcon fontSize="small"/>
                        {existinglike!=0 ? (ex !=0 ? ("You like And "+ex) :"You like ") : ex +" Like"}
                    </Button>
                    <Button onClick={(e)=>comment(e,post._id)} color='primary' size="small" data-toggle="modal" data-target="#exampleModalLong" disabled={!user?.name}>
                        <CommentIcon fontSize="small"/>
                        Comment
                    </Button>
                    <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                        <Comment/>
                    </div>
                    {(user?.googleId==post?.creator || user?._id==post?.creator) && (
                    (<Button color='primary' size="small" disabled={!user?.name} onClick={(e)=>deletepost(e,post._id)}>
                        <DeleteIcon fontSize="small"/>
                            Delete
                    </Button>)
                    )}
                    
                </CardActions>
            </Card>
           
              </div>
              
           )}
           }
    </Consumer>
    )
}


