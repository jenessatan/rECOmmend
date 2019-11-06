const consumerController = require('../../controllers/consumerController');
const businessController = require('../../controllers/businessController');

const router = require('express').Router();

// change to post when we connect to front end
router.post('/consumer', consumerController.login);

// TODO
router.post('/business', businessController.login);

module.exports = router;
