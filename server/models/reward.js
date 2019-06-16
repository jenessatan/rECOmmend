const db = require('../db/config');

const Reward = {};

Reward.findByConsumerId = id => db.result('SELECT redeems_reward.rewardname, redeems_reward.businessid, date, consumerid, business.name FROM redeems_reward JOIN business USING (businessid) JOIN offers_reward USING (businessid) WHERE consumerid = $1', [id]);

Reward.deductPoints = (pointVal, consumerID) => db.none('UPDATE consumer SET points = points - $1 WHERE consumerID = $2', [pointVal, consumerID]);

Reward.addNewRedemption = (payload) => {
	return db.tx(t => {
		return t.batch([
			t.none('INSERT INTO redeems_reward VALUES ($/rewardname/, $/businessid/, CURRENT_DATE, $/consumerid/)', 
				{rewardname: payload.rewardName,
				 businessid: payload.businessID,
				 consumerid: payload.consumerID
				 }),
			t.one('UPDATE consumer SET points = (points - $/points/) WHERE consumerID = $/consumerid/ RETURNING points', 
				{points: payload.points,
				 consumerid: payload.consumerID
				 })
		]);
	})
	.then(response => {
		return (response[1].points);
	})
	.catch(error => {
		throw new Error(error);
	});
};

Reward.findByPoints = (points) => {
	return db.any('SELECT businessid, name, rewardname, pointvalue FROM offers_reward JOIN business USING (businessid) WHERE pointvalue <= $1', [points]);
};

module.exports = Reward;

