import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NavLink, useHistory } from 'react-router-dom'

const Login = ()=>{
  
  const history = useHistory()
  const [loginData, setLoginData] = useState({
    email:"", password:""
  });
  
  const InputHandler = (event)=>{
    const {name, value} = event.target;  
    setLoginData((preval)=>{
        return {...preval, [name]:value}
      });
  }

  const submitHandler = async(e)=>{
    e.preventDefault();

    const {email, password} = loginData;

    const response = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });

    const data  = await response.json();
    if(response.status === 400 ){
      window.alert("Invalid Crendentials");
      setLoginData(()=>{
        return {email:"", password:""}
      });
    }
    else{
      console.log("Successfull Login");
      history.push("/");
    }
  }
  
  return (
    <>
      <div className="container mt-5">
        <div className="signup-content">
          <div className = "signup-form" >
            <h2>Login</h2>
            <br/>
              
            <form onSubmit={submitHandler} method="POST">
              
              <div className="mb-3">
                <TextField 
                  type="email" 
                  id="email" 
                  label="Your Email" 
                  placeholder='Your Email' 
                  name='email'
                  onChange={InputHandler}
                  value = {loginData.email} 
                  autoComplete="Off" 
                  required/>
              </div>
              <div className="mb-3">              
                <TextField 
                  type="password" 
                  id="password" 
                  label="Password" 
                  placeholder='Password' 
                  name='password' 
                  onChange={InputHandler}
                  value = {loginData.password}
                  autoComplete="Off" 
                  required/>
              </div>
    
              <div className="mb-3">
              <NavLink className="nav-link" to="/signup">Create an Account</NavLink>
              </div>                
              <br/>
            
              <Button  type="submit" variant="contained">Login</Button>
            </form>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Login;
