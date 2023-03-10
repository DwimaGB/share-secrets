
const express = require('express');
const router = express.Router();
const User = require('../models/user');

const md5 = require('md5');
const passport = require('passport');
const { handleLoggedUser } = require('../middlewares/authMiddlewares');

// const {comparePassword} = require('../middlewares/authMiddlewares');

router.route('/')
    .get(handleLoggedUser, (req, res) => {
        res.render('login');
    })
    .post(passport.authenticate('local', {
        successRedirect: '/secrets',
        failureRedirect: '/login',
        failureFlash: true,
    }));


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