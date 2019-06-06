const db = require('../db/config');

const Business = {};

// Return one consumer from email,password
Business.login = (email, password) => db.oneOrNone(
  'Select * from business where email = $1 and password = $2',
  [email, password]
);

module.exports = Business;
