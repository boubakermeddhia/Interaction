import React from 'react'
import usesStyles from'./style'
import { TextField,Button,Typography ,Paper } from '@material-ui/core'
import {Consumer} from '../../context'

export default function Form() {
const  classes=usesStyles()
        return (
            <Consumer>
                {value=>{
                    const {issignin,title,idmodi,clickedpost,message,tags,updatepost,handlechange,handlesubmitpost,handlefile,clear}=value;
                    if (issignin) {
                    return(
                    <Paper className={classes.paper}>
                    <form autoComplete="off" noValidate className={ `${classes.form} ${classes.form}` }>
                         <Typography variant="h6"> {clickedpost? `${'Updating Memory'}` :`${'Creating Memory'}`}</Typography>
                          <TextField name="title" 
                         variant="outlined" label='title' fullWidth value={title} 
                         onChange={handlechange} 
                          /><br/>
                          <TextField name="message" 
                         variant="outlined" label='message' fullWidth value={message} 
                         onChange={handlechange} 
                          /><br/>
                          <TextField name="tags" 
                         variant="outlined" label='tags' fullWidth value={tags} 
                         onChange={handlechange} 
                          /><br/>
                        <div className={classes.fileTextField}>
                        <input type="file" multiple={false} onChange={handlefile}/>
                        <br/>
                         <Button className={classes.buttonSubmit} variant="contained"
                        color="primary" size="large" value={idmodi} onClick={clickedpost? (e)=>updatepost(e,idmodi) : handlesubmitpost} type="submit" fullWidth>
                            {clickedpost? `${'Update'}` :`${'submit'}`}</Button><br/>
                        <Button  variant="contained"
                        color="secondary" size="small" onClick={clear} type="submit" fullWidth>clear</Button>
                        </div>
                    </form>
                </Paper>
                )
                }
                }}
            </Consumer>
        )
}
