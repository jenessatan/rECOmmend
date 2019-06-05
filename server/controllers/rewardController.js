const Reward = require('../models/reward');

const rewardController = {};

rewardController.findByConsumerId = (req, res) => {
  Reward.findByConsumerId(req.params.accountid)
    .then((response) => {
  	if (response) {
  		res.json({
      		message: 'Success',
      		data: response.rows
    	});
      } else {
        throw new Error(`Rewards for account ${req.params.accountid} not found`);
      }
    })
    .catch((err) => {
  	console.log('error message');
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

rewardController.deductPoints = (req, res) => {
  Reward.deductPoints(req.body.points, req.body.consumerID)
    .then(() => {
      res.json({ message: 'this apparently worked' });
    })
    .catch((err) => {
      console.log('error message');
      console.log(err);
      res.status(500).json({ error: `${err}` });
    });
};

rewardController.addNewRedemption = (req, res) => {
  const payload = {
    rewardname: req.body.rewardname,
    businessid: req.body.businessid
  };
  Reward.addNewRedemption(req.body.consumerID, payload)
    .then(() => {
      res.json({ message: 'inserted a new reward redemption' });
    })
    .catch((err) => {
      console.log('error message');
      console.log(err);
      res.status(500).json({ error: `${error}` });
    });
};

// consumerController.editById = (req, res) => {
//  console.log('***payload***');
//  console.log(req.body);
//  const payload = {
//    name: req.body.name,
//    email: req.body.email
//	 };
//  Consumer.editById(req.params.accountid, payload)
//    .then((response) => {
//      if (response.rowCount === 1) {
//        res.send({
//          message: 'Success'
//        });
//      } else {
//        throw new Error(`Unable to update account ${req.params.accountid}`);
//      }
//    })
//    .catch((error) => {
//      res.status(500).json({ error: `${error}` });
//    });
// };


module.exports = rewardController;
