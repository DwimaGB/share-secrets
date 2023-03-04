const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const bcrypt = require('bcrypt');

passport.use(new LocalStrategy({usernameField: 'username'}, async (username, password, done)=>{

    try{
        const user = await User.findOne({email: username});
        if(!user) return done(null, false);

        if(await bcrypt.compare(password, user.password)) return done(null, user);
        done(null, false);
        
    }   
    catch(e){
        done(e);
    }
 
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    try{
        const user = await User.findById(id);
        if(user) return done(null, user);
        done(null, false);
       
    }
    catch(e){
        done(e);
    }
})



module.exports = passport;