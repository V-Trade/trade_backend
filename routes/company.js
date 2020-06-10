const express = require('express');
const Company = require('../models/company');
const auth = require('../auth');
const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Company.find({})
            .then((companies) => {
                res.json(companies);
            }).catch(next);
    })
    .post(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Company.create(req.body)
            .then((company) => {
                res.json(company);
            }).catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not supported" });
    })
    .delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Company.deleteMany({})
            .then((replay) => {
                res.json(replay);
            }).catch(next);
    });


router.route('/:id')
    .get((req, res, next) => {
        Company.findById(req.params.id)
            .then((company) => {
                if (company == null) throw new Error("Company not found!");
                res.json(company);
            }).catch(next);
    })
    .post((req, res, next) => {
        res.statsus = 405;
        res.json({ message: "Method not supported" });
    })
    .put(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Company.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then((response) => {
                if (response == null) throw new Error("Company not found!");
                res.json(response);
            }).catch(next);
    })
    .delete(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
        Company.findByIdAndDelete(req.params.id)
            .then((response) => {
                res.json(response);
            }).catch(next);
    });

module.exports = router;
