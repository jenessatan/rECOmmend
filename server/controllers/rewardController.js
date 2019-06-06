const Reward = require('../models/reward');

const rewardController = {};

rewardController.findRedeemedByConsumerId = (req, res) => {
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

rewardController.addNewRedemption = (req, res) => {
	const payload = {
		businessID: req.body.businessID,
		consumerID: req.body.consumerID,
		rewardName: req.body.rewardName,
		points: req.body.points
	};
	Reward.addNewRedemption(payload)
		.then((response) => {	
			res.json({ message: 'Successfully redeemed reward',
					   newPointsBalance: response });
		})
		.catch((error) => {
			res.status(500).json({ error: `Reward redemption unsuccessful; rolling back all changes` });
		});
};

rewardController.findEligibleRewards = (req, res) => {
	Reward.findByPoints(req.params.points)
		.then((response) => {
			console.log(response);
			res.json({ message: 'Success',
						data: response
					});	
	})
		.catch((error) => {
			res.status(500).json({error: `${error}`});
	});
};


module.exports = rewardController;
