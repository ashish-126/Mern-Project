const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const  User = require("../model/userSchema");

router.get("/",(req, res)=>{
    res.send("hello world from server");
});

// using promises
// router.post("/register",(req, res)=>{
//     const {name, email, phone, work, password, cpassword} = req.body;
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"please filled the fields properly"});
//     }
    
//     User.findOne({email:email})
//     .then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error:"Email already Exists"});
//         }
//         const user = new User({name, email, phone, work, password, cpassword});
//         user.save().then(() => {
//             res.status(201).json({message:"User register successfully"});
//         }).catch((err) =>res.status(500).json({error:"Failed to register"})); 
//     }).catch(err=> {console.log(err)});
    
// });

router.post("/register", async(req, res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error:"please filled the fields properly"});
    }
    else if(password !== cpassword){
        return res.status(422).json({error:"Password is not matching"});
    }
    try {
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"Email already Exists"});
        }

        const user = new User({name, email, phone, work, password, cpassword});

        await user.save();
        res.status(201).json({message:"User register successfully"});
    } catch (err) {
        console.log(err);
    }
});

router.post("/signin", async(req, res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(422).json({error:"please filled the fields properly"});
        }

        const userLogin = await User.findOne({email:email});
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if(!isMatch){
                return res.status(400).json({error:"Please enter correct Credentials"});
            }
            else{
                const token = await userLogin.generateAuthToken();
                console.log(token);
                res.cookie("auth",token,{
                    expires : new Date(Date.now() + 25892000000),
                    httpOnly:true
                });
                res.status(201).json({message:"User signin successfully"});
            }    
        }else{
            return res.status(400).json({error:"Please enter correct Credentials"});
        }

    } catch (error) {
        console.log(error);
    }
});


router.get("/about",authenticate,(req, res)=>{
    res.send(req.rootUser);

});

router.get("/contact",(req, res)=>{
    res.send("hello contact world from server");
});

router.get("/logout",(req, res)=>{
    res.clearCookie("auth",{path:"/"})
    res.status(200).send('user Logout');

});

module.exports =router;