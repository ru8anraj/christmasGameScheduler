const indexRoute = require('express').Router();

indexRoute.get('/', function(req, res) {
  res.send('Merry Christmas');
});

module.exports = indexRoute;