const express = require('express');
const Balance = require('../models/balance');
const auth = require('../auth');
const User = require('../models/user');
const router = express.Router();

router.route('/')
    .get(auth.verifyUser, (req, res, next) => {
        Balance.find({})
            .populate({
                path: 'acHolder'
            })
            .then((balances) => {
                res.json(balances);
            }).catch(next);
    })
    .post(auth.verifyUser, (req, res, next) => {
        Balance.create(req.body)
            .then((balance) => {
                res.json(balance);
            }).catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Balance.deleteMany({})
            .then((replay) => {
                res.json(replay);
            }).catch(next);
    });


router.route('/:uid')
    .get(auth.verifyUser, (req, res, next) => {
        Balance.findOne({ acHolder: req.params.uid })
            .populate({
                path: 'acHolder'
            })
            .then((balance) => {
                res.json(balance);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .put(auth.verifyUser, (req, res, next) => {
        Balance.findOneAndUpdate({ acHolder: req.params.uid }, { $set: req.body }, { new: true })
            .then((response) => {
                res.json(response);
            }).catch(next);
    });


// router.route('leaderboard')
//     .get(auth.verifyUser, (req, res, next) => {
//         Balance.find({})
//             .then((response) => {
//                 res.json(response);
//             })
//     })
module.exports = router;