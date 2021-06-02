import React from 'react'
import {Avatar,Button,Paper,Typography,Container,Grid} from '@material-ui/core'
import useStyles  from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Input from './input'
import Icon from './icon'
import {GoogleLogin} from 'react-google-login'
import {Consumer} from '../../context'
import {useHistory} from 'react-router-dom'
const Auth = () => {
const classes=useStyles()
const  history=useHistory()
return(
<Consumer>
{value=>{
    const {googlefailure,signup,switchmode,handlefile,handlesubmit,issignin,handlechange,setshowpassword,showpassword,googlesuccess}=value
    {if (issignin) {
        history.push('/')
    }else{
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography variant="h5">{ signup? 'Sign up': 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={(e)=>handlesubmit(e)}>
                <Grid container spacing={2}>
        {
            signup && (
                <>
                <Input name="firstname" label="firstname" handlechange={(e)=>handlechange(e)} autoFocus half/>
                <Input name="lastname" label="lastname" handlechange={(e)=>handlechange(e)} half/>
                </>
            )
        }
            <Input name="email" label="email adress" handlechange={(e)=>handlechange(e)} type='email'/>
            <Input name="password" label="password"  handlechange={(e)=>handlechange(e)}  showpassword={()=>setshowpassword()} type={showpassword? "text":"password"}/>
               {signup && 
               <Input name="confirmpassword" label ="repeat password" handlechange={(e)=>handlechange(e)} type='password'/>
               }
               
               </Grid>
               
                <Button type='submit' fullWidth variant="contained" color='primary' className={classes.submit}>
                    {signup ? 'Sign up' : 'Sign in'}
                </Button>
                <GoogleLogin
               clientId="505218752375-oqhetn75f0lfermumsaobeqmplsdscp8.apps.googleusercontent.com"
               render={(renderProps)=>(
                   <Button  variant="contained" className={classes.googleButton} 
                   color='primary' fullWidth onClick={renderProps.onClick} 
                   disabled={renderProps.disabled} startIcon={<Icon/>}>
                       Google Sign in
                   </Button>
               )}
               onFailure={()=>googlefailure()}
               onSuccess={(res)=>googlesuccess(res)}
               cookiePolicy="single_host_origin"
               />
                <Grid container justify="flex-end">
                    <Grid item>
                        <Button onClick={()=>switchmode()}>
                            {signup?"alerady have an account sign in":"dont have sign up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            </Paper>
        </Container>
    )
    }
}

}}
</Consumer>
)
}

export default Auth

