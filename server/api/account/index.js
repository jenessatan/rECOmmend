const consumerController = require('../../controllers/consumerController');

const router = require('express').Router();

router.get('/:accountid', consumerController.findById);
router.patch('/:accountid', consumerController.editById);
router.delete('/:accountid', consumerController.deleteById);

//added
router.get('/', consumerController.avgNumRewardsRedeemed);
router.get('/:accountid/numRewards', consumerController.numRewardsRedeemed);

module.exports = router;
