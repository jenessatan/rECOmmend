const db = require('../db/config');

const Consumer = {};

Consumer.deleteById = id => db.result(
  'DELETE FROM consumer WHERE consumerid = $1', [id]
);

// TODO: Change to db.tx
Consumer.editById = (id, payload) => db.result('UPDATE consumer SET name = $/name/, email = $/email/ WHERE consumerid = $/id/',
  {
    name: payload.name,
    email: payload.email,
    id
  });

Consumer.findById = id => db.oneOrNone(
  'SELECT * FROM consumer WHERE consumerid = $1',
  [id]
);

// Return one consumer from email,password
Consumer.login = (email, password) => db.oneOrNone(
  'Select * from consumer where email = $1 and password = $2',
  [email, password]
);

module.exports = Consumer;
