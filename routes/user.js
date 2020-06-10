const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const router = express.Router();
const auth = require('../auth');

router.post('/register', (req, res, next) => {
    let password = req.body.password;

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            throw new Error('Problem hashing password');
        }

        User.create({
            fullName: req.body.fullName,
            phone: req.body.phone,
            username: req.body.username,
            profile: req.body.profile,
            admin: req.body.admin,
            password: hash
        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            // res.json({ status: "Registration successful", user: user._id, token: token });
            res.json({ status: "Signup success!", token: token });
        }).catch(next);
    });
});



router.post('/login', (req, res, next) => {
    User.findOne({ phone: req.body.phone })
        .then((user) => {
            if (user == null) {
                let err = new Error('Mobile number not registered!');
                err.status = 401;
                return next(err);
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match');
                            err.status = 401;
                            return next(err);
                        }

                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login successful', user: user._id, token: token });
                    }).catch(next);
            }
        });
});

router.route('/profile')
    .get(auth.verifyUser, (req, res, next) => {
        res.json({
            _id: req.user._id,
            fullName: req.user.fullName,
            username: req.user.username,
            phone: req.user.phone,
            profile: req.user.profile
        });
    })

    .put(auth.verifyUser, (req, res, next) => {
        User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
            .then((user) => {
                res.json({
                    _id: req.user._id,
                    fullName: req.user.fullName,
                    username: req.user.username,
                    phone: req.user.phone,
                    profile: req.user.profile
                });
            }).catch(next);
    });


router.post('/checkPassword', auth.verifyUser, (req, res, next) => {
    User.findOne({ phone: req.user.phone })
        .then((user) => {

            bcrypt.compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        let err = new Error('Password does not match');
                        err.status = 401;
                        return next(err);
                    }

                    res.json({ status: 'true' });
                    console.log(true);
                }).catch(next);

        });
});


router.route('/changePassword')
    .put(auth.verifyUser, (req, res, next) => {
        let password = req.body.password;

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                throw new Error('Problem hashing password');
            }
            const newUser = {
                "password": hash
            }
            User.findByIdAndUpdate(req.user._id, { $set: newUser }, { new: true })
                .then((user) => {
                    res.json(user);
                }).catch(next);
        });
    });

module.exports = router;

