
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/user');

const hashPassword = async (req, res, next)=>{

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        next();
    }
    catch (e) {
        next(e);
    }

}


const comparePassword = async(req, res, next)=>{
    const {username, password} = req.body;

    try{
        const user = await User.findOne({username: username});
        if(!user) return res.status(401).send('Invalid Credentials!!');

        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).send('Invalid Credentials!!');

        next();
    }
    catch(e){
        return res.status(500).send(e.message);
    }
}

module.exports = {hashPassword, comparePassword};