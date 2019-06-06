const rewardController = require('../../controllers/rewardController');

const router = require('express').Router();

router.get('/history/:accountid', rewardController.findRedeemedByConsumerId);
router.get('/:points', rewardController.findEligibleRewards);
// router.patch('/redeem', rewardController.deductPoints);
router.post('/redeem', rewardController.addNewRedemption);

module.exports = router;
