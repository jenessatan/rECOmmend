const consumerController = require('../../controllers/consumerController');

const router = require('express').Router();

router.get('/:email', consumerController.findByEmail);
router.patch('/:accountid', consumerController.editById);
router.delete('/:accountid', consumerController.deleteById);

module.exports = router;
