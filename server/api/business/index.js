const businessController = require('../../controllers/businessController');

const router = require('express').Router();

router.get('/:accountid', businessController.findById);
router.patch('/:accountid', businessController.editById);
router.delete('/:accountid', businessController.deleteById);

//added
router.get('/:accountid/avgNumRewards', businessController.avgRewardsRedeemedByBusiness);

module.exports = router;
