
const express = require('express');
const router = express.Router();

const Secret = require('../models/secret');

router.route('/')
    .get((req, res) => {
        res.render('submit');
    })
    .post(async(req, res)=>{
        const {secret} = req.body;
        try{
            await Secret.create({content: secret});
            res.redirect('/secrets');
        }
        catch(e){
            res.sendStatus(500);
        }
    })


module.exports = router;