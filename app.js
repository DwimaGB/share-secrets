require('dotenv').config();
const express = require('express');
const app = express();

// const md5 = require('md5');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./config/passport-config');

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

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const secretRouter = require('./routes/secret');
const logoutRouter = require('./routes/logout');

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/secrets', secretRouter);
app.use('/logout', logoutRouter);


app.listen(3000);