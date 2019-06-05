const rewardController = require('../../controllers/rewardController');

const router = require('express').Router();

router.get('/history/:accountid', rewardController.findByConsumerId);

router.patch('/redeem', rewardController.deductPoints);
router.post('/redeem', rewardController.addNewRedemption);

module.exports = router;
