const consumerController = require('../../controllers/consumerController');

const router = require('express').Router();

// change to post when we connect to front end
router.get('/:email&:password', consumerController.login);

module.exports = router;
