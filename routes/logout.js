
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    // console.log(req.session);
    req.logOut((err)=>{
        if(err) console.log(err);
        else{
            console.log(req.session);
            res.redirect('/');
        }
    });
})

module.exports = router