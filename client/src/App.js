import React from "react";
import Navbar from "./components/Navbar";
import { Route, Switch, Redirect } from "react-router";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";

const App = ()=>{

  return(
    <>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/logout" component={Logout}/>
        <Redirect to="/login" />
      </Switch>
    </>
  );
}

export default App;