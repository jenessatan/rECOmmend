const businessController = require('../../controllers/businessController');

const router = require('express').Router();

router.get('/:accountid', businessController.findById);
router.patch('/:accountid', businessController.editById);
router.delete('/:accountid', businessController.deleteById);
router.get('/cert/:accountid', businessController.getCert);
router.get('/product/:accountid', businessController.getProduct);

module.exports = router;
