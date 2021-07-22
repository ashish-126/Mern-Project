import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

const Signup = ()=>{
  
  const history = useHistory();
  const [user, setUser] = useState({
    name:"", email : "", work:"", phone:"", password:"", cpassword:""
  });
  
  const InputHandler = (event)=>{
    const {name, value} = event.target;  
    setUser((preval)=>{
        return {...preval, [name]:value}
      });
  }

  const submitHandler = async(e)=>{
    e.preventDefault();

    const {name, email, work, phone, password, cpassword} = user;

    const response = await fetch("/register", {
      method: "POST",
      headers: {
        "content-Type" : "application/json"
      },
      body: JSON.stringify({
        name, email, work, phone, password, cpassword
      })
    });

    const data  = await response.json();
    if(response.status === 422 || !data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else{
      window.alert("Successfull Registration");
      console.log("Successfull Registration");
      history.push("/login");
    }
  }
  
  return (
    <>
      <div className="container mt-5">
        <div className="signup-content">
          <div className = "signup-form" >
            <h2>Sign Up</h2>
            <br/>
               
            <form onSubmit={submitHandler} method="POST">
              <div className="mb-3">
                <TextField 
                  type="text" 
                  id="name" 
                  label="Your Name" 
                  placeholder='Your Name' 
                  name='name'
                  onChange={InputHandler}
                  value = {user.name}  
                  autoComplete="Off" 
                  required
                />
              </div>
              <div className="mb-3">
                <TextField 
                  type="email" 
                  id="email" 
                  label="Your Email" 
                  placeholder='Your Email' 
                  name='email'
                  onChange={InputHandler}
                  value = {user.email} 
                  autoComplete="Off" 
                  required
                />
              </div>
              <div className="mb-3">
                <TextField 
                  type="number" 
                  id="phone" 
                  label="Mobile Number" 
                  placeholder='Mobile Number' 
                  name='phone'
                  onChange={InputHandler}
                  value = {user.phone} 
                  autoComplete="Off" 
                  required/>
              </div>
              <div className="mb-3">
                <TextField 
                  type="text" 
                  id="work" 
                  label="Your Profession" 
                  placeholder='Your profession' 
                  name='work' 
                  onChange={InputHandler}
                  value = {user.work}
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
                  value = {user.password}
                  autoComplete="Off" 
                  required/>
              </div>
              
              <div className="mb-3">              
                <TextField 
                  type="password" 
                  id="cpassword" 
                  label="Confirm Password" 
                  placeholder='Confirm Password' 
                  name='cpassword' 
                  onChange={InputHandler}
                  value = {user.cpassword}
                  autoComplete="Off" 
                  required/>
              </div>
              <br/>
              <br/>
              <Button  type="submit" variant="contained">Register</Button>
            </form>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default Signup;
