require('dotenv').config();
const express = require('express');
const app = express();

const md5 = require('md5');

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

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login')

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);


app.listen(3000);