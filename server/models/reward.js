const db = require('../db/config');

const Reward = {};

Reward.findByConsumerId = id => db.result('SELECT redeems_reward.rewardname, redeems_reward.businessid, date, consumerid, business.name FROM redeems_reward JOIN business USING (businessid) JOIN offers_reward USING (businessid) WHERE consumerid = $1', [id]);

Reward.deductPoints = (pointVal, consumerID) => db.none('UPDATE consumer SET points = points - $1 WHERE consumerID = $2', [pointVal, consumerID]);

Reward.addNewRedemption = (consumerID, payload) => {
  const { rewardname, businessid } = payload;
  return db.none('INSERT INTO redeems_reward (rewardname, businessid, date, consumerid) VALUES ($1, $2, CURRENT_DATE, $3)', [rewardname, businessid, consumerID]);
};
// Return one consumer from email,password
// Consumer.login = (email, password) => db.oneOrNone(
//  'Select * from consumer where email = $1 and password = $2',
//  [email, password]
// );

module.exports = Reward;

