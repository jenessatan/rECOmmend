const businessController = require('../../controllers/businessController');

const router = require('express').Router();

router.get('/:accountid', businessController.findById);
router.patch('/:accountid', businessController.editById);
router.delete('/:accountid', businessController.deleteById);
router.get('/cert/:accountid', businessController.getCert);
router.get('/product/:accountid', businessController.getProduct);
router.get('/reward/:accountid', businessController.getReward);
router.get('/redeemedreward/:accountid', businessController.redeemedRewards);

// added
router.get('/:accountid/avgNumRewards', businessController.avgRewardsRedeemedByBusiness);

module.exports = router;
