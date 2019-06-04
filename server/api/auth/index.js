const consumerController = require('../../controllers/consumerController');

const router = require('express').Router();

// change to post when we connect to front end
router.post('/', consumerController.login);

module.exports = router;
