const db = require('../db/config');

const Consumer = {};

Consumer.deleteById = id => db.result(
  'DELETE FROM consumer WHERE consumerid = $1', [id]
);

Consumer.editById = (id, payload) => db.result('UPDATE consumer SET name = $/name/, email = $/email/ WHERE consumerid = $/id/',
  {
    name: payload.name,
    email: payload.email,
    id
  });

Consumer.findByEmail = email => db.oneOrNone(
  'SELECT * FROM consumer WHERE email = $1',
  [email]
);

// Return one consumer from email,password
Consumer.login = (email, password) => db.oneOrNone(
  'Select * from consumer where email = $1 and password = $2',
  [email, password]
);

module.exports = Consumer;
