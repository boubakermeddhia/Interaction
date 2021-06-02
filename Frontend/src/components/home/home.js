import React, { Component } from 'react'
import Posts from '../posts/posts'
import {Consumer} from '../../context'
import Form from '../form/form'
import {CircularProgress } from '@material-ui/core'
export class Home extends Component {
    

    render() {
        return (
            <Consumer>
                {value=>{
                    const {posts,issignin,loading}=value
                    {
                        if (loading){
                            return  <div className="container"><CircularProgress/></div>
                        }else{
                            return (
                                
                                <div className={!issignin?"container":""}>
                                    
                                        <div className={issignin? "row": ""}>
                                     
                                                <div className={issignin? "col-sm": ""}>
                                                    <br/><br/><br/><br/>
                                                    <div className="row">
                                                    <br/>
                                                    {posts.map((res)=>{
                                                    return (                
                                                    <Posts key={res._id} post={res}/>
                                                    )
                                                    })}
                                                    </div>  
                                                </div>
                                                
                                                <div className={issignin?"col-4":""}>
                                                    <br/><br/><br/><br/>
                                                        <Form/>
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
}

export default Home
