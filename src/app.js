const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const db = require('./models/index');
const { env } = process;

const session = require('express-session');
const notFound = require('./utils/func/pageNotFound');
const ErrorHandler = require('./utils/func/errorHandler');

const app = express();


const User = db.user;
const Course = db.course;
const Comment = db.comment;
const Note = db.note;
const Req = db.req;


//User relations
User.hasMany(Course);

User.hasMany(Comment);

User.hasMany(Note);

User.hasMany(Req);

// Course relations

Course.hasMany(User);

Course.hasMany(Comment);

//  Comment relations
Comment.hasOne(User);

// Note relations

Note.hasOne(User);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
process.env.ENV == 'dev' && app.use(morgan('dev'));



// For Session
app.use(session({
    secret: env.SESSION_KEY,

    resave: true,

    saveUninitialized: true
}));

app.use(async (req, res, next) => {
    if (req.session.user) {
        req.session.user = await User.findOne({ email: req.session.email });
    }
    next();
});

app.use('*', notFound);


app.use(ErrorHandler);



module.exports = app;