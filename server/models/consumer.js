const db = require('../db/config');

const Consumer = {};

Consumer.deleteById = id => db.result(
  'DELETE FROM consumer WHERE consumerid = $1', [id]
);

Consumer.editById = (id, payload) => db.result('UPDATE consumer SET name = $/name/, email = $/email/, password = $/password/ WHERE consumerid = $/id/',
  {
    name: payload.name,
    email: payload.email,
    password: payload.password,
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

//added
Consumer.avgNumRewardsRedeemed = () => db.oneOrNone(
  'SELECT AVG(numRedeemed) FROM (SELECT c.ConsumerID as CID, COALESCE(numRedeemed,0) as numRedeemed from consumer c LEFT JOIN (SELECT ConsumerID, COUNT(*) as numRedeemed FROM redeems_reward GROUP BY ConsumerID) as r ON c.ConsumerID = r.ConsumerID) as joined'
);

//added
Consumer.numRewardsRedeemed = id => db.oneOrNone(
  'SELECT COUNT(*) FROM redeems_reward WHERE consumerid = $1', [id]
);

module.exports = Consumer;
