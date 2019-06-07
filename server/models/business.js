const db = require('../db/config');

const Business = {};

Business.deleteById = id => db.result(
  'DELETE FROM business WHERE businessid = $1', [id]
);

// TODO: Change to db.tx
Business.editById = (id, payload) => db.result('UPDATE business SET name = $/name/, email = $/email/ WHERE businessid = $/id/',
  {
    name: payload.name,
    email: payload.email,
    id
  });

Business.findById = id => db.oneOrNone(
  'SELECT * FROM business WHERE businessid = $1',
  [id]
);

// Return one business from email,password
Business.login = (email, password) => db.oneOrNone(
  'Select * from business where email = $1 and password = $2',
  [email, password]
);

module.exports = Business;
