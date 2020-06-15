const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');

const userRoute = require('./routes/user');
const companyRoute = require('./routes/company');
const tradeRoute = require('./routes/trade');
const balanceRoute = require('./routes/balance');
const portfolioRoute = require('./routes/portfolio');
const auth = require('./auth');

const dotenv = require('dotenv').config();
const app = express();


app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((db) => {
        console.log("Connected to Mongo database server.")
    }, (err) => console.log(err));



app.use('/users', userRoute);
app.use('/companies', companyRoute);
app.use(auth.verifyUser);
app.use('/trades', tradeRoute);
app.use('/balance', balanceRoute);
app.use('/portfolio', portfolioRoute);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ message: err.message });
});


app.listen(process.env.PORT, () => {
    console.log(`App is running successfully at localhost:${process.env.PORT}`);
});
