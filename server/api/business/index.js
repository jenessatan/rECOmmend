const businessController = require('../../controllers/businessController');

const router = require('express').Router();

router.get('/:accountid', businessController.findById);
router.patch('/:accountid', businessController.editById);
router.delete('/:accountid', businessController.deleteById);
router.get('/cert/:accountid', businessController.getCert);
router.get('/product/:accountid', businessController.getProduct);
router.delete('/product/:accountid', businessController.deleteProduct);
router.get('/reward/:accountid', businessController.getReward);
router.get('/redeemedreward/:accountid', businessController.redeemedRewards);
router.delete('/reward/:accountid', businessController.deleteReward);


// added
router.get('/:accountid/avgNumRewards', businessController.avgRewardsRedeemedByBusiness);

router.post('/reward/:accountid', businessController.addNewReward);

module.exports = router;
