
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// const md5 = require('md5');

const {hashPassword, handleLoggedUser} = require('../middlewares/authMiddlewares');

router.route('/')
    .get(handleLoggedUser, (req, res) => {
        res.render('register'); 
    })
    .post(hashPassword, async (req, res) => {
        try{
            const newUser = new User({
                email: req.body.username,
                password: req.body.password
            })
            await newUser.save();
            res.redirect('/login');
        }
        catch(e){
            console.log(e);
            res.redirect('/register');
        }   
    })




module.exports = router