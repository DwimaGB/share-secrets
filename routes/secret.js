

const express = require('express');
const router = express.Router();

const Secret = require('../models/secret');

router.route('/')
    .get(async (req, res) => {
        // console.log(req.user);
        try{
            const secrets = await Secret.find({});
            res.render('secrets', {secrets});
        }
        catch(e){
            res.sendStatus(500);
        }
        
        
    })

module.exports = router;