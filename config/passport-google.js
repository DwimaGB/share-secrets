
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const GoogleUser = require('../models/googleUser');


// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: '/auth/google/callback',
// }, (accessToken, refreshToken, profile, done) => {
//     done(null, profile)
// }))


// passport.serializeUser(async (user, done) => {
//     console.log(user._json);
//     const serializeUser = {
//         sub: user._json.sub,
//         name: user._json.name || '',
//         email: user._json.email
//     }
//     done(null, serializeUser);
// })

// passport.deserializeUser(async (user, done) => {

//     try {
//         const foundUser = await GoogleUser.findOne({ sub: user.sub });
//         if (foundUser) {
//             return done(null, foundUser);
//         }
//         const newUser = new GoogleUser({ sub: user.sub, name: user.name, email: user.email })

//         await newUser.save()

//         done(null, newUser)
//     }
//     catch (e) {
//         done(e);
//     }
// })

// module.exports = passport;