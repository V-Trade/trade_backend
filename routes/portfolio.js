const express = require('express');
const Portfolio = require('../models/portfolio');
const auth = require('../auth');
const router = express.Router();

router.route('/')
    .get(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Portfolio.find({})
            .populate({
                path: 'company'
            })
            .then((portfolio) => {
                res.json(portfolio);
            }).catch(next);
    })
    .post(auth.verifyUser, (req, res, next) => {
        Portfolio.create(req.body)
            .then((portfolio) => {
                res.json(portfolio);
            }).catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Portfolio.deleteMany({})
            .then((replay) => {
                res.json(replay);
            }).catch(next);
    });

//this shows the portfolio of a user
router.route('/:uid')
    .get(auth.verifyUser, (req, res, next) => {
        Portfolio.find({ acHolder: req.params.uid })
            .populate({
                path: 'company'
            })
            .then((portfolio) => {
                res.json(portfolio);
            }).catch(next);
    });

router.route('/:uid/:cid')
    .get(auth.verifyUser, (req, res, next) => {
        Portfolio.findOne({ acHolder: req.params.uid, company: req.params.cid })
            .populate({
                path: 'company'
            })
            .then((portfolio) => {
                res.json(portfolio);
            }).catch(next);
    })
    .post((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .put(auth.verifyUser, (req, res, next) => {
        Portfolio.findOneAndUpdate({ acHolder: req.params.uid, company: req.params.cid }, { $set: req.body }, { new: true })
            .then((response) => {
                if (response == null) throw new Error("Company not found!");
                res.json(response);
            }).catch(next);
    })
    .delete(auth.verifyUser, (req, res, next) => {
        Portfolio.findOneAndDelete({ _id: req.params.id })
            .then((response) => {
                res.json({ status: 'Successfully Deleted' });
            }).catch(next);
    })
module.exports = router;