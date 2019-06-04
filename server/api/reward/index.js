const rewardController = require('../../controllers/rewardController');

const router = require('express').Router();

router.get('/history/:accountid', rewardController.findByConsumerId);
// router.post('/redeem', rewardController.redeemReward);

module.exports = router;
