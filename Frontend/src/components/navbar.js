import React from 'react'
import {Link} from 'react-router-dom'
import {Consumer} from '../context'

function Navabr() {
    return (
        <Consumer>
        {value=>{
              const {issignin,name,imgsrc,logout}=value
         return(
         
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link className="navbar-brand" to="/">INTERACTION</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            
                        {issignin ? (
                            <Link className=" my-2" to="/editprofile">
                                <div class="navbar-brand">
                                    <img style={{"border-radius":"20px"}} src={!imgsrc?"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png":imgsrc} width="30" height="30" class="d-inline-block align-top" alt=""/>
                                    {name}
                                </div>
                                <button type="button" className="btn btn-outline-success my-2 my-sm-0" onClick={()=>logout()} color='secondary'>Logout</button>
                            </Link>
                            ):(
                             <Link to="auth"><button type="button" className="btn btn-outline-success my-2 my-sm-0">Sign in</button></Link>
                    )}
                        </form>
                    </div>
                    </nav>
                    
            
            
         )
        
         }}
    </Consumer>

)}

export default Navabr
