const express = require('express')
    , app = express('app');

/* cors */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* addons */
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

/* routes */
// app.use();

module.exports = app;