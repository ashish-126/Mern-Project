import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";

function About() {
 
  const [user, setUser] = useState({});
  const history =useHistory();

  const callAboutPage = async ()=>{
    try {
      const res = await fetch("/about",{
        method :"GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials:"include"
      });

      const data = await res.json();

      if(!res.status ===200){
        const error = new Error(res.error);
        throw error;
      }else{
        setUser(data);
      }

    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  }

  useEffect(() => {
    callAboutPage();
  }, [])
  
  return (
    <>
      <h1>Information About me</h1>
      <br/>
      <p>Hi My name is {user.name}. My emailId is {user.email} my mobile Number is {user.phone} and my profession is {user.work}  </p>
    </>
  )
}
export default About;