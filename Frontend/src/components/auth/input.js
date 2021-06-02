import React from 'react'
import {TextField,Grid,InputAdornment,IconButton} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
const Input = ({half,handlechange,label,autoFocus,type,showpassword,name}) => {
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField name={name} onChange={handlechange} InputProps={name=="password" && {
                endAdornment:(
                    <InputAdornment position ='end'>
                        <IconButton onClick={showpassword}>
                            {type=="password" ? <Visibility/>:<VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                )} } variant="outlined" required fullWidth label={label} autoFocus={autoFocus} type={type} />
        </Grid>
    )
}
export default Input
