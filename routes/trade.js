const express = require('express');
const Trade = require('../models/trade');
const auth = require('../auth');
const router = express.Router();

router.route('/')
    .get(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Trade.find({})
            .then((trades) => {
                res.json(trades);
            }).catch(next);
    })
    .post(auth.verifyUser, (req, res, next) => {
        Trade.create(req.body)
            .then((trade) => {
                res.json(trade);
            }).catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Trade.deleteMany({})
            .then((replay) => {
                res.json(replay);
            }).catch(next);
    });


router.route('/:uid')
    .get(auth.verifyUser, (req, res, next) => {
        Trade.find({ trader: req.params.uid })
            .then((histories) => {
                res.json(histories);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    });

module.exports = router;