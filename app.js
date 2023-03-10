require('dotenv').config();
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const flash = require('express-flash');
const express = require('express');
const app = express();

const {handleLoggedUser, authorizeProtectedRoutes} = require('./middlewares/authMiddlewares');

// const md5 = require('md5');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const passport = require('passport');
const passport = require('./config/passport-config');
// const passportLocalStrategy = require('./config/passport-config');
// const passportGoogleStrategy = require('./config/passport-google');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', e=>console.log(e));
db.once('open', ()=>console.log("Connected to userDB"));

app.use(helmet());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized:  false,
    cookie: {
        maxAge: 1000*60*60*24
    },
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL, collectionName: 'sessions'})
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next)=>{
//     console.log(req._passport);
//     // console.log(req.session)
//     next();
// })

// app.use(passportGoogleStrategy);
// app.use(passportLocalStrategy);

// passportLocalStrategy(passport);
// passportGoogleStrategy(passport);

app.use(flash());

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const secretRouter = require('./routes/secret');
const logoutRouter = require('./routes/logout');


app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/auth',  require('./routes/googleAuth'));


app.use(authorizeProtectedRoutes);
app.use('/secrets', secretRouter);
app.use('/submit', require('./routes/newSecret'));

https.createServer({
    key: process.env.CERT_PRIV_KEY,
    cert: process.env.CERT
}, app).listen(process.env.PORT || 3000, ()=>{
    console.log('Listening to 3000');
})
