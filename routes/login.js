
const express = require('express');
const router = express.Router();
const User = require('../models/user');

const md5 = require('md5');

const {comparePassword} = require('../middlewares/authMiddlewares');

router.route('/')
    .get((req, res) => {
        res.render('login');
    })
    .post(comparePassword, (req, res)=>{
        res.render('secrets');
    })


module.exports = router


/*  */

// async function isAuthenticate(req, res, next){
//     const {username, password} = req.body;
//     try{
//         const user = await User.findOne({email: username});
//         console.log(user);
//         if(!user){
//             return res.status(400).send("No User found!!");
//         } 
//         if(user.password === md5(password)){
//             return next();
//         }
//         res.status(401).send("Not Authorized!!");
//     }
//     catch(e){
//         res.status(500).json({message: e.message});
//     }
// }