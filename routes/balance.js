const express = require('express');
const Balance = require('../models/balance');
const auth = require('../auth');
const router = express.Router();

router.route('/')
    .get(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Balance.find({})
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
        Balance.find({ acHolder: req.params.uid })
            .then((balance) => {
                res.json(balance);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    });

module.exports = router;