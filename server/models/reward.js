const db = require('../db/config');

const Reward = {};

Reward.findByConsumerId = (id) => db.result('SELECT redeems_reward.rewardname, redeems_reward.businessid, date, consumerid, business.name FROM redeems_reward JOIN business USING (businessid) JOIN offers_reward USING (businessid) WHERE consumerid = $1', [id]
);

// Return one consumer from email,password
// Consumer.login = (email, password) => db.oneOrNone(
//  'Select * from consumer where email = $1 and password = $2',
//  [email, password]
// );

module.exports = Reward;

