
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GoogleUser = require('../models/googleUser');

const bcrypt = require('bcrypt');

const passport = require('passport');

passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {

    try {
        const user = await User.findOne({ email: username });
        if (!user) return done(null, false);
        user.strategy = 'local'; //custom property for differentiating the serializeUser and deserializeUser 
        if (await bcrypt.compare(password, user.password)) return done(null, user);
        done(null, false);

    }
    catch (e) {
        done(e);
    }

}));


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, (accessToken, refreshToken, user, done) => {
    user.strategy = 'google'; //  custom property for differentiating the serializeUser and deserializeUser 
    done(null, user)
}))

passport.serializeUser((user, done) => {

    // console.log(user.strategy);
    if (user.strategy === 'local') {
        done(null, { userId: user.id, strategy: 'local' });
    }
    else if (user.strategy === 'google') {
        const serializeUser = {
            sub: user._json.sub,
            name: user._json.name || '',
            email: user._json.email,
            strategy: 'google'
        }
        done(null, serializeUser);
    }

});

passport.deserializeUser(async (user, done) => {

    // console.log(user);
    try {
        if (user.strategy === 'local') {
            const foundUser = await User.findById(user.userId);
            if (foundUser) return done(null, foundUser);
            done(null, false);
        }
        else if (user.strategy === 'google') {
            const foundUser = await GoogleUser.findOne({ sub: user.sub });
            if (foundUser) {
                return done(null, foundUser);
            }
            const newUser = new GoogleUser({ sub: user.sub, name: user.name, email: user.email })

            await newUser.save()

            done(null, newUser)
        }


    }
    catch (e) {
        done(e);
    }
})

module.exports = passport;
