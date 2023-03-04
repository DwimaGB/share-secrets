
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    if(!req.isAuthenticated())  res.render('home');
    else{
        res.redirect('/secrets');
    }
})

module.exports = router