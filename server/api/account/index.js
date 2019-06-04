const consumerController = require('../../controllers/consumerController');

var router = require('express').Router();

router.get('/:accountid', consumerController.findById);
router.patch('/:accountid', consumerController.editById);
router.delete('/:accountid', consumerController.deleteById); 

module.exports = router;