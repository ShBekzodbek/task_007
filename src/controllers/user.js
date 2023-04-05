const db = require('../models/index');
const uuid = require('uuid');
const signUpInputValidator = require('../utils/inputValidators/user/signup');
const generateAccessToken = require('../middlewares/auth/generateAccessToken');
const signInInputValidator = require('../utils/inputValidators/user/signin');

const User = db.user;

module.exports = class UserController {
    static async signup(req, res, next) {
        try {
            let body;
            const exists = await User.findOne({
                where:
                {
                    email: req.body.email
                }
            })
            if (exists) {
                return res.status(400).send({ message: 'User already exists' });
            }
            const { error, value } = signUpInputValidator(req.body);
            if (error) {
                return res.status(400).send(`Inputs not valid: ${error.details[0].message}`)
            } else {
                body = value;
            }
            const user = await User.create({
                id: uuid.v1(),
                name: body.name,
                email: body.email,
                password: body.password,
                about: body.about,
            });
            req.session.user = user;
            let token = generateAccessToken(body.email);
            const result = await user.save();
            // console.log(`Result of req : ${result}\n Session.user : ${req.session.user}\n Token :${token}`);
            res.header('Authorization', 'Bearer' + token)
            return res.status(201).send({ message: 'User created', token: token });
        } catch (err) {
            next(err);
        }
    };
    static async signin(req, res, next) {
        try {
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(400).send(`Inputs not valid: Input must have `)
            }
            const { error } = signInInputValidator(req.body);
            if (error || !req.body.email || !req.body.password) {
                return res.status(400).send(`Inputs not valid: ${error}`)
            }
            const user = await User.findOne({
                where:
                {
                    email: req.body.email
                }
            });
            if (!user) {
                return res.status(401).send({ message: 'User not found' });
            }
            if (user.password != req.body.password || user.email != req.body.email) {
                return res.status(401).send({ message: 'Email or password  invalid' });
            } else {
                req.session.user = user;
                const token = generateAccessToken(user.email);
                return res.status(200).send({
                    message: `Signed in`,
                    token: token
                })
            }

        } catch (err) {
            next(err);
        }

    };
    static async logout(req, res, next) {
        try {
            req.session.user.destroy();
            return res.redirect('/');
        } catch (err) {
            next(err);
        }
    };

    static async buyCourse(req, res, next) { }

    static async comment(req, res, next) { }

    static async note(req, res, next) { }

}