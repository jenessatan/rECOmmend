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
