
const express = require('express');
const { handleLoggedUser } = require('../middlewares/authMiddlewares');
const router = express.Router();

router.get('/', handleLoggedUser, (req, res)=>{
    res.render('home');
  
})

module.exports = router