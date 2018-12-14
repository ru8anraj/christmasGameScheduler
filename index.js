const mailer = require('./mailer/mailer.js');

mailer()
  .then(t => console.log(t))
  .catch(err => console.error(err));