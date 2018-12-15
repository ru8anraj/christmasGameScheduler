const express = require('express')
    , app = express('app');

/* importing routes */
const indexRoute = require('./routes/index.route.js')
    , santas = require('./routes/santas.route.js')
    , questionBank = require('./routes/questionBank.route.js');

/* cors */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

/* routes */
app.use('/', indexRoute);
app.use('/santas', santas);

module.exports = app;