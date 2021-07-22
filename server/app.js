const express = require("express");
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const app = express();

const cookies = require("cookie-parser");

app.use(cookies());

dotenv.config({path:'./config.env'});
const PORT = process.env.PORT;

require("./db/conn");

//const  User = require("./model/userSchema");

// middleware convert any json in object
app.use(express.json());

// router file
app.use(require('./router/auth'));


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})